import { useIntl } from 'react-intl';
import { Button, ButtonJustify, ButtonSize, ButtonVariant, IconPosition } from '@components/button';
import { Container } from '@components/container';
import { renderEmphasis } from '@components/emphasis';
import { IconName, IconSize } from '@components/icon';
import { Logo } from '@components/logo';
import { SectionHeading } from '@components/section-heading';
import { Text, TypographyKinds, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useDocumentTitle } from '@hooks/use-document-title';
import styles from './not-found.module.css';
import { CATALOG_PATH, ERROR_CODE, HOME_PATH, NOT_FOUND_MAIN_ID, NOT_FOUND_MESSAGES } from './not-found.const';

export const NotFound = () => {
  const { formatMessage } = useIntl();
  const { telefono } = CONTENT.contacto;
  useDocumentTitle(formatMessage({ id: NOT_FOUND_MESSAGES.pageTitle }));

  return (
    <div className={styles.notFound}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <a href={HOME_PATH} aria-label={formatMessage({ id: NOT_FOUND_MESSAGES.home })} className={styles.home}>
            <Logo className={styles.logo} />
          </a>
          <Button
            href={telefono.enlace}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.S}
            icon={IconName.PHONE}
            iconSize={IconSize.XS}
            iconPosition={IconPosition.START}
            aria-label={formatMessage({ id: NOT_FOUND_MESSAGES.call }, { phone: telefono.texto })}
            className={styles.call}
          >
            {telefono.texto}
          </Button>
        </Container>
      </header>
      <main id={NOT_FOUND_MAIN_ID} className={styles.main}>
        <Container className={styles.content}>
          <SectionHeading
            label={formatMessage({ id: NOT_FOUND_MESSAGES.section })}
            number={formatMessage({ id: NOT_FOUND_MESSAGES.eyebrow })}
          />
          <div className={styles.grid}>
            <div className={styles.copy}>
              <Text kind={TypographyKinds.H1} variant={TypographyVariant.DISPLAY}>
                {formatMessage({ id: NOT_FOUND_MESSAGES.title }, { em: renderEmphasis })}
              </Text>
              <Text variant={TypographyVariant.BODY_M} className={styles.text}>
                {formatMessage({ id: NOT_FOUND_MESSAGES.text })}
              </Text>
              <div className={styles.actions}>
                <Button href={HOME_PATH} justify={ButtonJustify.BETWEEN} icon={IconName.ARROW_RIGHT} className={styles.action}>
                  {formatMessage({ id: NOT_FOUND_MESSAGES.back })}
                </Button>
                <Button
                  href={CATALOG_PATH}
                  variant={ButtonVariant.SECONDARY}
                  justify={ButtonJustify.BETWEEN}
                  icon={IconName.ARROW_UP_RIGHT}
                  className={styles.action}
                >
                  {formatMessage({ id: NOT_FOUND_MESSAGES.catalog })}
                </Button>
              </div>
            </div>
            <span aria-hidden="true" className={styles.code}>
              {ERROR_CODE}
            </span>
          </div>
        </Container>
      </main>
      <span aria-hidden="true" className={styles.illustration} />
    </div>
  );
};
