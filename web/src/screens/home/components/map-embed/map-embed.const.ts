export const MAP_EMBED_MESSAGES = {
  notice: 'map.notice',
  load: 'map.load',
  open: 'map.open',
  title: 'map.title',
  loaded: 'map.loaded',
  failed: 'map.failed',
  caption: 'map.caption',
} as const;

// Si Google no responde en este tiempo, se avisa y se ofrece abrir el mapa fuera.
export const MAP_LOAD_TIMEOUT_MS = 10_000;
