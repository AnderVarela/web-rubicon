import { SEAL_CENTER, SEAL_SEPARATOR, SEAL_TEXT_RADIUS } from './hero-seal.const';

// Círculo completo para que el texto dé la vuelta al sello.
export const getSealPath = (center = SEAL_CENTER, radius = SEAL_TEXT_RADIUS) =>
  `M${center},${center} m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`;

export const getSealText = (line: string) => `${line.toLocaleUpperCase('es')}${SEAL_SEPARATOR}`;
