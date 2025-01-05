import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeEditorProps {
  code: { html: string; css: string; js: string };
  activeTab: 'html' | 'css' | 'js';
  onCodeChange: (value: string, type: 'html' | 'css' | 'js') => void;
  onTabChange: (tab: 'html' | 'css' | 'js') => void;
  onRun: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  activeTab,
  onCodeChange,
  onTabChange,
  onRun,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex mb-4 bg-gray-700">
        {(['html', 'css', 'js'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <CodeMirror
          value={code[activeTab]}
          height="300px"
          theme="dark"
          extensions={[
            activeTab === 'html'
              ? html()
              : activeTab === 'css'
              ? css()
              : javascript(),
          ]}
          onChange={(value) => onCodeChange(value, activeTab)}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRun}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Code size={20} />
        Run Code
      </motion.button>
    </div>
  );
};