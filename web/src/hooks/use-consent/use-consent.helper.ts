import { CONSENT_STORAGE_KEY, ConsentChoice } from './use-consent.const';

export interface ConsentState {
  choice: ConsentChoice | null;
  settingsOpen: boolean;
}

const isChoice = (value: string | null): value is ConsentChoice => Object.values(ConsentChoice).includes(value as ConsentChoice);

// El almacenamiento puede fallar (navegación privada, cookies bloqueadas): entonces se vuelve a preguntar.
export const readStoredChoice = (storage: Storage | undefined): ConsentChoice | null => {
  try {
    const value = storage?.getItem(CONSENT_STORAGE_KEY) ?? null;
    return isChoice(value) ? value : null;
  } catch {
    return null;
  }
};

export const storeChoice = (storage: Storage | undefined, choice: ConsentChoice) => {
  try {
    storage?.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Sin almacenamiento la elección vale solo para esta visita.
  }
};

type Listener = () => void;

// Estado compartido por el banner, el diálogo, el mapa y el pie, sin proveedor de contexto.
export const createConsentStore = (storage: Storage | undefined) => {
  let state: ConsentState = { choice: readStoredChoice(storage), settingsOpen: false };
  const listeners = new Set<Listener>();
  const set = (next: Partial<ConsentState>) => {
    state = { ...state, ...next };
    listeners.forEach((listener) => listener());
  };

  return {
    getState: () => state,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    choose: (choice: ConsentChoice) => {
      storeChoice(storage, choice);
      set({ choice, settingsOpen: false });
    },
    openSettings: () => set({ settingsOpen: true }),
    closeSettings: () => set({ settingsOpen: false }),
    reset: () => set({ choice: readStoredChoice(storage), settingsOpen: false }),
  };
};

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

export const consentStore = createConsentStore(safeStorage());
