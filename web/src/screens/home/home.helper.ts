import type { Aviso } from '@/content';

// El aviso se oculta solo una vez pasado su último día («hasta», en la zona de la tienda).
export const isNoticeActive = (aviso: Aviso | null, todayIso: string) =>
  Boolean(aviso && (aviso.hasta === null || todayIso <= aviso.hasta));
