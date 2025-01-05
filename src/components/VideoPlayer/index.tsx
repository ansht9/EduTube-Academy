import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeEditor } from './CodeEditor';
import { QuizSection } from './Quiz';
import { Navigation } from './Navigation';
import type { Quiz, Video } from '../../types';
import type { LanguageType } from './CodeEditor/languages';

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isNextEnabled: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isNextEnabled,
}) => {
  const [showCompiler, setShowCompiler] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>('html');
  const [code, setCode] = useState<Record<LanguageType, string>>({
    html: '',
    css: '',
    js: '',
    python: '',
    java: '',
  });

  const handleCodeChange = (value: string, type: LanguageType) => {
    setCode((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          <Navigation
            onPrevious={onPrevious}
            onNext={onNext}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            isNextEnabled={isNextEnabled}
          />
        </div>

        <div className="space-y-4">
          <div>
            <button
              onClick={() => setShowCompiler(!showCompiler)}
              className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Code size={20} />
                <span>Code Editor</span>
              </div>
              {showCompiler ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <AnimatePresence>
              {showCompiler && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <CodeEditor
                    code={code}
                    activeLanguage={activeLanguage}
                    onCodeChange={handleCodeChange}
                    onLanguageChange={setActiveLanguage}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <QuizSection
            quiz={video.quiz}
            isAnswered={isNextEnabled}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
};