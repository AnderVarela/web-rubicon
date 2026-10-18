import { useState, type ReactNode } from 'react';
import { Logo, LogoAlign, LogoVariant } from '@components/logo';
import styles from './photo.module.css';
import { DEFAULT_PHOTO_RATIO, DEFAULT_PHOTO_TONE, PhotoRatio, PhotoTone } from './photo.const';
import { getPhotoClassName } from './photo.helper';

export interface PhotoProps {
  src: string | null;
  alt: string;
  ratio?: PhotoRatio;
  tone?: PhotoTone;
  zoomed?: boolean;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
}

// Foto con fondo mientras carga y un marcador con el símbolo si aún no hay foto.
export const Photo = ({
  src,
  alt,
  ratio = DEFAULT_PHOTO_RATIO,
  tone = DEFAULT_PHOTO_TONE,
  zoomed,
  eager,
  className,
  children,
}: PhotoProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={getPhotoClassName(styles, { ratio, tone, zoomed, className })}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={[styles.image, loaded && styles.loaded].filter(Boolean).join(' ')}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <span className={styles.placeholder} {...(alt ? { role: 'img', 'aria-label': alt } : {})}>
          <Logo variant={LogoVariant.SYMBOL} align={LogoAlign.CENTER} className={styles.watermark} />
        </span>
      )}
      {children}
    </span>
  );
};
