import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LanguageType } from './languages';

interface ResultPanelProps {
  code: Record<LanguageType, string>;
  activeLanguage: LanguageType;
  height: number;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  code,
  activeLanguage,
  height,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (activeLanguage === 'html' || activeLanguage === 'css' || activeLanguage === 'js') {
      const content = `
        <html>
          <style>${code.css}</style>
          <body>${code.html}</body>
          <script>${code.js}</script>
        </html>
      `;
      iframeRef.current?.setAttribute('srcdoc', content);
    }
  }, [code, activeLanguage]);

  const renderResult = () => {
    switch (activeLanguage) {
      case 'html':
      case 'css':
      case 'js':
        return (
          <iframe
            ref={iframeRef}
            title="preview"
            className="w-full h-full bg-white rounded-lg"
            sandbox="allow-scripts"
          />
        );
      case 'python':
      case 'java':
        return (
          <div className="w-full h-full bg-gray-900 text-white p-4 rounded-lg font-mono">
            <p className="text-gray-400">// Output will be shown here</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      style={{ height }}
      className="mt-4 rounded-lg overflow-hidden"
    >
      {renderResult()}
    </motion.div>
  );
};