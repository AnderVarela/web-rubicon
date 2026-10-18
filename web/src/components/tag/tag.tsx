import styles from './tag.module.css';
import { DEFAULT_TAG_TONE, TagTone } from './tag.const';

export interface TagProps {
  label: string;
  tone?: TagTone;
  className?: string;
}

export const Tag = ({ label, tone = DEFAULT_TAG_TONE, className }: TagProps) => (
  <span className={[styles.tag, styles[tone], className].filter(Boolean).join(' ')}>{label}</span>
);
