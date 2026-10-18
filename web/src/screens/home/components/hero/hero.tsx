import { useIntl } from 'react-intl';
import { Button, ButtonJustify, ButtonVariant } from '@components/button';
import { Eyebrow } from '@components/eyebrow';
import { IconName } from '@components/icon';
import { Logo, LogoVariant } from '@components/logo';
import { Photo, PhotoRatio, PhotoTone } from '@components/photo';
import { Section } from '@components/section';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import heroPhoto from '@/assets/photos/hero-hogaza.jpg';
import { CONTENT } from '@/content';
import { SectionId } from '@screens/components/section-nav';
import { StoreStatus, StoreStatusVariant } from '@screens/components/store-status';
import { HeroSeal } from '@screens/home/components/hero-seal';
import styles from './hero.module.css';
import { HERO_MESSAGES, HERO_TITLE_ID } from './hero.const';

export const Hero = () => {
  const { formatMessage } = useIntl();
  const { portada, contacto } = CONTENT;

  return (
    <Section id={SectionId.HOME} labelledBy={HERO_TITLE_ID} className={styles.hero} containerClassName={styles.grid}>
      <div className={styles.copy}>
        <span aria-hidden="true" className={styles.halo} />
        <Eyebrow className={styles.eyebrow}>{portada.linea}</Eyebrow>
        <Text kind={TypographyKinds.H1} id={HERO_TITLE_ID} className={styles.title}>
          <Logo variant={LogoVariant.WORDMARK_SLOGAN} label={formatMessage({ id: HERO_MESSAGES.title })} />
        </Text>
        <Text variant={TypographyVariant.BODY_L} className={styles.intro}>
          {formatMessage({ id: HERO_MESSAGES.intro })}
        </Text>
        <StoreStatus variant={StoreStatusVariant.PILL} className={styles.pill} />
        <div className={styles.actions}>
          <Button href={`#${SectionId.CATALOG}`} justify={ButtonJustify.BETWEEN} icon={IconName.ARROW_DOWN} className={styles.action}>
            {formatMessage({ id: HERO_MESSAGES.ctaCatalog })}
          </Button>
          <Button
            href={contacto.urlComoLlegar}
            external
            variant={ButtonVariant.SECONDARY}
            justify={ButtonJustify.BETWEEN}
            icon={IconName.ARROW_UP_RIGHT}
            className={styles.action}
          >
            {formatMessage({ id: HERO_MESSAGES.ctaDirections })}
          </Button>
        </div>
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <Text kind={TypographyKinds.DT} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY}>
              {formatMessage({ id: HERO_MESSAGES.today })}
            </Text>
            <Text kind={TypographyKinds.DD} variant={TypographyVariant.BODY_MS}>
              <StoreStatus />
            </Text>
          </div>
          <div className={styles.fact}>
            <Text kind={TypographyKinds.DT} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY}>
              {formatMessage({ id: HERO_MESSAGES.where })}
            </Text>
            <Text kind={TypographyKinds.DD} variant={TypographyVariant.BODY_MS}>
              {formatMessage({ id: HERO_MESSAGES.address }, { address: contacto.direccion, town: contacto.localidad })}
            </Text>
          </div>
        </dl>
      </div>
      <figure className={styles.figure}>
        <span className={styles.frame}>
          <Photo src={heroPhoto} alt={formatMessage({ id: HERO_MESSAGES.photoAlt })} ratio={PhotoRatio.FILL} tone={PhotoTone.PEACH} eager />
          <HeroSeal line={portada.linea} />
        </span>
      </figure>
    </Section>
  );
};
