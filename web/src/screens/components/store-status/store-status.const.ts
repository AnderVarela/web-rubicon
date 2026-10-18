export enum StoreStatusVariant {
  INLINE = 'inline',
  PILL = 'pill',
  SHORT = 'short',
}

export enum StoreStatusTone {
  PRIMARY = 'primary',
  INVERSE = 'inverse',
}

export const STORE_STATUS_MESSAGES = {
  open: 'status.open',
  closed: 'status.closed',
  until: 'status.until',
  opensToday: 'status.opensToday',
  opensTomorrow: 'status.opensTomorrow',
  opensOn: 'status.opensOn',
  noSchedule: 'status.noSchedule',
} as const;

export const DAY_MESSAGE_PREFIX = 'days.';
