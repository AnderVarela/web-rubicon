import styles from './avatar.module.css';
import { AvatarTone, DEFAULT_AVATAR_TONE } from './avatar.const';
import { getInitial } from './avatar.helper';

export interface AvatarProps {
  name: string;
  tone?: AvatarTone;
}

// Inicial en un círculo. Es decorativa: el nombre ya aparece al lado.
export const Avatar = ({ name, tone = DEFAULT_AVATAR_TONE }: AvatarProps) => (
  <span aria-hidden="true" className={[styles.avatar, styles[tone]].join(' ')}>
    {getInitial(name)}
  </span>
);
