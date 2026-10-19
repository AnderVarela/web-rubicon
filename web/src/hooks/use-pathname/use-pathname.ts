import { useSyncExternalStore } from 'react';
import { getPathname, subscribe } from './use-pathname.helper';

// Ruta actual del navegador; se actualiza al navegar sin recargar y con Atrás/Adelante.
export const usePathname = () => useSyncExternalStore(subscribe, getPathname);
