import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResizeHandle } from './ResizeHandle';
import { ResultPanel } from './ResultPanel';
import { getLanguageExtension, type LanguageType } from './languages';

interface CodeEditorProps {
  code: Record<LanguageType, string>;
  activeLanguage: LanguageType;
  onCodeChange: (value: string, type: LanguageType) => void;
  onLanguageChange: (language: LanguageType) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  activeLanguage,
  onCodeChange,
  onLanguageChange,
}) => {
  const [resultHeight, setResultHeight] = useState(200);

  const languages: LanguageType[] = ['html', 'css', 'js', 'python', 'java'];

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex mb-4 bg-gray-700 overflow-x-auto scrollbar-thin">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-4 py-2 whitespace-nowrap ${
              activeLanguage === lang
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <CodeMirror
          value={code[activeLanguage]}
          height="300px"
          theme="dark"
          extensions={[getLanguageExtension(activeLanguage)]}
          onChange={(value) => onCodeChange(value, activeLanguage)}
        />
      </div>

      <ResizeHandle
        onResize={(deltaY) => setResultHeight(Math.max(100, resultHeight + deltaY))}
      />

      <ResultPanel
        code={code}
        activeLanguage={activeLanguage}
        height={resultHeight}
      />
    </div>
  );
};