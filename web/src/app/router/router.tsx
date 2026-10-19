import { usePathname } from '@hooks/use-pathname';
import { Home } from '@screens/home';
import { Legal } from '@screens/legal';
import { NotFound } from '@screens/not-found';
import { RouteName } from './router.const';
import { resolveRoute } from './router.helper';

export interface RouterProps {
  pathname?: string;
}

// Web estática: cada URL tiene su HTML, pero entre páginas legales se navega sin recargar,
// así que el router sigue la ruta del navegador.
export const Router = ({ pathname }: RouterProps) => {
  const currentPathname = usePathname();
  const route = resolveRoute(pathname ?? currentPathname);

  if (route.name === RouteName.HOME) return <Home />;
  if (route.name === RouteName.LEGAL) return <Legal documentId={route.documentId} />;
  return <NotFound />;
};
