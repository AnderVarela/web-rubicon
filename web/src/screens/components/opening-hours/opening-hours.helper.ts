import type { IntlShape } from 'react-intl';
import type { DiaSemana, Excepcion, Franja, Semana } from '@/content';
import { WEEK_DAYS, formatTime } from '@hooks/use-store-status';
import { DAY_MESSAGE_PREFIX, OPENING_HOURS_MESSAGES, RANGE_SEPARATOR } from './opening-hours.const';

type Format = IntlShape['formatMessage'];

export const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase() + text.slice(1);

export const getDayName = (day: DiaSemana, formatMessage: Format) => formatMessage({ id: `${DAY_MESSAGE_PREFIX}${day}` });

// «8:00 – 14:30 · 17:00 – 20:00»
export const formatRanges = (ranges: Franja[], formatMessage: Format) =>
  ranges
    .map((range) => formatMessage({ id: OPENING_HOURS_MESSAGES.range }, { from: formatTime(range.abre), to: formatTime(range.cierra) }))
    .join(RANGE_SEPARATOR);

const rangesKey = (ranges: Franja[]) => ranges.map((range) => `${range.abre}-${range.cierra}`).join('|');

export interface DayGroup {
  days: DiaSemana[];
  ranges: Franja[];
}

// Agrupa días seguidos con el mismo horario, dando la vuelta a la semana (domingo y lunes juntos).
export const groupWeek = (semana: Semana): DayGroup[] => {
  const keys = WEEK_DAYS.map((day) => rangesKey(semana[day]));
  if (new Set(keys).size === 1) return [{ days: [...WEEK_DAYS], ranges: semana.lunes }];

  const start = keys.findIndex((key, index) => key !== keys[(index + WEEK_DAYS.length - 1) % WEEK_DAYS.length]);
  const groups: DayGroup[] = [];
  for (let offset = 0; offset < WEEK_DAYS.length; offset += 1) {
    const day = WEEK_DAYS[(start + offset) % WEEK_DAYS.length];
    const last = groups[groups.length - 1];
    if (last && rangesKey(last.ranges) === rangesKey(semana[day])) last.days.push(day);
    else groups.push({ days: [day], ranges: semana[day] });
  }

  // Primero los días que se abre, en orden de la semana; los cerrados al final.
  return groups.sort((a, b) => Number(!a.ranges.length) - Number(!b.ranges.length) || WEEK_DAYS.indexOf(a.days[0]) - WEEK_DAYS.indexOf(b.days[0]));
};

export const formatDayGroup = ({ days }: DayGroup, formatMessage: Format) => {
  const first = getDayName(days[0], formatMessage);
  const last = getDayName(days[days.length - 1], formatMessage);
  if (days.length === 1) return first;
  if (days.length === 2) return formatMessage({ id: OPENING_HOURS_MESSAGES.twoDays }, { first, second: last });
  return formatMessage({ id: OPENING_HOURS_MESSAGES.dayRange }, { first, last });
};

export const formatGroupLine = (group: DayGroup, formatMessage: Format) =>
  capitalize(
    formatMessage(
      { id: OPENING_HOURS_MESSAGES.group },
      {
        days: formatDayGroup(group, formatMessage),
        hours: group.ranges.length ? formatRanges(group.ranges, formatMessage) : formatMessage({ id: OPENING_HOURS_MESSAGES.closedLower }),
      },
    ),
  );

export const formatException = (exception: Excepcion, intl: IntlShape) => {
  const date = intl.formatDate(`${exception.fecha}T12:00:00Z`, { day: 'numeric', month: 'long', timeZone: 'UTC' });
  return exception.abierto && exception.horario
    ? intl.formatMessage(
        { id: OPENING_HOURS_MESSAGES.exceptionOpen },
        { date, reason: exception.motivo, hours: formatRanges(exception.horario, intl.formatMessage) },
      )
    : intl.formatMessage({ id: OPENING_HOURS_MESSAGES.exceptionClosed }, { date, reason: exception.motivo });
};
