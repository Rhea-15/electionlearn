import type { QuizQuestion as QuizQuestionType } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (optionId: string) => void;
  selectedId?: string;
  showResult: boolean;
}

const QuizQuestion = ({ question, onAnswer, selectedId, showResult }: QuizQuestionProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold leading-tight">
        {question.questionText}
      </h3>

      <div className="grid gap-4">
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;
          
          let stateStyles = 'border-white/10 bg-white/5 hover:border-white/30';
          if (showResult) {
            if (isCorrect) stateStyles = 'border-green-500 bg-green-500/10 text-green-400';
            else if (isSelected) stateStyles = 'border-red-500 bg-red-500/10 text-red-400';
            else stateStyles = 'border-white/5 opacity-50';
          } else if (isSelected) {
            stateStyles = 'border-primary bg-primary/10 text-primary scale-[1.02]';
          }

          return (
            <button
              key={option.id}
              onClick={() => !showResult && onAnswer(option.id)}
              disabled={showResult}
              className={`w-full p-6 text-left rounded-2xl border-2 font-bold transition-all flex items-center justify-between group ${stateStyles}`}
            >
              <span className="flex-grow">{option.text}</span>
              
              {showResult && isCorrect && (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-secondary">
                  <Check size={14} />
                </div>
              )}
              {showResult && isSelected && !isCorrect && (
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-secondary">
                  <X size={14} />
                </div>
              )}
              {!showResult && (
                <div className={`w-6 h-6 rounded-full border-2 transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-white/20 group-hover:border-white/40'}`}>
                  {isSelected && <Check size={14} className="text-secondary mx-auto mt-0.5" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-secondary/50 border border-primary/20 flex gap-4"
          >
            <AlertCircle className="text-primary shrink-0" size={20} />
            <div>
              <h5 className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Explanation</h5>
              <p className="text-sm text-text-muted leading-relaxed italic">
                {question.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizQuestion;
