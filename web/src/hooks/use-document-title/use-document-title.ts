import { useEffect } from 'react';

// Título de la pestaña propio de cada página (legales, 404).
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
