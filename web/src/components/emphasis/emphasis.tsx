import type { ReactNode } from 'react';
import styles from './emphasis.module.css';

export interface EmphasisProps {
  children: ReactNode;
}

export const Emphasis = ({ children }: EmphasisProps) => <em className={styles.emphasis}>{children}</em>;

// Para usar en formatMessage con texto enriquecido: { em: renderEmphasis }.
export const renderEmphasis = (chunks: ReactNode[]) => <Emphasis>{chunks}</Emphasis>;
