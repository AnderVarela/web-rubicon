import { useIntl } from 'react-intl';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useNow } from '@hooks/use-now';
import { getZonedNow } from '@hooks/use-store-status';
import styles from './opening-hours.module.css';
import { OPENING_HOURS_MESSAGES, OpeningHoursVariant } from './opening-hours.const';
import { capitalize, formatGroupLine, formatRanges, getCurrentWeek, getDayName, groupWeek } from './opening-hours.helper';

export interface OpeningHoursProps {
  variant?: OpeningHoursVariant;
}

export const OpeningHours = ({ variant = OpeningHoursVariant.TABLE }: OpeningHoursProps) => {
  const { formatMessage } = useIntl();
  const now = useNow();
  const { horario } = CONTENT;

  if (variant === OpeningHoursVariant.SUMMARY) {
    return (
      <Text variant={TypographyVariant.BODY_MS} tone={TypographyTone.INHERIT} tabular className={styles.summary}>
        {groupWeek(horario.semana).map((group) => (
          <Text key={group.days.join()} kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_MS} tone={TypographyTone.INHERIT} className={styles.line}>
            {formatGroupLine(group, formatMessage)}
          </Text>
        ))}
      </Text>
    );
  }

  const week = getCurrentWeek(horario, getZonedNow(now, horario.zonaHoraria));

  return (
    <div className={styles.openingHours}>
      <table className={styles.table}>
        <Text kind={TypographyKinds.CAPTION} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} className={styles.caption}>
          {formatMessage({ id: OPENING_HOURS_MESSAGES.caption })}
        </Text>
        <tbody>
          {week.map(({ day, ranges, isToday }) => (
            <tr key={day} aria-current={isToday ? 'date' : undefined} className={[styles.row, isToday && styles.today].filter(Boolean).join(' ')}>
              <th scope="row" className={styles.day}>
                {capitalize(getDayName(day, formatMessage))}
                {isToday && <span className={styles.badge}>{formatMessage({ id: OPENING_HOURS_MESSAGES.today })}</span>}
              </th>
              <td className={[styles.hours, !ranges.length && styles.closed].filter(Boolean).join(' ')}>
                {ranges.length ? formatRanges(ranges, formatMessage) : formatMessage({ id: OPENING_HOURS_MESSAGES.closed })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
