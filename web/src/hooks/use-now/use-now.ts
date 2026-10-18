import { useEffect, useState } from 'react';
import { NOW_REFRESH_MS } from './use-now.const';

// Hora actual que se refresca cada minuto (el estado de la tienda cambia con ella).
export const useNow = (refreshMs = NOW_REFRESH_MS): Date => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), refreshMs);
    return () => window.clearInterval(timer);
  }, [refreshMs]);

  return now;
};
