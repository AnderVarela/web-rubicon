import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Icon, IconName, IconSize } from '@components/icon';
import { Text, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useConsent } from '@hooks/use-consent';
import styles from './map-embed.module.css';
import { MAP_EMBED_MESSAGES } from './map-embed.const';

// El mapa de Google solo se carga con consentimiento; mientras tanto, un mapa ilustrado.
export const MapEmbed = () => {
  const { formatMessage } = useIntl();
  const { mapsAllowed, acceptAll } = useConsent();
  const { urlMapa, urlComoLlegar, direccion, localidad } = CONTENT.contacto;

  return (
    <div className={styles.mapEmbed}>
      <div className={styles.frame}>
        {mapsAllowed ? (
          <iframe title={formatMessage({ id: MAP_EMBED_MESSAGES.title })} src={urlMapa} loading="lazy" className={styles.iframe} />
        ) : (
          <>
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
            <div className={styles.card}>
              <Text variant={TypographyVariant.BODY_MS} className={styles.notice}>
                <Icon name={IconName.MAP} size={IconSize.L} />
                {formatMessage({ id: MAP_EMBED_MESSAGES.notice })}
              </Text>
              <div className={styles.actions}>
                <Button size={ButtonSize.M} onClick={acceptAll}>
                  {formatMessage({ id: MAP_EMBED_MESSAGES.load })}
                </Button>
                <Button href={urlComoLlegar} external variant={ButtonVariant.PLAIN} size={ButtonSize.S} icon={IconName.ARROW_UP_RIGHT} iconSize={IconSize.XS} className={styles.open}>
                  {formatMessage({ id: MAP_EMBED_MESSAGES.open })}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.SECONDARY} className={styles.caption}>
        {mapsAllowed
          ? formatMessage({ id: MAP_EMBED_MESSAGES.loaded })
          : formatMessage({ id: MAP_EMBED_MESSAGES.caption }, { address: direccion, town: localidad })}
      </Text>
    </div>
  );
};
