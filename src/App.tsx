import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, AlertCircle, User, Heart, Download, Camera, Loader2, Trophy, MessageSquare, Send, UserCircle, Image as ImageIcon, Plus } from 'lucide-react';
import { toPng } from 'html-to-image';
import { GoogleGenAI } from "@google/genai";
import { io, Socket } from 'socket.io-client';
import { PERSONALITY_QUESTIONS, TASTE_QUESTIONS, PERSONALITY_RESULTS, TASTE_RESULTS } from './constants';
import { Category, PersonalityCategory, TasteCategory } from './types';

// Initialize socket
const socket: Socket = io();

export default function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'result' | 'chat'>('start');
  const [surveyType, setSurveyType] = useState<'personality' | 'taste'>('personality');
  const [messages, setMessages] = useState<any[]>(() => {
    const cached = localStorage.getItem('chat_messages');
    return cached ? JSON.parse(cached) : [];
  });
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('user_name') || 'Anonymous');
  const [profileImage, setProfileImage] = useState<string>(() => localStorage.getItem('user_profile') || '');
  const [bgImage, setBgImage] = useState<string>(() => localStorage.getItem('app_bg') || '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempProfile, setTempProfile] = useState(profileImage);
  const [tempBg, setTempBg] = useState(bgImage);
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isCustomInputActive, setIsCustomInputActive] = useState(false);
  const [customAnswer, setCustomAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [scores, setScores] = useState<Record<Category, number>>({
    manis: 0,
    asin: 0,
    pedas: 0,
    asam: 0,
    pahit: 0,
    gurih: 0,
    femboy: 0,
    tomboy: 0,
    normal: 0,
    abnormal: 0,
    jujur_cewek: 0,
    jujur_cowok: 0
  });
  const [shuffledQuestions, setShuffledQuestions] = useState(TASTE_QUESTIONS);

  // Socket listeners
  useEffect(() => {
    socket.on('init_messages', (initialMessages) => {
      setMessages(initialMessages);
      localStorage.setItem('chat_messages', JSON.stringify(initialMessages));
    });
    
    socket.on('new_message', (msg) => {
      setMessages(prev => {
        const updated = [...prev.slice(-49), msg];
        localStorage.setItem('chat_messages', JSON.stringify(updated));
        return updated;
      });
    });

    socket.on('typing', (data) => {
      setTypingUsers(prev => {
        if (prev.includes(data.userName)) return prev;
        return [...prev, data.userName];
      });
    });

    socket.on('stop_typing', (data) => {
      setTypingUsers(prev => prev.filter(user => user !== data.userName));
    });

    // Cache Transfer: Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chat_messages' && e.newValue) {
        setMessages(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      socket.off('init_messages');
      socket.off('new_message');
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      text: newMessage.trim(),
      userName: userName,
      photoURL: profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
    };

    socket.emit('send_message', msg);
    setNewMessage('');
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    socket.emit('stop_typing', { userName });
  };

  const handleTyping = (text: string) => {
    setNewMessage(text);
    
    // Emit typing event
    socket.emit('typing', { userName });

    // Clear existing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set new timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { userName });
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'bg' | 'chat') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File terlalu besar! Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === 'profile') setTempProfile(base64);
      else if (type === 'bg') setTempBg(base64);
      else if (type === 'chat') {
        const msg = {
          text: '',
          image: base64,
          userName: userName,
          photoURL: profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
        };
        socket.emit('send_message', msg);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = () => {
    const trimmedName = tempName.trim();
    setUserName(trimmedName || 'Anonymous');
    localStorage.setItem('user_name', trimmedName || 'Anonymous');
    
    setProfileImage(tempProfile);
    localStorage.setItem('user_profile', tempProfile);
    
    setBgImage(tempBg);
    localStorage.setItem('app_bg', tempBg);
    
    setIsSettingsOpen(false);
  };

  const submitCustomAnswer = () => {
    if (!customAnswer.trim()) return;
    
    // Non-AI logic: Assign points to a random category to keep it "counted"
    const categories = (surveyType === 'personality' 
      ? ['femboy', 'tomboy', 'normal', 'abnormal', 'jujur_cewek', 'jujur_cowok'] 
      : ['manis', 'asin', 'pedas', 'asam', 'pahit', 'gurih']) as Category[];
    
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const customScores = { [randomCat]: 50 } as any;
    
    handleAnswer(customScores);
    setIsCustomInputActive(false);
    setCustomAnswer('');
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startQuiz = (type: 'personality' | 'taste') => {
    setSurveyType(type);
    const questions = type === 'personality' ? PERSONALITY_QUESTIONS : TASTE_QUESTIONS;
    const newQuestions = shuffleArray(questions).map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    }));
    setShuffledQuestions(newQuestions);
    setQuestionIndex(0);
    setScores({
      manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0,
      femboy: 0, tomboy: 0, normal: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0
    });
    setIsCustomInputActive(false);
    setCustomAnswer('');
    setCurrentStep('quiz');
  };

  const analyzeCustomAnswer = async (text: string) => {
    if (!text.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `Analyze this answer for a ${surveyType} survey: "${text}". 
      Assign scores (0-100) for these categories: ${surveyType === 'personality' ? 'femboy, tomboy, normal, abnormal, jujur_cewek, jujur_cowok' : 'manis, asin, pedas, asam, pahit, gurih'}.
      Be very careful to distinguish between 'pahit' (bitter) and 'manis' (sweet). If the user mentions coffee, dark chocolate, or traditional medicine without sugar, favor 'pahit'.
      Return ONLY a JSON object with category names as keys and scores as values.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json' }
      });

      const result = JSON.parse(response.text || '{}');
      handleAnswer(result);
      setIsCustomInputActive(false);
      setCustomAnswer('');
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback: assign small random scores or just skip
      handleAnswer({} as any);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const winner = useMemo(() => {
    const categories = (surveyType === 'personality' 
      ? ['femboy', 'tomboy', 'normal', 'abnormal', 'jujur_cewek', 'jujur_cowok'] 
      : ['pahit', 'pedas', 'asam', 'asin', 'gurih', 'manis']) as Category[];
    
    // Find the maximum score
    const maxScore = Math.max(...categories.map(cat => scores[cat] || 0));
    
    // If all scores are 0, return a default or random
    if (maxScore === 0) return categories[Math.floor(Math.random() * categories.length)];

    // Find all categories with the maximum score
    const winners = categories.filter(cat => (scores[cat] || 0) === maxScore);
    
    // Tie-breaking: Use a consistent but non-biased selection
    // We reverse the categories array to give priority to the ones we put first in the list
    // (In this case, 'pahit' is first, so it has priority over 'manis' if tied)
    return winners[0];
  }, [scores, surveyType]);

  const result = useMemo(() => {
    return surveyType === 'personality' ? PERSONALITY_RESULTS[winner] : TASTE_RESULTS[winner];
  }, [winner, surveyType]);

  const [imageSourceUrl, setImageSourceUrl] = useState<string | null>(null);

  const generateAnimeImage = async (category: Category) => {
    if (isGeneratingImage) return;
    setIsGeneratingImage(true);
    setImageSourceUrl(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      let trait = '';
      if (surveyType === 'taste') {
        trait = category === 'manis' ? 'sweet and dessert-themed' : 
                category === 'asin' ? 'salty and sea-themed' : 
                category === 'pedas' ? 'fiery and spicy-themed' : 
                category === 'asam' ? 'sour and citrus-themed' :
                category === 'pahit' ? 'bitter and coffee-themed' :
                'savory and gourmet-themed';
      } else {
        trait = category === 'femboy' ? 'cute and soft aesthetic' :
                category === 'tomboy' ? 'cool and independent' :
                category === 'normal' ? 'casual and modern' :
                category === 'abnormal' ? 'chaotic and surreal' :
                category === 'jujur_cewek' ? 'pure and honest girl' :
                'noble and honest gentleman';
      }
      
      const prompt = `A high-quality, ultra-detailed anime character portrait representing the trait "${category}" for user "${userName || 'Anonim'}", ${trait} aesthetic, intricate details, masterpiece style, cinematic lighting, sharp focus, 8k resolution.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) throw new Error("No image generated");
    } catch (error) {
      console.error("Image generation failed:", error);
      setGeneratedImageUrl(result.imageUrl);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleAnswer = (answerScores: Record<Category, number>) => {
    const newScores = { ...scores };
    (Object.keys(answerScores) as Category[]).forEach(cat => {
      newScores[cat] = (newScores[cat] || 0) + (answerScores[cat] || 0);
    });
    
    setScores(newScores);

    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const resetQuiz = () => {
    setScores({ 
      manis: 0, 
      asin: 0, 
      pedas: 0, 
      asam: 0,
      pahit: 0,
      gurih: 0,
      femboy: 0,
      tomboy: 0,
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
      const fileName = surveyType === 'personality' ? 'Kepribadian' : 'Rasa';
      link.download = `Hasil-Test-${fileName}-${result.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const progress = ((questionIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#F2F2F7] text-[#1C1C1E] font-sans selection:bg-[#007AFF] selection:text-white overflow-x-hidden bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {/* iOS-style Header */}
      <header className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-6 z-50 backdrop-blur-xl bg-white/70 border-b border-[#C6C6C8]/30">
        <div className="flex items-center gap-3">
          {currentStep !== 'start' && (
            <button 
              onClick={() => currentStep === 'chat' ? setCurrentStep('start') : resetQuiz()}
              className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-[#007AFF]" />
            </button>
          )}
          <h1 className="text-lg font-semibold tracking-tight">Survey App</h1>
        </div>

        <div className="flex items-center gap-3">
          {currentStep === 'start' && (
            <button 
              onClick={() => setCurrentStep('chat')}
              className="p-2 rounded-full hover:bg-black/5 transition-colors active:scale-95"
            >
              <MessageSquare className="w-6 h-6 text-[#007AFF]" />
            </button>
          )}
          
          <button 
            onClick={() => {
              setTempName(userName);
              setTempProfile(profileImage);
              setTempBg(bgImage);
              setIsSettingsOpen(true);
            }}
            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6C6C8]/20 text-sm font-medium hover:bg-gray-50 transition-colors active:scale-95"
          >
            {profileImage ? (
              <img src={profileImage} className="w-5 h-5 rounded-full object-cover" alt="" />
            ) : (
              <UserCircle className="w-5 h-5 text-[#8E8E93]" />
            )}
            <span className="max-w-[80px] truncate">{userName}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-24 pb-32">
        <AnimatePresence mode="wait">
          {currentStep === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 text-center pt-8"
            >
              <div className="space-y-4">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block p-6 rounded-[2rem] bg-white shadow-2xl shadow-[#007AFF]/10 mb-4"
                >
                  <Sparkles className="w-16 h-16 text-[#007AFF]" />
                </motion.div>
                <h1 className="text-5xl font-extrabold tracking-tight text-[#1C1C1E]">
                  Survey <br />
                  <span className="text-[#007AFF]">Tentang Dirimu</span>
                </h1>
                <p className="text-[#8E8E93] text-lg font-medium max-w-xs mx-auto">
                  Temukan sisi lain dari dirimu melalui survey interaktif kami.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-8">
                <button
                  onClick={() => startQuiz('personality')}
                  className="group relative flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-[#C6C6C8]/20 hover:shadow-xl hover:shadow-[#007AFF]/10 transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      className="p-4 rounded-2xl bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/20"
                    >
                      <User className="w-8 h-8" />
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-[#1C1C1E]">Cek Kepribadian</h3>
                      <p className="text-sm text-[#8E8E93]">Kenali karakter aslimu</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#C6C6C8] group-hover:text-[#007AFF] transition-colors relative z-10" />
                </button>

                <button
                  onClick={() => startQuiz('taste')}
                  className="group relative flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-[#C6C6C8]/20 hover:shadow-xl hover:shadow-[#FF9500]/10 transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.2,
                        y: [0, -5, 0],
                      }}
                      className="p-4 rounded-2xl bg-[#FF9500] text-white shadow-lg shadow-[#FF9500]/20"
                    >
                      <Heart className="w-8 h-8" />
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-[#1C1C1E]">Cek Suka Rasa</h3>
                      <p className="text-sm text-[#8E8E93]">Apa rasa favoritmu?</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#C6C6C8] group-hover:text-[#FF9500] transition-colors relative z-10" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
                      Question {questionIndex + 1} of {shuffledQuestions.length}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
                      {shuffledQuestions[questionIndex].text}
                    </h2>
                  </div>
                </div>
                <div className="h-2 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#007AFF] rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {!isCustomInputActive ? (
                  <>
                    {shuffledQuestions[questionIndex].answers.map((answer, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(answer.scores)}
                        className="w-full p-5 text-left bg-white/90 backdrop-blur-sm rounded-2xl border border-[#C6C6C8]/20 shadow-sm hover:border-[#007AFF] hover:bg-[#007AFF]/5 transition-all active:scale-[0.99] group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium text-[#1C1C1E] group-hover:text-[#007AFF]">
                            {answer.text}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#C6C6C8] group-hover:text-[#007AFF]" />
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => setIsCustomInputActive(true)}
                      className="w-full p-5 text-left bg-white/90 backdrop-blur-sm rounded-2xl border border-dashed border-[#007AFF] hover:bg-[#007AFF]/5 transition-all active:scale-[0.99] group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#007AFF]/10 text-[#007AFF]">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <span className="text-base font-semibold text-[#007AFF]">
                            Jawaban Lainnya...
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#007AFF] opacity-50 group-hover:opacity-100" />
                      </div>
                    </button>
                  </>
                ) : null}
              </div>

              {/* Custom Answer Pop-up Modal */}
              <AnimatePresence>
                {isCustomInputActive && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsCustomInputActive(false)}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-[#1C1C1E]">Jawaban Kustom</h3>
                        <p className="text-sm text-[#8E8E93]">Tuliskan apa yang ada di pikiranmu</p>
                      </div>
                      
                      <textarea
                        value={customAnswer}
                        onChange={(e) => setCustomAnswer(e.target.value)}
                        placeholder="Ketik jawabanmu di sini..."
                        className="w-full p-5 bg-[#F2F2F7] rounded-2xl border-none focus:ring-2 focus:ring-[#007AFF] min-h-[150px] text-base transition-all"
                        autoFocus
                      />
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsCustomInputActive(false)}
                          className="flex-1 p-4 rounded-2xl bg-[#F2F2F7] text-[#1C1C1E] font-bold active:scale-95 transition-transform"
                        >
                          Batal
                        </button>
                        <button
                          onClick={submitCustomAnswer}
                          disabled={!customAnswer.trim()}
                          className="flex-2 p-4 rounded-2xl bg-[#007AFF] text-white font-bold shadow-lg shadow-[#007AFF]/20 active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Kirim Jawaban
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div 
                ref={resultRef}
                className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 border border-[#C6C6C8]/10 space-y-8 overflow-hidden relative"
              >
                {/* Result Content */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden bg-[#F2F2F7] relative group shadow-inner">
                    <img 
                      src={generatedImageUrl || result.imageUrl} 
                      alt={result.title}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${isGeneratingImage ? 'opacity-30' : 'opacity-100'}`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {isGeneratingImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/50 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-[#007AFF] animate-spin" />
                        <span className="text-xs font-bold text-[#007AFF] uppercase tracking-widest">Generating...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F2F7] text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
                        <UserCircle className="w-3 h-3" />
                        {userName || 'Anonim'}
                      </div>
                      <h2 className="text-4xl font-extrabold tracking-tight text-[#1C1C1E] leading-tight">
                        {result.title}
                      </h2>
                    </div>
                    <p className="text-[#48484A] text-base leading-relaxed font-medium">
                      {result.description}
                    </p>
                  </div>
                </div>

                {/* Percentage Breakdown */}
                <div className="pt-8 border-t border-[#F2F2F7] space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#8E8E93] text-center">
                    Detail Skor {surveyType === 'personality' ? 'Kepribadian' : 'Rasa'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(() => {
                      const categories = (surveyType === 'personality' 
                        ? ['femboy', 'tomboy', 'normal', 'abnormal', 'jujur_cewek', 'jujur_cowok'] 
                        : ['manis', 'asin', 'pedas', 'asam', 'pahit', 'gurih']) as Category[];
                      
                      const squaredScores = categories.map(c => Math.pow(scores[c] || 0, 4));
                      const totalSquared = squaredScores.reduce((a, b) => a + b, 0);

                      return categories.map((cat, idx) => {
                        const currentCat = cat as Category;
                        const percentage = totalSquared > 0 ? Math.round((squaredScores[idx] / totalSquared) * 100) : 0;
                        const resultsObj = surveyType === 'personality' ? PERSONALITY_RESULTS : TASTE_RESULTS;
                        
                        return (
                          <div key={cat} className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-[#8E8E93]">
                              <span>{cat.replace('_', ' ')}</span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#F2F2F7] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${currentCat === winner ? 'bg-[#007AFF]' : 'bg-[#C6C6C8]'}`}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={downloadImage}
                  disabled={isExporting || isGeneratingImage}
                  className="w-full p-5 bg-[#007AFF] text-white rounded-2xl font-bold shadow-lg shadow-[#007AFF]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  Simpan Hasil (Gambar)
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={resetQuiz}
                    className="p-5 bg-white text-[#1C1C1E] border border-[#C6C6C8]/20 rounded-2xl font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Menu Utama
                  </button>
                  <button
                    onClick={() => {
                      setQuestionIndex(0);
                      setScores({ 
                        manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0,
                        femboy: 0, tomboy: 0, normal: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0
                      });
                      setGeneratedImageUrl(null);
                      setCurrentStep('quiz');
                    }}
                    className="p-5 bg-white text-[#1C1C1E] border border-[#C6C6C8]/20 rounded-2xl font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Ulangi Test
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[75vh] flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-[#C6C6C8]/10 overflow-hidden"
            >
              <div className="p-6 border-b border-[#F2F2F7] flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#34C759]/10 text-[#34C759]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1C1C1E]">Global Chat</h2>
                    <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-widest">Live Discussion</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentStep('start')}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-[#007AFF]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F2F2F7]/30">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#8E8E93] space-y-2">
                    <MessageSquare className="w-12 h-12 opacity-20" />
                    <p className="text-sm font-medium">Belum ada obrolan...</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-3 ${msg.userName === userName ? 'flex-row-reverse' : ''}`}
                    >
                      <img src={msg.photoURL} className="w-8 h-8 rounded-full shadow-sm" alt="" />
                      <div className={`max-w-[80%] space-y-1 ${msg.userName === userName ? 'items-end' : ''}`}>
                        <div className="text-[10px] font-bold text-[#8E8E93] px-1">{msg.userName}</div>
                        <div className={`p-3 rounded-2xl text-sm ${msg.userName === userName ? 'bg-[#007AFF] text-white rounded-tr-none' : 'bg-white text-[#1C1C1E] rounded-tl-none shadow-sm border border-[#C6C6C8]/10'}`}>
                          {msg.image && (
                            <img 
                              src={msg.image} 
                              alt="Uploaded" 
                              className="max-w-full rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(msg.image, '_blank')}
                            />
                          )}
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {typingUsers.length > 0 && (
                  <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] font-medium italic px-2">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-[#8E8E93] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 bg-[#8E8E93] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 bg-[#8E8E93] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    {typingUsers.length === 1 
                      ? `${typingUsers[0]} is typing...` 
                      : `${typingUsers.length} people are typing...`}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-[#F2F2F7]">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                  <label className="p-3 bg-[#F2F2F7] text-[#8E8E93] rounded-2xl hover:bg-[#E5E5EA] transition-all cursor-pointer active:scale-95">
                    <ImageIcon className="w-5 h-5" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'chat')}
                    />
                  </label>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => handleTyping(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 bg-[#F2F2F7] border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#007AFF] transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3 bg-[#007AFF] text-white rounded-2xl hover:bg-[#007AFF]/90 transition-all shadow-lg shadow-[#007AFF]/20 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[#1C1C1E]">Pengaturan Profil</h3>
                <p className="text-sm text-[#8E8E93]">Kustomisasi tampilan aplikasimu</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] px-1">Nama Pengguna</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Masukkan nama..."
                    className="w-full p-4 bg-[#F2F2F7] rounded-2xl border-none focus:ring-2 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] px-1">Foto Profil</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={tempProfile}
                      onChange={(e) => setTempProfile(e.target.value)}
                      placeholder="URL Foto Profil..."
                      className="flex-1 p-4 bg-[#F2F2F7] rounded-2xl border-none focus:ring-2 focus:ring-[#007AFF] transition-all text-sm"
                    />
                    <label className="p-4 bg-[#F2F2F7] text-[#007AFF] rounded-2xl hover:bg-[#E5E5EA] transition-all cursor-pointer active:scale-95 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, 'profile')}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] px-1">Latar Belakang</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={tempBg}
                      onChange={(e) => setTempBg(e.target.value)}
                      placeholder="URL Latar Belakang..."
                      className="flex-1 p-4 bg-[#F2F2F7] rounded-2xl border-none focus:ring-2 focus:ring-[#007AFF] transition-all text-sm"
                    />
                    <label className="p-4 bg-[#F2F2F7] text-[#007AFF] rounded-2xl hover:bg-[#E5E5EA] transition-all cursor-pointer active:scale-95 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, 'bg')}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1 p-4 rounded-2xl bg-[#F2F2F7] text-[#1C1C1E] font-bold active:scale-95 transition-transform"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-2 p-4 rounded-2xl bg-[#007AFF] text-white font-bold shadow-lg shadow-[#007AFF]/20 active:scale-95 transition-transform"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* iOS-style Tab Bar / Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-[#C6C6C8]/30 flex items-center justify-center px-6 z-40">
        <div className="max-w-md w-full flex flex-col items-center gap-1">
          <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest text-center">
            Made with <Heart className="inline w-3 h-3 text-[#FF3B30] animate-pulse" /> by <span className="text-[#1C1C1E]">@VelixsCraftMCYT / @Muhammad Ilias</span>
          </p>
          <p className="text-[8px] text-[#C6C6C8] font-medium uppercase tracking-[0.2em]">Crafted with Passion</p>
        </div>
      </footer>
    </div>
  );
}
