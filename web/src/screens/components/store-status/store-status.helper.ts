import type { IntlShape } from 'react-intl';
import { OpeningDay, formatTime, type StoreStatus } from '@hooks/use-store-status';
import { DAY_MESSAGE_PREFIX, STORE_STATUS_MESSAGES } from './store-status.const';

type Format = IntlShape['formatMessage'];

export const getStateLabel = (status: StoreStatus, formatMessage: Format) =>
  formatMessage({ id: status.open ? STORE_STATUS_MESSAGES.open : STORE_STATUS_MESSAGES.closed });

export const getDetailLabel = (status: StoreStatus, formatMessage: Format) => {
  if (status.open) return formatMessage({ id: STORE_STATUS_MESSAGES.until }, { time: formatTime(status.closesAt) });
  if (status.opensAt === null) return formatMessage({ id: STORE_STATUS_MESSAGES.noSchedule });

  const time = formatTime(status.opensAt);
  if (status.when === OpeningDay.TODAY) return formatMessage({ id: STORE_STATUS_MESSAGES.opensToday }, { time });
  if (status.when === OpeningDay.TOMORROW) return formatMessage({ id: STORE_STATUS_MESSAGES.opensTomorrow }, { time });
  return formatMessage(
    { id: STORE_STATUS_MESSAGES.opensOn },
    { time, day: formatMessage({ id: `${DAY_MESSAGE_PREFIX}${status.day}` }) },
  );
};
