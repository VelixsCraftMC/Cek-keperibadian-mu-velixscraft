import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RotateCcw, Sparkles, AlertCircle, User, Heart, Download, Camera, Loader2, Trophy, LogIn, LogOut, MessageSquare, Send } from 'lucide-react';
import { toPng } from 'html-to-image';
import { GoogleGenAI } from "@google/genai";
import { QUESTIONS, RESULTS } from './constants';
import { Category } from './types';
import { auth, loginWithGoogle, logout, saveResult, subscribeToLeaderboard, sendMessage, subscribeToChat } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'result' | 'leaderboard' | 'chat'>('start');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState<Record<Category, number>>({
    femboy: 0,
    femgirl: 0,
    normal: 0,
    abnormal: 0,
    jujur_cewek: 0,
    jujur_cowok: 0
  });
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startQuiz = () => {
    const newQuestions = shuffleArray(QUESTIONS).map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    }));
    setShuffledQuestions(newQuestions);
    setCurrentStep('quiz');
  };

  const winner = useMemo(() => {
    const categories = Object.keys(scores) as Category[];
    return categories.reduce((a, b) => scores[a] > scores[b] ? a : b);
  }, [scores]);

  const result = useMemo(() => {
    return RESULTS[winner];
  }, [winner]);

  const [imageSourceUrl, setImageSourceUrl] = useState<string | null>(null);

  const generateAnimeImage = async (category: Category) => {
    if (isGeneratingImage) return;
    setIsGeneratingImage(true);
    setImageSourceUrl(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const isFemale = category === 'femboy' || category === 'femgirl' || category === 'jujur_cewek';
      const trait = category === 'femboy' ? 'cute' : 
                    category === 'femgirl' ? 'elegant' : 
                    category === 'normal' ? 'cool sigma' : 
                    category === 'jujur_cewek' ? 'honest sweet' :
                    category === 'jujur_cowok' ? 'honest gentleman' :
                    'mysterious unique';
      
      const prompt = `Search Google for a high-quality direct image URL of a ${trait} anime ${isFemale ? 'girl' : 'boy'} character. 
      The URL MUST be a direct link to an image file (ending in .jpg, .png, or .webp). 
      Return ONLY the raw URL string. Do not include any other text or markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const url = response.text.trim();
      if (url.startsWith('http')) {
        setGeneratedImageUrl(url);
        
        // Extract source URL from grounding metadata if available
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && chunks.length > 0 && chunks[0].web) {
          setImageSourceUrl(chunks[0].web.uri);
        }
      } else {
        throw new Error("Invalid URL returned");
      }
    } catch (error) {
      console.error("Image search failed:", error);
      // Fallback to static image if search fails
      setGeneratedImageUrl(result.imageUrl);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleAnswer = (answerScores: Record<Category, number>) => {
    const newScores = {
      femboy: scores.femboy + answerScores.femboy,
      femgirl: scores.femgirl + answerScores.femgirl,
      normal: scores.normal + answerScores.normal,
      abnormal: scores.abnormal + answerScores.abnormal,
      jujur_cewek: scores.jujur_cewek + (answerScores.jujur_cewek || 0),
      jujur_cowok: scores.jujur_cowok + (answerScores.jujur_cowok || 0)
    };
    
    setScores(newScores);

    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('result');
      // No longer auto-generating to keep it fast
    }
  };

  const resetQuiz = () => {
    setScores({ 
      femboy: 0, 
      femgirl: 0, 
      normal: 0, 
      abnormal: 0,
      jujur_cewek: 0,
      jujur_cowok: 0
    });
    setQuestionIndex(0);
    setGeneratedImageUrl(null);
    setImageSourceUrl(null);
    setCurrentStep('start');
  };

  const downloadImage = async () => {
    if (resultRef.current === null) return;
    
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        backgroundColor: '#f5f5f5',
        style: {
          transform: 'scale(1)',
          borderRadius: '0'
        }
      });
      
      const link = document.createElement('a');
      link.download = `Hasil-Kepribadian-${result.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const progress = ((questionIndex + 1) / shuffledQuestions.length) * 100;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((data) => {
      setLeaderboard(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToChat((data) => {
      setMessages(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;
    const text = newMessage.trim();
    setNewMessage('');
    await sendMessage(user.uid, user.displayName || 'Anonymous', user.photoURL || '', text);
  };

  const handleSaveToLeaderboard = async () => {
    if (!user || isSaving) return;
    setIsSaving(true);
    try {
      await saveResult(user.uid, user.displayName || 'Anonymous', user.photoURL || '', winner, scores);
      setCurrentStep('leaderboard');
    } catch (error) {
      console.error("Failed to save result:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      {/* Header with Auth */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto flex gap-2">
          <button 
            onClick={() => setCurrentStep('leaderboard')}
            className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
          </button>
          <button 
            onClick={() => setCurrentStep('chat')}
            className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
          >
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </button>
        </div>
        <div className="pointer-events-auto">
          {user ? (
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full shadow-lg">
              <img src={user.photoURL || ''} className="w-8 h-8 rounded-full" alt="" />
              <button onClick={logout} className="text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {currentStep === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-4">
                <Sparkles className="w-12 h-12 text-blue-500" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                SURVEY <br />
                <span className="text-blue-500 italic">KATA HATI</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-md mx-auto">
                Temukan kategori kepribadian unikmu melalui 16 pertanyaan sederhana.
              </p>
              <button
                onClick={startQuiz}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-black rounded-full hover:bg-gray-800 focus:outline-none"
              >
                Mulai Sekarang
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                    Pertanyaan {questionIndex + 1} / {shuffledQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-blue-500">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  {shuffledQuestions[questionIndex].text}
                </h2>

                <div className="grid gap-4">
                  {shuffledQuestions[questionIndex].answers.map((answer, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(answer.scores)}
                      className="w-full text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-200 group flex items-center justify-between"
                    >
                      <span className="text-lg font-medium">{answer.text}</span>
                      <div className="w-8 h-8 rounded-full border border-gray-200 group-hover:bg-black group-hover:border-black transition-colors flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-transparent group-hover:text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div ref={resultRef} className="bg-white p-8 rounded-[32px] shadow-2xl space-y-8 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Camera className="w-32 h-32" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-50 flex items-center justify-center relative group">
                    <img 
                      src={generatedImageUrl || result.imageUrl} 
                      alt={result.title} 
                      className={`w-full h-full object-cover transition-opacity duration-500 ${isGeneratingImage ? 'opacity-30' : 'opacity-100'}`}
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (generatedImageUrl) {
                          setGeneratedImageUrl(result.imageUrl);
                          setImageSourceUrl(null);
                        }
                      }}
                    />
                    
                    {isGeneratingImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/50 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest font-bold">Searching...</span>
                      </div>
                    )}

                    {!generatedImageUrl && !isGeneratingImage && (
                      <button 
                        onClick={() => generateAnimeImage(winner)}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100 text-white"
                      >
                        <Sparkles className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase tracking-widest">Cari di Google</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                      <div className={`inline-flex p-3 rounded-xl ${result.color} text-white shadow-md mb-2`}>
                        {result.category === 'femboy' && <Heart className="w-6 h-6" />}
                        {result.category === 'femgirl' && <Sparkles className="w-6 h-6" />}
                        {result.category === 'normal' && <User className="w-6 h-6" />}
                        {result.category === 'abnormal' && <AlertCircle className="w-6 h-6" />}
                        {result.category === 'jujur_cewek' && <Heart className="w-6 h-6" />}
                        {result.category === 'jujur_cowok' && <User className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Hasil Analisis Kamu
                      </h3>
                      <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        {result.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {result.description}
                    </p>
                    
                    {imageSourceUrl && (
                      <a 
                        href={imageSourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[10px] font-mono text-blue-500 hover:underline uppercase tracking-widest"
                      >
                        Source: {new URL(imageSourceUrl).hostname}
                      </a>
                    )}
                    
                    {!generatedImageUrl && !isGeneratingImage && (
                      <button
                        onClick={() => generateAnimeImage(winner)}
                        className="inline-flex items-center text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
                      >
                        <Sparkles className="mr-1.5 w-3.5 h-3.5" />
                        Cari Karakter di Google
                      </button>
                    )}
                  </div>
                </div>

                {/* Percentage Breakdown */}
                <div className="pt-8 border-t border-gray-100 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center">Detail Skor Kepribadian</h4>
                  <div className="grid grid-cols-2 gap-6">
                    {(Object.keys(scores) as Category[]).map((cat) => {
                      const totalScore = (Object.values(scores) as number[]).reduce((a: number, b: number) => a + b, 0);
                      const percentage = totalScore > 0 ? Math.round((scores[cat] / totalScore) * 100) : 0;
                      return (
                        <div key={cat} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                            <span>{cat}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${RESULTS[cat].color}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em]">
                    VelixsCraftMCYT - Cekepribadianmu
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                {user ? (
                  <button
                    onClick={handleSaveToLeaderboard}
                    disabled={isSaving}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trophy className="mr-2 w-4 h-4" />}
                    Simpan ke Leaderboard
                  </button>
                ) : (
                  <button
                    onClick={loginWithGoogle}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200"
                  >
                    Login untuk Simpan Skor
                  </button>
                )}
                
                <button
                  onClick={downloadImage}
                  disabled={isExporting || isGeneratingImage}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 disabled:opacity-50"
                >
                  {isExporting ? (
                    <Sparkles className="mr-2 w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 w-4 h-4" />
                  )}
                  Simpan Hasil (Gambar)
                </button>
                
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Ulangi Survey
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
                <h2 className="text-4xl font-black tracking-tighter uppercase">Global Leaderboard</h2>
                <p className="text-gray-500">Hasil survey dari seluruh dunia</p>
              </div>

              <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100">
                <div className="max-h-[500px] overflow-y-auto">
                  {leaderboard.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 font-mono text-sm uppercase tracking-widest">
                      Belum ada data...
                    </div>
                  ) : (
                    leaderboard.map((entry, index) => (
                      <div 
                        key={entry.id} 
                        className={`flex items-center gap-4 p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-yellow-50/30' : ''}`}
                      >
                        <div className="w-8 text-center font-mono font-bold text-gray-400">
                          {index + 1}
                        </div>
                        <img src={entry.photoURL} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg leading-none">{entry.displayName}</h4>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${RESULTS[entry.category as Category]?.color.replace('bg-', 'text-')}`}>
                            {RESULTS[entry.category as Category]?.title}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black tracking-tighter text-blue-500">
                            {entry.totalPoints} <span className="text-[10px] uppercase text-gray-400">Pts</span>
                          </div>
                          <div className="text-[10px] font-mono text-gray-400">
                            {entry.timestamp?.toDate().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep('start')}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 h-[70vh] flex flex-col"
            >
              <div className="text-center space-y-2">
                <MessageSquare className="w-12 h-12 text-blue-500 mx-auto" />
                <h2 className="text-4xl font-black tracking-tighter uppercase">Global Chat</h2>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Maksimal 34 pesan terakhir</p>
              </div>

              <div className="flex-1 bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400 font-mono text-xs uppercase tracking-widest">
                      Belum ada obrolan...
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 ${msg.userId === user?.uid ? 'flex-row-reverse' : ''}`}
                      >
                        <img src={msg.photoURL} className="w-8 h-8 rounded-full shadow-sm" alt="" />
                        <div className={`max-w-[80%] space-y-1 ${msg.userId === user?.uid ? 'items-end' : ''}`}>
                          <div className="text-[10px] font-bold text-gray-400 px-1">{msg.displayName}</div>
                          <div className={`p-3 rounded-2xl text-sm ${msg.userId === user?.uid ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                  {user ? (
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ketik pesan..."
                        className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button 
                        type="submit"
                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  ) : (
                    <button 
                      onClick={loginWithGoogle}
                      className="w-full py-3 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      Login untuk mengobrol
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep('start')}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          Dibuat dengan ❤️ untuk hiburan
        </p>
      </footer>
    </div>
  );
}
