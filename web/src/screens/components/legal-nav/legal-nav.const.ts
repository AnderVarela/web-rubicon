export enum LegalDocumentId {
  NOTICE = 'aviso-legal',
  PRIVACY = 'privacidad',
  COOKIES = 'cookies',
  ACCESSIBILITY = 'accesibilidad',
}

export interface LegalDocumentLink {
  id: LegalDocumentId;
  path: string;
  messageId: string;
}

// Páginas legales con URL propia (documentación funcional, apartado 4).
export const LEGAL_DOCUMENTS: LegalDocumentLink[] = [
  { id: LegalDocumentId.NOTICE, path: '/aviso-legal/', messageId: 'legal.notice' },
  { id: LegalDocumentId.PRIVACY, path: '/privacidad/', messageId: 'legal.privacy' },
  { id: LegalDocumentId.COOKIES, path: '/cookies/', messageId: 'legal.cookies' },
  { id: LegalDocumentId.ACCESSIBILITY, path: '/accesibilidad/', messageId: 'legal.accessibility' },
];

export const LEGAL_NAV_MESSAGES = {
  label: 'footer.legal',
  configure: 'cookies.configure',
} as const;
