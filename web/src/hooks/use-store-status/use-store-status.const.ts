import type { DiaSemana } from '@/content';

// Orden de la semana empezando en lunes, como en web.json.
export const WEEK_DAYS: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export const MINUTES_PER_HOUR = 60;
export const DAYS_TO_LOOK_AHEAD = 14;
export const MS_PER_DAY = 86_400_000;

export enum OpeningDay {
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  LATER = 'later',
}

export const WEEKDAY_INDEX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
