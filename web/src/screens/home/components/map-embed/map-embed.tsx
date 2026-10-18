import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Icon, IconName, IconSize } from '@components/icon';
import { Text, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useConsent } from '@hooks/use-consent';
import styles from './map-embed.module.css';
import { MAP_EMBED_MESSAGES, MAP_LOAD_TIMEOUT_MS, MapStatus } from './map-embed.const';

// El mapa de Google solo se carga con consentimiento. El mapa ilustrado queda debajo
// mientras Google carga. Si no responde a tiempo, se retira el iframe: así el navegador no llega
// a pintar su página de error dentro (que también dispara onLoad), y se ofrece reintentar o abrir Google Maps.
export const MapEmbed = () => {
  const { formatMessage } = useIntl();
  const { mapsAllowed, acceptAll } = useConsent();
  const [status, setStatus] = useState(MapStatus.LOADING);
  const [attempt, setAttempt] = useState(0);
  const { urlMapa, urlComoLlegar, direccion, localidad } = CONTENT.contacto;
  const loaded = mapsAllowed && status === MapStatus.LOADED;
  const failed = mapsAllowed && status === MapStatus.FAILED;

  useEffect(() => {
    if (!mapsAllowed || status !== MapStatus.LOADING) return undefined;
    const timer = window.setTimeout(() => setStatus(MapStatus.FAILED), MAP_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [mapsAllowed, status, attempt]);

  const retry = () => {
    setStatus(MapStatus.LOADING);
    setAttempt((value) => value + 1);
  };

  const openInMaps = (
    <Button href={urlComoLlegar} external variant={ButtonVariant.PLAIN} size={ButtonSize.S} icon={IconName.ARROW_UP_RIGHT} iconSize={IconSize.XS} className={styles.open}>
      {formatMessage({ id: MAP_EMBED_MESSAGES.open })}
    </Button>
  );

  return (
    <div className={styles.mapEmbed}>
      <div className={styles.frame}>
        <span aria-hidden="true" className={styles.illustration}>
          <span className={[styles.street, styles.streetA].join(' ')} />
          <span className={[styles.street, styles.streetB].join(' ')} />
          <span className={[styles.street, styles.streetC].join(' ')} />
          <span className={[styles.street, styles.streetD].join(' ')} />
          <span className={[styles.street, styles.streetE].join(' ')} />
          <span className={[styles.park, styles.parkA].join(' ')} />
          <span className={[styles.park, styles.parkB].join(' ')} />
          <span className={styles.pin} />
        </span>
        {mapsAllowed && !failed && (
          <iframe
            key={attempt}
            title={formatMessage({ id: MAP_EMBED_MESSAGES.title })}
            src={urlMapa}
            loading="lazy"
            className={[styles.iframe, loaded && styles.iframeLoaded].filter(Boolean).join(' ')}
            onLoad={() => setStatus((current) => (current === MapStatus.LOADING ? MapStatus.LOADED : current))}
          />
        )}
        {!mapsAllowed && (
          <div className={styles.card}>
            <Text variant={TypographyVariant.BODY_MS} className={styles.notice}>
              <Icon name={IconName.MAP} size={IconSize.L} />
              {formatMessage({ id: MAP_EMBED_MESSAGES.notice })}
            </Text>
            <div className={styles.actions}>
              <Button size={ButtonSize.M} onClick={acceptAll}>
                {formatMessage({ id: MAP_EMBED_MESSAGES.load })}
              </Button>
              {openInMaps}
            </div>
          </div>
        )}
        {failed && (
          <div role="status" className={styles.card}>
            <Text variant={TypographyVariant.BODY_MS} className={styles.notice}>
              <Icon name={IconName.MAP} size={IconSize.L} />
              {formatMessage({ id: MAP_EMBED_MESSAGES.failed })}
            </Text>
            <div className={styles.actions}>
              <Button size={ButtonSize.M} onClick={retry}>
                {formatMessage({ id: MAP_EMBED_MESSAGES.retry })}
              </Button>
              {openInMaps}
            </div>
          </div>
        )}
      </div>
      <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.SECONDARY} className={styles.caption}>
        {loaded
          ? formatMessage({ id: MAP_EMBED_MESSAGES.loaded })
          : formatMessage({ id: MAP_EMBED_MESSAGES.caption }, { address: direccion, town: localidad })}
      </Text>
    </div>
  );
};
