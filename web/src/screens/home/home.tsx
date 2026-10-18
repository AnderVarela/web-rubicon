import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SkipLink } from '@components/skip-link';
import { CookieBanner } from '@screens/components/cookie-banner';
import { CookieSettings } from '@screens/components/cookie-settings';
import { SiteFooter } from '@screens/components/site-footer';
import { CONTENT } from '@/content';
import { useConsent } from '@hooks/use-consent';
import { useNow } from '@hooks/use-now';
import { getZonedNow } from '@hooks/use-store-status';
import { About } from '@screens/home/components/about';
import { Catalog } from '@screens/home/components/catalog';
import { Hero } from '@screens/home/components/hero';
import { MobileDock } from '@screens/home/components/mobile-dock';
import { MobileMenu } from '@screens/home/components/mobile-menu';
import { NoticeBar } from '@screens/home/components/notice-bar';
import { Reviews } from '@screens/home/components/reviews';
import { Visit } from '@screens/home/components/visit';
import { SiteHeader } from '@screens/home/components/site-header';
import { useActiveSection } from '@screens/home/hooks/use-active-section';
import styles from './home.module.css';
import { HOME_MESSAGES, MAIN_CONTENT_ID } from './home.const';
import { isNoticeActive, scrollToLocationHash } from './home.helper';

export const Home = () => {
  const { formatMessage } = useIntl();
  const now = useNow();
  const { activeId, scrolled } = useActiveSection();
  const [noticeClosed, setNoticeClosed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { decided, settingsOpen } = useConsent();
  const bannerVisible = !decided && !settingsOpen;
  const { aviso, horario } = CONTENT;
  useEffect(() => {
    scrollToLocationHash(document, window.location.hash);
  }, []);

  const showNotice = isNoticeActive(aviso, getZonedNow(now, horario.zonaHoraria).isoDate) && !noticeClosed;

  return (
    <div className={[styles.home, showNotice && styles.withNotice, bannerVisible && styles.withBanner].filter(Boolean).join(' ')}>
      <SkipLink targetId={MAIN_CONTENT_ID} label={formatMessage({ id: HOME_MESSAGES.skipToContent })} />
      <div className={styles.top}>
        {showNotice && aviso && <NoticeBar text={aviso.texto} onClose={() => setNoticeClosed(true)} />}
        <SiteHeader activeId={activeId} scrolled={scrolled} />
      </div>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.main}>
        <Hero />
        <Catalog />
        <About />
        <Reviews />
        <Visit />
      </main>
      <SiteFooter />
      {!bannerVisible && <MobileDock activeId={activeId} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />}
      <MobileMenu open={menuOpen} activeId={activeId} onClose={() => setMenuOpen(false)} />
      <CookieBanner />
      <CookieSettings />
    </div>
  );
};
