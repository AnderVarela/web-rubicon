import { Home } from '@screens/home';
import { Legal } from '@screens/legal';
import { NotFound } from '@screens/not-found';
import { RouteName } from './router.const';
import { resolveRoute } from './router.helper';

export interface RouterProps {
  pathname?: string;
}

// Web estática: cada URL es una página propia, así que basta con mirar la ruta al cargar.
export const Router = ({ pathname = window.location.pathname }: RouterProps) => {
  const route = resolveRoute(pathname);

  if (route.name === RouteName.HOME) return <Home />;
  if (route.name === RouteName.LEGAL) return <Legal documentId={route.documentId} />;
  return <NotFound />;
};
