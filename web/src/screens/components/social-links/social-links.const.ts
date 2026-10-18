import { IconName } from '@components/icon';
import type { Red } from '@/content';

export enum SocialLinksVariant {
  OUTLINE = 'outline',
  OUTLINE_INVERSE = 'outlineInverse',
  GHOST_INVERSE = 'ghostInverse',
}

export const SOCIAL_NETWORKS: { id: Red; icon: IconName; messageId: string }[] = [
  { id: 'instagram', icon: IconName.INSTAGRAM, messageId: 'social.instagram' },
  { id: 'facebook', icon: IconName.FACEBOOK, messageId: 'social.facebook' },
  { id: 'tiktok', icon: IconName.TIKTOK, messageId: 'social.tiktok' },
];

export const SOCIAL_LINKS_MESSAGES = { label: 'social.label' } as const;
