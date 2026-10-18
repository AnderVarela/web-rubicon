/// <reference types="vitest/config" />
import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { LEGAL_DOCUMENTS } from './src/screens/components/legal-nav/legal-nav.const';

const src = (dir = '') => path.resolve(import.meta.dirname, 'src', dir);
const contenido = path.resolve(import.meta.dirname, '..', 'contenido');

// Hosting estático: una página HTML por cada URL legal y un 404.html para el resto.
const staticPages = (): Plugin => ({
  name: 'rubicon-static-pages',
  apply: 'build',
  closeBundle() {
    const dist = path.resolve(import.meta.dirname, 'dist');
    const index = path.join(dist, 'index.html');
    for (const document of LEGAL_DOCUMENTS) {
      const folder = path.join(dist, document.path);
      mkdirSync(folder, { recursive: true });
      copyFileSync(index, path.join(folder, 'index.html'));
    }
    copyFileSync(index, path.join(dist, '404.html'));
  },
});

export default defineConfig({
  plugins: [react(), staticPages()],
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
