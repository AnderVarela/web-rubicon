import type { CSSProperties } from 'react';

// Medidas dinámicas como variables CSS (el estilo vive en el módulo).
export const getSkeletonStyle = (width?: string, height?: string) =>
  ({ '--skeleton-width': width, '--skeleton-height': height }) as CSSProperties;
