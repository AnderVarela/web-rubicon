import type { MouseEvent } from 'react';
import { navigate } from '@hooks/use-pathname';
import { LEGAL_DOCUMENTS, LegalDocumentId } from './legal-nav.const';

export const getLegalPath = (id: LegalDocumentId) => LEGAL_DOCUMENTS.find((document) => document.id === id)?.path ?? '/';

// «/cookies» y «/cookies/» son la misma página.
const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`);

export const findLegalDocument = (pathname: string) => LEGAL_DOCUMENTS.find((document) => document.path === withTrailingSlash(pathname));

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.defaultPrevented;

// Entre páginas legales se cambia de documento sin recargar la web. Desde la portada,
// o con Cmd/Ctrl+clic para abrir en otra pestaña, el enlace funciona como siempre.
export const followLegalLink = (path: string) => (event: MouseEvent) => {
  const current = findLegalDocument(window.location.pathname);
  if (!current || !isPlainClick(event)) return;
  event.preventDefault();
  if (current.path !== path) navigate(path);
};
