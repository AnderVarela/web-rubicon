import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/global.css';
import { App } from '@/app';
import { Home } from '@screens/home';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App>
        <Home />
      </App>
    </StrictMode>,
  );
}
