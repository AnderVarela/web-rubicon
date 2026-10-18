import type { ReactNode } from 'react';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import styles from './eyebrow.module.css';

export interface EyebrowProps {
  children: ReactNode;
  kind?: TypographyKinds;
  className?: string;
}

// Antetítulo en versalitas con una línea delante.
export const Eyebrow = ({ children, kind = TypographyKinds.P, className }: EyebrowProps) => (
  <Text kind={kind} variant={TypographyVariant.EYEBROW} tone={TypographyTone.SECONDARY} className={[styles.eyebrow, className].filter(Boolean).join(' ')}>
    <span aria-hidden="true" className={styles.rule} />
    {children}
  </Text>
);
