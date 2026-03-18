import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RotateCcw, Sparkles, AlertCircle, User, Heart, Download, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';
import { QUESTIONS, RESULTS } from './constants';
import { Category } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState<Record<Category, number>>({
    femboy: 0,
    femgirl: 0,
    normal: 0,
    abnormal: 0
  });

  const handleAnswer = (answerScores: Record<Category, number>) => {
    setScores(prev => ({
      femboy: prev.femboy + answerScores.femboy,
      femgirl: prev.femgirl + answerScores.femgirl,
      normal: prev.normal + answerScores.normal,
      abnormal: prev.abnormal + answerScores.abnormal
    }));

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const result = useMemo(() => {
    const categories = Object.keys(scores) as Category[];
    const winner = categories.reduce((a, b) => scores[a] > scores[b] ? a : b);
    return RESULTS[winner];
  }, [scores]);

  const resetQuiz = () => {
    setScores({ femboy: 0, femgirl: 0, normal: 0, abnormal: 0 });
    setQuestionIndex(0);
    setCurrentStep('start');
  };

  const downloadImage = async () => {
    if (resultRef.current === null) return;
    
    setIsExporting(true);
    try {
      // Wait a bit for any animations to settle
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

  const progress = ((questionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
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
                Temukan kategori kepribadian unikmu melalui 12 pertanyaan sederhana.
              </p>
              <button
                onClick={() => setCurrentStep('quiz')}
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
                    Pertanyaan {questionIndex + 1} / {QUESTIONS.length}
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
                  {QUESTIONS[questionIndex].text}
                </h2>

                <div className="grid gap-4">
                  {QUESTIONS[questionIndex].answers.map((answer, idx) => (
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
                  <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                    <img 
                      src={result.imageUrl} 
                      alt={result.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                      <div className={`inline-flex p-3 rounded-xl ${result.color} text-white shadow-md mb-2`}>
                        {result.category === 'femboy' && <Heart className="w-6 h-6" />}
                        {result.category === 'femgirl' && <Sparkles className="w-6 h-6" />}
                        {result.category === 'normal' && <User className="w-6 h-6" />}
                        {result.category === 'abnormal' && <AlertCircle className="w-6 h-6" />}
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
                  </div>
                </div>

                {/* Percentage Breakdown */}
                <div className="pt-8 border-t border-gray-100 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center">Detail Skor Kepribadian</h4>
                  <div className="grid grid-cols-2 gap-6">
                    {(Object.keys(scores) as Category[]).map((cat) => {
                      const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
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
                <button
                  onClick={downloadImage}
                  disabled={isExporting}
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
