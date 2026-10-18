import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@hooks/use-focus-trap';
import { usePresence } from '@hooks/use-presence';
import { useReducedMotion } from '@hooks/use-reduced-motion';
import { useScrollLock } from '@hooks/use-scroll-lock';
import styles from './dialog.module.css';
import {
  DEFAULT_DIALOG_PLACEMENT,
  DEFAULT_DIALOG_TONE,
  DIALOG_EXIT_MS,
  DialogPlacement,
  DialogTone,
  ESCAPE_KEY,
} from './dialog.const';
import { getDialogClassName } from './dialog.helper';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  labelledBy?: string;
  placement?: DialogPlacement;
  tone?: DialogTone;
  backdrop?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
}

// Diálogo modal: foco atrapado, cierre con Escape y vuelta del foco a quien lo abrió.
export const Dialog = ({
  open,
  onClose,
  children,
  label,
  labelledBy,
  placement = DEFAULT_DIALOG_PLACEMENT,
  tone = DEFAULT_DIALOG_TONE,
  backdrop = true,
  initialFocusRef,
  className,
}: DialogProps) => {
  const reducedMotion = useReducedMotion();
  const { mounted, visible } = usePresence(open, reducedMotion ? 0 : DIALOG_EXIT_MS);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open && mounted, initialFocusRef);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {backdrop && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={[styles.backdrop, visible && styles.backdropVisible].filter(Boolean).join(' ')}
          onClick={onClose}
        />
      )}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={getDialogClassName(styles, { placement, tone, visible, className })}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};
