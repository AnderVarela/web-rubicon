import { useIntl } from 'react-intl';
import { Button, ButtonJustify, ButtonVariant } from '@components/button';
import { renderEmphasis } from '@components/emphasis';
import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { StatusDot } from '@components/status-dot';
import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import { CONTENT } from '@/content';
import styles from './catalog-empty.module.css';
import { CATALOG_EMPTY_MESSAGES, SHELF_SLOTS } from './catalog-empty.const';

// Estado «Próximamente» de la sección de catálogo cuando web.json no trae categorías.
export const CatalogEmpty = () => {
  const { formatMessage } = useIntl();
  const { telefono, whatsapp } = CONTENT.contacto;

  return (
    <div className={styles.catalogEmpty}>
      <div className={styles.copy}>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.EYEBROW} weight={TypographyWeight.MEDIUM} className={styles.label}>
          <StatusDot open={false} pulse={false} />
          {formatMessage({ id: CATALOG_EMPTY_MESSAGES.label })}
        </Text>
        <Text kind={TypographyKinds.H3} variant={TypographyVariant.DISPLAY_XL} className={styles.title}>
          {formatMessage({ id: CATALOG_EMPTY_MESSAGES.title }, { em: renderEmphasis })}
        </Text>
        <Text variant={TypographyVariant.BODY_M} className={styles.text}>
          {formatMessage({ id: CATALOG_EMPTY_MESSAGES.text })}
        </Text>
        <div className={styles.actions}>
          <Button
            href={whatsapp.enlace}
            external
            icon={IconName.WHATSAPP}
            justify={ButtonJustify.BETWEEN}
            className={styles.whatsapp}
          >
            {formatMessage({ id: CATALOG_EMPTY_MESSAGES.whatsapp })}
          </Button>
          <Button
            href={telefono.enlace}
            variant={ButtonVariant.SECONDARY}
            icon={IconName.PHONE}
            iconSize={IconSize.S}
            justify={ButtonJustify.BETWEEN}
            aria-label={formatMessage({ id: CATALOG_EMPTY_MESSAGES.call }, { phone: telefono.texto })}
            className={styles.phone}
          >
            {telefono.texto}
          </Button>
        </div>
      </div>
      <div aria-hidden="true" className={styles.shelf}>
        {SHELF_SLOTS.map((slot) => (
          <div key={slot.number} className={[styles.slot, slot.raised && styles.raised].filter(Boolean).join(' ')}>
            <span className={styles.frame}>
              <Icon name={slot.icon} tone={IconTone.PRIMARY} className={styles.slotIcon} />
            </span>
            <span className={styles.caption}>
              <span className={styles.rule} />
              <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.SERIF_NOTE} tone={TypographyTone.SECONDARY}>
                {formatMessage({ id: CATALOG_EMPTY_MESSAGES.slot }, { number: slot.number })}
              </Text>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
