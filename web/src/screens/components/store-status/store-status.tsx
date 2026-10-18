import { useIntl } from 'react-intl';
import { StatusDot } from '@components/status-dot';
import { CONTENT } from '@/content';
import { useReducedMotion } from '@hooks/use-reduced-motion';
import { useStoreStatus } from '@hooks/use-store-status';
import styles from './store-status.module.css';
import { StoreStatusTone, StoreStatusVariant } from './store-status.const';
import { getDetailLabel, getStateLabel } from './store-status.helper';

export interface StoreStatusProps {
  variant?: StoreStatusVariant;
  tone?: StoreStatusTone;
  className?: string;
}

export const StoreStatus = ({ variant = StoreStatusVariant.INLINE, tone = StoreStatusTone.PRIMARY, className }: StoreStatusProps) => {
  const { formatMessage } = useIntl();
  const status = useStoreStatus(CONTENT.horario);
  const reducedMotion = useReducedMotion();

  return (
    <span className={[styles.storeStatus, styles[variant], styles[tone], className].filter(Boolean).join(' ')}>
      <StatusDot open={status.open} pulse={!reducedMotion} />
      <span>
        <strong className={variant === StoreStatusVariant.SHORT ? styles.short : styles.state}>{getStateLabel(status, formatMessage)}</strong>
        {variant !== StoreStatusVariant.SHORT && <> · {getDetailLabel(status, formatMessage)}</>}
      </span>
    </span>
  );
};
