import { POPSTATE_EVENT } from './use-pathname.const';

export const getPathname = () => window.location.pathname;

export const subscribe = (onChange: () => void) => {
  window.addEventListener(POPSTATE_EVENT, onChange);
  return () => window.removeEventListener(POPSTATE_EVENT, onChange);
};

// Cambia de página sin recargar. Conserva la query (?lang=en) y avisa a quien escuche la ruta.
export const navigate = (pathname: string) => {
  window.history.pushState(null, '', `${pathname}${window.location.search}`);
  window.dispatchEvent(new PopStateEvent(POPSTATE_EVENT));
};
