import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, AlertCircle, User, Heart, Download, Camera, Loader2, Trophy, MessageSquare, Send, UserCircle } from 'lucide-react';
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
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('user_name') || 'Anonymous');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
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
    socket.on('init_messages', (initialMessages) => setMessages(initialMessages));
    socket.on('new_message', (msg) => setMessages(prev => [...prev.slice(-49), msg]));

    return () => {
      socket.off('init_messages');
      socket.off('new_message');
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
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
    };

    socket.emit('send_message', msg);
    setNewMessage('');
  };

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setUserName(trimmed);
      localStorage.setItem('user_name', trimmed);
      setIsEditingName(false);
    }
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
    setCurrentStep('quiz');
  };

  const winner = useMemo(() => {
    const categories = (surveyType === 'personality' 
      ? ['femboy', 'tomboy', 'normal', 'abnormal', 'jujur_cewek', 'jujur_cowok'] 
      : ['manis', 'asin', 'pedas', 'asam', 'pahit', 'gurih']) as Category[];
    
    return categories.reduce((a, b) => scores[a] > scores[b] ? a : b);
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
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto flex gap-2">
          {currentStep === 'start' && (
            <button 
              onClick={() => setCurrentStep('chat')}
              className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <MessageSquare className="w-6 h-6 text-emerald-500" />
            </button>
          )}
        </div>

        <div className="pointer-events-auto">
          {isEditingName ? (
            <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-lg">
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="bg-transparent px-4 py-1 text-xs font-bold focus:outline-none w-32"
                autoFocus
                maxLength={15}
              />
              <button 
                onClick={handleSaveName}
                className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setTempName(userName);
                setIsEditingName(true);
              }}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <UserCircle className="w-4 h-4" />
              {userName}
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-24">
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
                <Sparkles className="w-12 h-12 text-emerald-500" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                SURVEY <br />
                <span className="text-emerald-500 italic">INTERAKTIF</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-md mx-auto">
                Pilih test yang ingin kamu ikuti dan temukan jati dirimu yang sebenarnya!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => startQuiz('personality')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-black rounded-full hover:bg-gray-800 focus:outline-none"
                >
                  Cek Kepribadian
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => startQuiz('taste')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-white border-2 border-black rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  Cek Suka Rasa
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              className="space-y-12"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <button 
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:shadow-md transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Kembali
                  </button>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                      Pertanyaan {questionIndex + 1} / {shuffledQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-emerald-500">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
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
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest font-bold">Searching...</span>
                      </div>
                    )}

                    {!generatedImageUrl && !isGeneratingImage && (
                      <button 
                        onClick={() => generateAnimeImage(winner)}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100 text-white"
                      >
                        <Sparkles className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase tracking-widest">Generate AI</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <div className={`inline-flex p-3 rounded-xl ${result.color} text-white shadow-md mb-2`}>
                          {surveyType === 'taste' ? (
                            <>
                              {result.category === 'manis' && <Heart className="w-6 h-6" />}
                              {result.category === 'asin' && <Sparkles className="w-6 h-6" />}
                              {result.category === 'pedas' && <AlertCircle className="w-6 h-6" />}
                              {result.category === 'asam' && <Sparkles className="w-6 h-6" />}
                              {result.category === 'pahit' && <User className="w-6 h-6" />}
                              {result.category === 'gurih' && <Sparkles className="w-6 h-6" />}
                            </>
                          ) : (
                            <User className="w-6 h-6" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Username</div>
                          <div className="text-sm font-bold text-black uppercase tracking-tighter">{userName || 'Anonim'}</div>
                        </div>
                      </div>
                      <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Hasil Analisis Kamu
                      </h3>
                      <h2 className="text-4xl font-black tracking-tighter uppercase leading-none animate-blink">
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
                        className="inline-flex items-center text-[10px] font-mono text-emerald-500 hover:underline uppercase tracking-widest"
                      >
                        Source: {new URL(imageSourceUrl).hostname}
                      </a>
                    )}
                    
                    {!generatedImageUrl && !isGeneratingImage && (
                      <button
                        onClick={() => generateAnimeImage(winner)}
                        className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                      >
                        <Sparkles className="mr-1.5 w-3.5 h-3.5" />
                        Generate Karakter AI
                      </button>
                    )}
                  </div>
                </div>

                {/* Percentage Breakdown */}
                <div className="pt-8 border-t border-gray-100 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 text-center">
                    Detail Skor {surveyType === 'personality' ? 'Kepribadian' : 'Rasa'}
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    {(() => {
                      const categories = (surveyType === 'personality' 
                        ? ['femboy', 'tomboy', 'normal', 'abnormal', 'jujur_cewek', 'jujur_cowok'] 
                        : ['manis', 'asin', 'pedas', 'asam', 'pahit', 'gurih']) as Category[];
                      
                      // Squaring scores to amplify differences (Intensity)
                      const squaredScores = categories.map(c => Math.pow(scores[c] || 0, 4));
                      const totalSquared = squaredScores.reduce((a, b) => a + b, 0);

                      return categories.map((cat, idx) => {
                        const currentCat = cat as Category;
                        const percentage = totalSquared > 0 ? Math.round((squaredScores[idx] / totalSquared) * 100) : 0;
                        const resultsObj = surveyType === 'personality' ? PERSONALITY_RESULTS : TASTE_RESULTS;
                        
                        return (
                          <div key={cat} className="group relative space-y-1.5">
                            <div className={`flex justify-between text-xs font-bold uppercase tracking-tighter ${currentCat === winner ? 'text-black animate-blink' : 'text-gray-400'}`}>
                              <div className="flex items-center gap-1">
                                <span>{cat.replace('_', ' ')}</span>
                                {resultsObj[cat].tooltip && (
                                  <div className="relative group/tooltip">
                                    <AlertCircle className="w-3 h-3 text-gray-300 cursor-help" />
                                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-black text-white text-[10px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 normal-case font-normal leading-tight shadow-xl">
                                      {resultsObj[cat].tooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <span>{percentage}%</span>
                            </div>
                            <div className={`h-1.5 w-full bg-gray-100 rounded-full overflow-hidden ${currentCat === winner ? 'ring-2 ring-black/10' : ''}`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${resultsObj[cat].color} ${currentCat === winner ? 'animate-blink' : ''}`}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-xs font-mono text-gray-300 uppercase tracking-[0.2em]">
                    VelixsCraftMCYT - {surveyType === 'personality' ? 'Cek Kepribadian' : 'Test Suka Rasa'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
                  <ChevronLeft className="mr-2 w-4 h-4" />
                  Menu Utama
                </button>

                <button
                  onClick={() => {
                    setQuestionIndex(0);
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
                    setGeneratedImageUrl(null);
                    setImageSourceUrl(null);
                    setCurrentStep('quiz');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold border-2 border-gray-200 rounded-full hover:border-black transition-all duration-200"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Ulangi Test
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
              <div className="relative text-center space-y-2">
                <button 
                  onClick={() => setCurrentStep('start')}
                  className="absolute left-0 top-0 p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <MessageSquare className="w-12 h-12 text-emerald-500 mx-auto" />
                <h2 className="text-4xl font-black tracking-tighter uppercase">Global Chat</h2>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Obrolan langsung tanpa database</p>
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
                        className={`flex gap-3 ${msg.userName === userName ? 'flex-row-reverse' : ''}`}
                      >
                        <img src={msg.photoURL} className="w-8 h-8 rounded-full shadow-sm" alt="" />
                        <div className={`max-w-[80%] space-y-1 ${msg.userName === userName ? 'items-end' : ''}`}>
                          <div className="text-[10px] font-bold text-gray-400 px-1">{msg.userName}</div>
                          <div className={`p-3 rounded-2xl text-sm ${msg.userName === userName ? 'bg-emerald-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ketik pesan..."
                      className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-md focus:outline-none disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
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

      <footer className="w-full text-center py-12 px-4 mt-auto">
        <div className="max-w-md mx-auto bg-white/50 py-2 px-4 rounded-full border border-gray-100">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
            Survey Tentang dirimu di buat oleh <span className="font-bold text-black">@VelixsCraftMCYT</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
