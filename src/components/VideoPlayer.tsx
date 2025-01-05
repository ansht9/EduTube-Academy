// components/VideoPlayer.tsx
import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeEditor } from './CodeEditor';
import { QuizSection } from './QuizSection';
import type { Quiz } from '../types';

interface VideoPlayerProps {
  videoId: string;
  quiz: Quiz;
  onComplete: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  quiz,
  onComplete,
}) => {
  const [showCompiler, setShowCompiler] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: '',
  });

  const handleRunCode = () => {
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    if (iframe) {
      const content = `
        <html>
          <style>${code.css}</style>
          <body>${code.html}</body>
          <script>${code.js}</script>
        </html>
      `;
      iframe.srcdoc = content;
    }
  };

  const handleCodeChange = (value: string, type: 'html' | 'css' | 'js') => {
    setCode((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Video Section */}
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>

        {/* Right Column: Compiler Toggle + Quiz */}
        <div className="space-y-4">
          {/* Compiler Section */}
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
                    activeTab={activeTab}
                    onCodeChange={handleCodeChange}
                    onTabChange={setActiveTab}
                    onRun={handleRunCode}
                  />
                  <div className="mt-4 bg-white rounded-lg p-4 h-64">
                    <iframe id="preview" className="w-full h-full border-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quiz Section */}
          <QuizSection quiz={quiz} onComplete={onComplete} />
        </div>
      </div>
    </div>
  );
};
