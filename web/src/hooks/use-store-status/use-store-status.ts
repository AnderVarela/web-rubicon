import { useMemo } from 'react';
import type { Horario } from '@/content';
import { useNow } from '@hooks/use-now';
import { getStoreStatus, getZonedNow } from './use-store-status.helper';

// «Abierto ahora / Cerrado»: lo único que la web calcula del horario, sin llamadas.
export const useStoreStatus = (horario: Horario) => {
  const now = useNow();
  return useMemo(() => getStoreStatus(horario, getZonedNow(now, horario.zonaHoraria)), [horario, now]);
};
