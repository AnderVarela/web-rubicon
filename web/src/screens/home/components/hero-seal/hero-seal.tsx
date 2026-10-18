import { useId } from 'react';
import { Logo, LogoAlign, LogoVariant } from '@components/logo';
import styles from './hero-seal.module.css';
import { SEAL_CENTER, SEAL_RING_RADIUS, SEAL_TEXT_LENGTH, SEAL_VIEW_BOX } from './hero-seal.const';
import { getSealPath, getSealText } from './hero-seal.helper';

export interface HeroSealProps {
  line: string;
}

// Sello decorativo con la línea de la portada girando alrededor del símbolo.
export const HeroSeal = ({ line }: HeroSealProps) => {
  const pathId = useId();

  return (
    <span aria-hidden="true" className={styles.heroSeal}>
      <svg viewBox={SEAL_VIEW_BOX} focusable="false" className={styles.ring}>
        <defs>
          <path id={pathId} d={getSealPath()} />
        </defs>
        <circle cx={SEAL_CENTER} cy={SEAL_CENTER} r={SEAL_RING_RADIUS} className={styles.circle} />
        <text className={styles.text}>
          <textPath href={`#${pathId}`} textLength={SEAL_TEXT_LENGTH} lengthAdjust="spacing">
            {getSealText(line)}
          </textPath>
        </text>
      </svg>
      <Logo variant={LogoVariant.SYMBOL} align={LogoAlign.CENTER} className={styles.symbol} />
    </span>
  );
};
