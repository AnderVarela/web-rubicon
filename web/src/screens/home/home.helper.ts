import type { Aviso } from '@/content';

// El aviso se oculta solo una vez pasado su último día («hasta», en la zona de la tienda).
export const isNoticeActive = (aviso: Aviso | null, todayIso: string) =>
  Boolean(aviso && (aviso.hasta === null || todayIso <= aviso.hasta));

// La página se pinta después de cargar, así que el navegador no llega solo al ancla de la URL.
export const scrollToLocationHash = (doc: Document, hash: string) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (id) doc.getElementById(id)?.scrollIntoView();
};
