import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Container } from '@components/container';
import { Text, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useNow } from '@hooks/use-now';
import { LegalNav } from '@screens/components/legal-nav';
import { OpeningHours, OpeningHoursVariant } from '@screens/components/opening-hours';
import { SectionNav, SectionNavVariant } from '@screens/components/section-nav';
import { SocialLinks, SocialLinksVariant } from '@screens/components/social-links';
import styles from './site-footer.module.css';
import { SITE_FOOTER_MESSAGES } from './site-footer.const';

export interface SiteFooterProps {
  fromHome?: boolean;
}

export const SiteFooter = ({ fromHome = true }: SiteFooterProps) => {
  const { formatMessage } = useIntl();
  const year = useNow().getFullYear();
  const { contacto } = CONTENT;

  return (
    <footer className={styles.siteFooter}>
      <Container>
        <div className={styles.columns}>
          <div>
            <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.INVERSE_MUTED} className={styles.columnTitle}>
              {formatMessage({ id: SITE_FOOTER_MESSAGES.address })}
            </Text>
            <Text variant={TypographyVariant.BODY_MS} tone={TypographyTone.INVERSE} className={styles.address}>
              {contacto.direccion}
              <br />
              {contacto.localidad}
            </Text>
            <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.INVERSE_MUTED} className={styles.columnTitle}>
              {formatMessage({ id: SITE_FOOTER_MESSAGES.hours })}
            </Text>
            <div className={styles.inverse}>
              <OpeningHours variant={OpeningHoursVariant.SUMMARY} />
            </div>
          </div>
          <div>
            <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.INVERSE_MUTED} className={styles.columnTitle}>
              {formatMessage({ id: SITE_FOOTER_MESSAGES.contact })}
            </Text>
            <ul className={styles.links}>
              <li>
                <Button href={contacto.telefono.enlace} variant={ButtonVariant.PLAIN_INVERSE} size={ButtonSize.S}>
                  {contacto.telefono.texto}
                </Button>
              </li>
              <li>
                <Button href={contacto.whatsapp.enlace} external variant={ButtonVariant.PLAIN_INVERSE} size={ButtonSize.S}>
                  {formatMessage({ id: SITE_FOOTER_MESSAGES.whatsapp })}
                </Button>
              </li>
              {contacto.email && (
                <li>
                  <Button href={`mailto:${contacto.email}`} variant={ButtonVariant.PLAIN_INVERSE} size={ButtonSize.S} className={styles.email}>
                    {contacto.email}
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.INVERSE_MUTED} className={styles.columnTitle}>
              {formatMessage({ id: SITE_FOOTER_MESSAGES.bakery })}
            </Text>
            <SectionNav variant={SectionNavVariant.FOOTER} fromHome={fromHome} labelId={SITE_FOOTER_MESSAGES.sections} />
          </div>
          <div>
            <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.INVERSE_MUTED} className={styles.columnTitle}>
              {formatMessage({ id: SITE_FOOTER_MESSAGES.follow })}
            </Text>
            <SocialLinks variant={SocialLinksVariant.OUTLINE_INVERSE} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Text variant={TypographyVariant.CAPTION} tone={TypographyTone.INVERSE_MUTED}>
            {formatMessage({ id: SITE_FOOTER_MESSAGES.copyright }, { year })}
          </Text>
          <LegalNav />
        </div>
      </Container>
    </footer>
  );
};
