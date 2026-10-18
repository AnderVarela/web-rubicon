import type { Red } from '@/content';
import { SOCIAL_NETWORKS } from './social-links.const';

// Solo las redes con URL: un icono por cada clave presente en web.json.
export const getConfiguredNetworks = (redes: Partial<Record<Red, string>>) =>
  SOCIAL_NETWORKS.flatMap((network) => (redes[network.id] ? [{ ...network, url: redes[network.id] as string }] : []));
