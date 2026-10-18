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
} as const;

export const DAY_MESSAGE_PREFIX = 'days.';
export const RANGE_SEPARATOR = ' · ';
