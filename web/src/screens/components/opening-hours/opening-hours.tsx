import { useIntl } from 'react-intl';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useNow } from '@hooks/use-now';
import { WEEK_DAYS, getZonedNow } from '@hooks/use-store-status';
import styles from './opening-hours.module.css';
import { EXCEPTIONS_TITLE_ID, OPENING_HOURS_MESSAGES, OpeningHoursVariant } from './opening-hours.const';
import { capitalize, formatException, formatGroupLine, formatRanges, getDayName, groupWeek } from './opening-hours.helper';

export interface OpeningHoursProps {
  variant?: OpeningHoursVariant;
}

export const OpeningHours = ({ variant = OpeningHoursVariant.TABLE }: OpeningHoursProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const now = useNow();
  const { semana, excepciones, zonaHoraria } = CONTENT.horario;

  if (variant === OpeningHoursVariant.SUMMARY) {
    return (
      <Text variant={TypographyVariant.BODY_MS} tone={TypographyTone.INHERIT} tabular className={styles.summary}>
        {groupWeek(semana).map((group) => (
          <Text key={group.days.join()} kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_MS} tone={TypographyTone.INHERIT} className={styles.line}>
            {formatGroupLine(group, formatMessage)}
          </Text>
        ))}
      </Text>
    );
  }

  const today = WEEK_DAYS[getZonedNow(now, zonaHoraria).dayIndex];

  return (
    <div className={styles.openingHours}>
      <table className={styles.table}>
        <Text kind={TypographyKinds.CAPTION} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} className={styles.caption}>
          {formatMessage({ id: OPENING_HOURS_MESSAGES.caption })}
        </Text>
        <tbody>
          {WEEK_DAYS.map((day) => {
            const isToday = day === today;
            const ranges = semana[day];
            return (
              <tr key={day} aria-current={isToday ? 'date' : undefined} className={[styles.row, isToday && styles.today].filter(Boolean).join(' ')}>
                <th scope="row" className={styles.day}>
                  {capitalize(getDayName(day, formatMessage))}
                  {isToday && <span className={styles.badge}>{formatMessage({ id: OPENING_HOURS_MESSAGES.today })}</span>}
                </th>
                <td className={[styles.hours, !ranges.length && styles.closed].filter(Boolean).join(' ')}>
                  {ranges.length ? formatRanges(ranges, formatMessage) : formatMessage({ id: OPENING_HOURS_MESSAGES.closed })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {excepciones.length > 0 && (
        <div className={styles.exceptions}>
          <Text kind={TypographyKinds.H3} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} id={EXCEPTIONS_TITLE_ID}>
            {formatMessage({ id: OPENING_HOURS_MESSAGES.exceptions })}
          </Text>
          <ul aria-labelledby={EXCEPTIONS_TITLE_ID} className={styles.exceptionList}>
            {excepciones.map((exception) => (
              <li key={exception.fecha}>{formatException(exception, intl)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
