/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const src = (dir = '') => path.resolve(import.meta.dirname, 'src', dir);
const contenido = path.resolve(import.meta.dirname, '..', 'contenido');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': src('components'),
      '@screens': src('screens'),
      '@hooks': src('hooks'),
      '@i18n': src('i18n'),
      '@styles': src('styles'),
      '@test': src('test'),
      '@contenido': contenido,
      '@': src(),
    },
  },
  server: {
    fs: { allow: [path.resolve(import.meta.dirname, '..')] },
  },
  css: {
    modules: { localsConvention: 'camelCase' },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    restoreMocks: true,
  },
});
