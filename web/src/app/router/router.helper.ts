import { LEGAL_DOCUMENTS, type LegalDocumentId } from '@screens/components/legal-nav';
import { HOME_PATHS, RouteName } from './router.const';

export type Route = { name: RouteName.HOME } | { name: RouteName.LEGAL; documentId: LegalDocumentId } | { name: RouteName.NOT_FOUND };

// «/cookies» y «/cookies/» son la misma página.
const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`);

export const resolveRoute = (pathname: string): Route => {
  if (HOME_PATHS.includes(pathname)) return { name: RouteName.HOME };
  const legal = LEGAL_DOCUMENTS.find((document) => document.path === withTrailingSlash(pathname));
  return legal ? { name: RouteName.LEGAL, documentId: legal.id } : { name: RouteName.NOT_FOUND };
};
