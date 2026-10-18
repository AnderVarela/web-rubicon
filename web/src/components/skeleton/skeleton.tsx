import styles from './skeleton.module.css';
import { DEFAULT_SKELETON_TONE, SkeletonTone } from './skeleton.const';
import { getSkeletonStyle } from './skeleton.helper';

export interface SkeletonProps {
  width?: string;
  height?: string;
  tone?: SkeletonTone;
  fill?: boolean;
  className?: string;
}

// Bloque con brillo mientras carga. Siempre decorativo.
export const Skeleton = ({ width, height, tone = DEFAULT_SKELETON_TONE, fill, className }: SkeletonProps) => (
  <span
    aria-hidden="true"
    className={[styles.skeleton, styles[tone], fill && styles.fill, className].filter(Boolean).join(' ')}
    style={getSkeletonStyle(width, height)}
  />
);
