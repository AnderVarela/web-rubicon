import { LEGAL_DOCUMENTS, LegalDocumentId } from './legal-nav.const';

export const getLegalPath = (id: LegalDocumentId) => LEGAL_DOCUMENTS.find((document) => document.id === id)?.path ?? '/';
