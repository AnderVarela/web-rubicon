import type { CSSProperties } from 'react';

export const getRevealStyle = (delay: number) => ({ '--reveal-delay': `${delay}ms` }) as CSSProperties;
