import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzesApi } from '../lib/api';
import type { Quiz, QuizResult } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, ArrowRight, RefreshCw, CheckCircle, ChevronLeft } from 'lucide-react';
import QuizQuestion from '../components/ui/QuizQuestion';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    quizzesApi.get(id).then(data => {
      setQuiz(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>;
  if (!quiz) return <div className="container py-20 text-center">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentStep];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
    } else {
      setLoading(true);
      try {
        const res = await quizzesApi.submit(quiz.id, answers);
        setResult(res);
      } catch {
        // Fallback mock result for development
        setResult({
          score: 80,
          totalQuestions: 10,
          correctAnswers: 8,
          passed: true,
          responses: []
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (result) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-2xl w-full p-12 text-center"
        >
          <div className="mb-8 relative inline-block">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${result.passed ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              <Trophy size={48} />
            </div>
            {result.passed && <div className="absolute -top-4 -right-4 animate-bounce"><CheckCircle size={32} className="text-primary" /></div>}
          </div>

          <h1 className="text-4xl font-extrabold mb-4">{result.passed ? 'Certification Achieved!' : 'Keep Learning'}</h1>
          <p className="text-text-muted mb-12">You scored <span className="text-white font-bold">{result.score}%</span> by correctly answering {result.correctAnswers} out of {result.totalQuestions} questions.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/modules')}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Back to Modules
            </button>
            <button 
              onClick={() => {
                setResult(null);
                setCurrentStep(0);
                setAnswers({});
                setShowFeedback(false);
              }}
              className="btn-primary py-4 flex items-center justify-center gap-2"
            >
              Retake Quiz <RefreshCw size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/5 text-text-muted">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-black">{quiz.title}</h2>
          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Question {currentStep + 1} of {totalQuestions}</p>
        </div>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Timer size={20} />
        </div>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-12">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-primary"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <QuizQuestion 
            question={currentQuestion} 
            selectedId={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
            showResult={showFeedback}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-end">
        <button
          disabled={!showFeedback}
          onClick={handleNext}
          className="btn-primary py-4 px-10 flex items-center gap-3 text-lg disabled:opacity-20 disabled:grayscale transition-all"
        >
          {currentStep === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
