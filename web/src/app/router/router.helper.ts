import { findLegalDocument, type LegalDocumentId } from '@screens/components/legal-nav';
import { HOME_PATHS, RouteName } from './router.const';

export type Route = { name: RouteName.HOME } | { name: RouteName.LEGAL; documentId: LegalDocumentId } | { name: RouteName.NOT_FOUND };

export const resolveRoute = (pathname: string): Route => {
  if (HOME_PATHS.includes(pathname)) return { name: RouteName.HOME };
  const legal = findLegalDocument(pathname);
  return legal ? { name: RouteName.LEGAL, documentId: legal.id } : { name: RouteName.NOT_FOUND };
};
