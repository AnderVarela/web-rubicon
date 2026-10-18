export enum OpeningHoursVariant {
  TABLE = 'table',
  SUMMARY = 'summary',
}

export const OPENING_HOURS_MESSAGES = {
  caption: 'hours.caption',
  today: 'hours.today',
  closed: 'hours.closed',
  closedLower: 'hours.closedLower',
  range: 'hours.range',
  group: 'hours.group',
  twoDays: 'hours.twoDays',
  dayRange: 'hours.dayRange',
  exceptions: 'hours.exceptions',
  exceptionClosed: 'hours.exceptionClosed',
  exceptionOpen: 'hours.exceptionOpen',
} as const;

export const DAY_MESSAGE_PREFIX = 'days.';
export const RANGE_SEPARATOR = ' · ';
export const EXCEPTIONS_TITLE_ID = 'horario-especial';
