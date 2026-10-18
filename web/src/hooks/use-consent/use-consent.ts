import { useSyncExternalStore } from 'react';
import { ConsentChoice } from './use-consent.const';
import { consentStore } from './use-consent.helper';

export const useConsent = () => {
  const { choice, settingsOpen } = useSyncExternalStore(consentStore.subscribe, consentStore.getState, consentStore.getState);

  return {
    decided: choice !== null,
    mapsAllowed: choice === ConsentChoice.ALL,
    settingsOpen,
    acceptAll: () => consentStore.choose(ConsentChoice.ALL),
    rejectAll: () => consentStore.choose(ConsentChoice.TECHNICAL),
    save: (maps: boolean) => consentStore.choose(maps ? ConsentChoice.ALL : ConsentChoice.TECHNICAL),
    openSettings: consentStore.openSettings,
    closeSettings: consentStore.closeSettings,
  };
};
