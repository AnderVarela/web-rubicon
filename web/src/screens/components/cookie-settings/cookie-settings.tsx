import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, ButtonSize } from '@components/button';
import { Dialog, DialogPlacement } from '@components/dialog';
import { IconName } from '@components/icon';
import { IconButton } from '@components/icon-button';
import { Switch } from '@components/switch';
import { Tag } from '@components/tag';
import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import { useConsent } from '@hooks/use-consent';
import { MEDIA_DESKTOP, useMediaQuery } from '@hooks/use-media-query';
import styles from './cookie-settings.module.css';
import {
  COOKIE_SETTINGS_MAPS_ID,
  COOKIE_SETTINGS_MAPS_TEXT_ID,
  COOKIE_SETTINGS_MESSAGES,
  COOKIE_SETTINGS_TITLE_ID,
} from './cookie-settings.const';

export const CookieSettings = () => {
  const { formatMessage } = useIntl();
  const desktop = useMediaQuery(MEDIA_DESKTOP);
  const { settingsOpen, mapsAllowed, closeSettings, rejectAll, acceptAll, save } = useConsent();
  const [maps, setMaps] = useState(mapsAllowed);
  // Cada vez que se abre, el interruptor parte de la elección guardada.
  const [wasOpen, setWasOpen] = useState(settingsOpen);
  if (settingsOpen !== wasOpen) {
    setWasOpen(settingsOpen);
    if (settingsOpen) setMaps(mapsAllowed);
  }

  return (
    <Dialog
      open={settingsOpen}
      onClose={closeSettings}
      labelledBy={COOKIE_SETTINGS_TITLE_ID}
      placement={desktop ? DialogPlacement.CENTER : DialogPlacement.BOTTOM}
      className={styles.cookieSettings}
    >
      <div className={styles.header}>
        <Text kind={TypographyKinds.H2} variant={TypographyVariant.TITLE_S} id={COOKIE_SETTINGS_TITLE_ID}>
          {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.title })}
        </Text>
        <IconButton icon={IconName.CLOSE} label={formatMessage({ id: COOKIE_SETTINGS_MESSAGES.close })} onClick={closeSettings} />
      </div>
      <Text variant={TypographyVariant.BODY_S} className={styles.intro}>
        {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.intro })}
      </Text>
      <div className={styles.option}>
        <div className={styles.optionText}>
          <Text variant={TypographyVariant.BODY_M} weight={TypographyWeight.SEMIBOLD}>
            {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.technical })}
          </Text>
          <Text variant={TypographyVariant.BODY_S} tone={TypographyTone.SECONDARY}>
            {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.technicalText })}
          </Text>
        </div>
        <Tag label={formatMessage({ id: COOKIE_SETTINGS_MESSAGES.alwaysOn })} />
      </div>
      <div className={[styles.option, styles.last].join(' ')}>
        <div className={styles.optionText}>
          <Text variant={TypographyVariant.BODY_M} weight={TypographyWeight.SEMIBOLD} id={COOKIE_SETTINGS_MAPS_ID}>
            {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.maps })}
          </Text>
          <Text variant={TypographyVariant.BODY_S} tone={TypographyTone.SECONDARY} id={COOKIE_SETTINGS_MAPS_TEXT_ID}>
            {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.mapsText })}
          </Text>
        </div>
        <Switch checked={maps} onChange={setMaps} labelledBy={COOKIE_SETTINGS_MAPS_ID} describedBy={COOKIE_SETTINGS_MAPS_TEXT_ID} />
      </div>
      <div className={styles.actions}>
        <Button size={ButtonSize.M} onClick={rejectAll} className={styles.action}>
          {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.reject })}
        </Button>
        <Button size={ButtonSize.M} onClick={() => save(maps)} className={styles.action}>
          {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.save })}
        </Button>
        <Button size={ButtonSize.M} onClick={acceptAll} className={styles.action}>
          {formatMessage({ id: COOKIE_SETTINGS_MESSAGES.acceptAll })}
        </Button>
      </div>
    </Dialog>
  );
};
