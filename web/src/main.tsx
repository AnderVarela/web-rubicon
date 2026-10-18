import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/global.css';
import { App } from '@/app';
import { Router } from '@/app/router';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App>
        <Router />
      </App>
    </StrictMode>,
  );
}
