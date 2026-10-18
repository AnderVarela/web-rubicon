import type { DiaSemana, Franja, Horario } from '@/content';
import { DAYS_TO_LOOK_AHEAD, MINUTES_PER_HOUR, MS_PER_DAY, OpeningDay, WEEKDAY_INDEX, WEEK_DAYS } from './use-store-status.const';

export interface ZonedNow {
  isoDate: string;
  dayIndex: number;
  minutes: number;
}

export type StoreStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; when: OpeningDay; day: DiaSemana }
  | { open: false; opensAt: null };

export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
};

// «08:00» → «8:00», como en el diseño.
export const formatTime = (time: string) => time.replace(/^0(\d)/, '$1');

// Fecha, día de la semana y minutos en la zona horaria de la tienda, sea cual sea la del visitante.
export const getZonedNow = (date: Date, timeZone: string): ZonedNow => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';

  return {
    isoDate: `${get('year')}-${get('month')}-${get('day')}`,
    dayIndex: WEEKDAY_INDEX[get('weekday')],
    minutes: Number(get('hour')) * MINUTES_PER_HOUR + Number(get('minute')),
  };
};

export const addDays = (isoDate: string, days: number) =>
  new Date(Date.parse(`${isoDate}T00:00:00Z`) + days * MS_PER_DAY).toISOString().slice(0, 10);

// Tramos de un día concreto: primero las excepciones, después la semana.
export const getRangesFor = (horario: Horario, isoDate: string, dayIndex: number): Franja[] => {
  const exception = horario.excepciones.find((excepcion) => excepcion.fecha === isoDate);
  if (exception) return exception.abierto ? (exception.horario ?? []) : [];
  return horario.semana[WEEK_DAYS[dayIndex]];
};

export const getStoreStatus = (horario: Horario, now: ZonedNow): StoreStatus => {
  const today = getRangesFor(horario, now.isoDate, now.dayIndex);
  const current = today.find((range) => now.minutes >= toMinutes(range.abre) && now.minutes < toMinutes(range.cierra));
  if (current) return { open: true, closesAt: current.cierra };

  const laterToday = today.find((range) => toMinutes(range.abre) > now.minutes);
  if (laterToday) return { open: false, opensAt: laterToday.abre, when: OpeningDay.TODAY, day: WEEK_DAYS[now.dayIndex] };

  for (let offset = 1; offset <= DAYS_TO_LOOK_AHEAD; offset += 1) {
    const dayIndex = (now.dayIndex + offset) % WEEK_DAYS.length;
    const [first] = getRangesFor(horario, addDays(now.isoDate, offset), dayIndex);
    if (first) {
      return {
        open: false,
        opensAt: first.abre,
        when: offset === 1 ? OpeningDay.TOMORROW : OpeningDay.LATER,
        day: WEEK_DAYS[dayIndex],
      };
    }
  }

  return { open: false, opensAt: null };
};
