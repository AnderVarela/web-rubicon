import { useEffect, useRef } from 'react';

// Al cambiar de documento sin recargar: vuelve arriba y lleva el foco al documento nuevo
// para que el lector de pantalla lo anuncie. En la primera carga no toca nada.
export const useDocumentFocus = (documentId: string, mainId: string) => {
  const previous = useRef(documentId);

  useEffect(() => {
    if (previous.current === documentId) return;
    previous.current = documentId;
    window.scrollTo(0, 0);
    document.getElementById(mainId)?.focus({ preventScroll: true });
  }, [documentId, mainId]);
};
