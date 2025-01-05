import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';

export type LanguageType = 'html' | 'css' | 'js' | 'python' | 'java';

export const languages = {
  html,
  css,
  js: javascript,
  python,
  java,
} as const;

export const getLanguageExtension = (type: LanguageType) => languages[type]();