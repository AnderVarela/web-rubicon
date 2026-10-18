import { useIntl } from 'react-intl';
import { renderEmphasis } from '@components/emphasis';
import { ScrollRow, ScrollRowGap } from '@components/scroll-row';
import { Section, SectionTone } from '@components/section';
import { SectionHeading } from '@components/section-heading';
import { Text, TypographyKinds, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { SectionId } from '@screens/components/section-nav';
import { TeamCard } from '@screens/home/components/team-card';
import styles from './about.module.css';
import { ABOUT_MESSAGES, ABOUT_NUMBER, ABOUT_TITLE_ID } from './about.const';
import { getTeamColumns } from './about.helper';

export const About = () => {
  const { formatMessage } = useIntl();
  const { equipo } = CONTENT;

  return (
    <Section id={SectionId.ABOUT} labelledBy={ABOUT_TITLE_ID} tone={SectionTone.SUBTLE}>
      <SectionHeading
        label={formatMessage({ id: ABOUT_MESSAGES.section })}
        number={formatMessage({ id: ABOUT_MESSAGES.number }, { number: ABOUT_NUMBER })}
      />
      <div className={styles.intro}>
        <Text kind={TypographyKinds.H2} variant={TypographyVariant.DISPLAY} id={ABOUT_TITLE_ID}>
          {equipo.length
            ? formatMessage({ id: ABOUT_MESSAGES.title }, { count: String(equipo.length), em: renderEmphasis })
            : formatMessage({ id: ABOUT_MESSAGES.titleNoTeam }, { em: renderEmphasis })}
        </Text>
        <div className={styles.copy}>
          <Text variant={TypographyVariant.BODY_M}>{formatMessage({ id: ABOUT_MESSAGES.p1 })}</Text>
          <Text variant={TypographyVariant.BODY_M}>{formatMessage({ id: ABOUT_MESSAGES.p2 })}</Text>
        </div>
      </div>
      {equipo.length > 0 && (
        <ScrollRow role="list" label={formatMessage({ id: ABOUT_MESSAGES.team })} gap={ScrollRowGap.S} focusable desktopColumns={getTeamColumns(equipo.length)} className={styles.team}>
          {equipo.map((person) => (
            <TeamCard key={person.id} person={person} />
          ))}
        </ScrollRow>
      )}
    </Section>
  );
};
