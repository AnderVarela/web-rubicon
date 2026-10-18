import { MAX_SINGLE_ROW, MAX_TWO_ROWS } from './about.const';

export const getTeamColumns = (people: number) => {
  if (people <= MAX_SINGLE_ROW) return Math.max(1, people);
  if (people <= MAX_TWO_ROWS) return Math.ceil(people / 2);
  return MAX_SINGLE_ROW;
};
