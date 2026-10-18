import { useIntl } from 'react-intl';
import { ActionRow } from '@components/action-row';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { renderEmphasis } from '@components/emphasis';
import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { Reveal } from '@components/reveal';
import { Section, SectionTone } from '@components/section';
import { SectionHeading } from '@components/section-heading';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { OpeningHours } from '@screens/components/opening-hours';
import { SectionId } from '@screens/components/section-nav';
import { SocialLinks } from '@screens/components/social-links';
import { MapEmbed } from '@screens/home/components/map-embed';
import styles from './visit.module.css';
import { VISIT_MESSAGES, VISIT_NUMBER, VISIT_TITLE_ID } from './visit.const';

export const Visit = () => {
  const { formatMessage } = useIntl();
  const { contacto } = CONTENT;

  return (
    <Section id={SectionId.VISIT} labelledBy={VISIT_TITLE_ID} tone={SectionTone.SUBTLE}>
      <Reveal>
        <SectionHeading
          label={formatMessage({ id: VISIT_MESSAGES.section })}
          number={formatMessage({ id: VISIT_MESSAGES.number }, { number: VISIT_NUMBER })}
        />
      </Reveal>
      <Reveal delay={60}>
        <Text kind={TypographyKinds.H2} variant={TypographyVariant.DISPLAY} id={VISIT_TITLE_ID} className={styles.title}>
          {formatMessage({ id: VISIT_MESSAGES.title }, { em: renderEmphasis })}
        </Text>
      </Reveal>
      <Reveal delay={120} className={styles.grid}>
        <div className={styles.info}>
          <div>
            <div className={styles.actions}>
              <ActionRow
                href={contacto.telefono.enlace}
                icon={IconName.PHONE}
                title={formatMessage({ id: VISIT_MESSAGES.call })}
                subtitle={contacto.telefono.texto}
              />
              <ActionRow
                href={contacto.whatsapp.enlace}
                icon={IconName.WHATSAPP}
                iconTone={IconTone.WHATSAPP}
                title={formatMessage({ id: VISIT_MESSAGES.whatsapp })}
                subtitle={formatMessage({ id: VISIT_MESSAGES.whatsappNote })}
                external
              />
              <ActionRow
                href={contacto.urlComoLlegar}
                icon={IconName.NAVIGATION}
                title={formatMessage({ id: VISIT_MESSAGES.directions })}
                subtitle={formatMessage({ id: VISIT_MESSAGES.directionsNote })}
                external
              />
            </div>
            <Text variant={TypographyVariant.CAPTION} className={styles.warning}>
              <Icon name={IconName.INFO} size={IconSize.S} />
              {formatMessage({ id: VISIT_MESSAGES.whatsappWarning })}
            </Text>
          </div>
          <div className={styles.details}>
            <div>
              <Text variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} className={styles.label}>
                {formatMessage({ id: VISIT_MESSAGES.address })}
              </Text>
              <Text variant={TypographyVariant.TITLE_XS}>
                {contacto.direccion}
                <br />
                {contacto.localidad}
              </Text>
            </div>
            {contacto.email && (
              <div>
                <Text variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} className={styles.label}>
                  {formatMessage({ id: VISIT_MESSAGES.email })}
                </Text>
                <Button href={`mailto:${contacto.email}`} variant={ButtonVariant.PLAIN} size={ButtonSize.S} className={styles.email}>
                  {contacto.email}
                </Button>
              </div>
            )}
          </div>
          <OpeningHours />
          <div className={styles.follow}>
            <Text variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY}>
              {formatMessage({ id: VISIT_MESSAGES.follow })}
            </Text>
            <SocialLinks />
          </div>
        </div>
        <div className={styles.map}>
          <MapEmbed />
        </div>
      </Reveal>
    </Section>
  );
};
