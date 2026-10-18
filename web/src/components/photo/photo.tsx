import { useState, type ReactNode } from 'react';
import { Logo, LogoAlign, LogoVariant } from '@components/logo';
import styles from './photo.module.css';
import { DEFAULT_PHOTO_RATIO, DEFAULT_PHOTO_TONE, PhotoRatio, PhotoTone } from './photo.const';
import { getPhotoClassName } from './photo.helper';

export interface PhotoSource {
  type: string;
  srcSet: string;
}

export interface PhotoProps {
  src: string | null;
  sources?: PhotoSource[];
  sizes?: string;
  priority?: boolean;
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
  sources = [],
  sizes,
  priority,
  alt,
  ratio = DEFAULT_PHOTO_RATIO,
  tone = DEFAULT_PHOTO_TONE,
  zoomed,
  eager,
  className,
  children,
}: PhotoProps) => {
  // La foto prioritaria (la de portada) aparece sin fundido para no retrasar el primer pintado.
  const [loaded, setLoaded] = useState(Boolean(priority));
  const image = src && (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={eager || priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={[styles.image, loaded && styles.loaded].filter(Boolean).join(' ')}
      onLoad={() => setLoaded(true)}
    />
  );

  return (
    <span className={getPhotoClassName(styles, { ratio, tone, zoomed, className })}>
      {image && sources.length > 0 && (
        <picture>
          {sources.map((source) => (
            <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
          ))}
          {image}
        </picture>
      )}
      {image && sources.length === 0 && image}
      {!image && (
        <span className={styles.placeholder} {...(alt ? { role: 'img', 'aria-label': alt } : {})}>
          <Logo variant={LogoVariant.SYMBOL} align={LogoAlign.CENTER} className={styles.watermark} />
        </span>
      )}
      {children}
    </span>
  );
};
