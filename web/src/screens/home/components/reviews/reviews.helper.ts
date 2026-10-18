import { AvatarTone } from '@components/avatar';

// Los avatares alternan melocotón y rosa, como en el diseño.
export const getAvatarTone = (index: number) => (index % 2 ? AvatarTone.ROSE : AvatarTone.PEACH);
