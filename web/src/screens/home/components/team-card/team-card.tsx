import { useIntl } from 'react-intl';
import { getInitial } from '@components/avatar';
import { Icon, IconName, IconSize } from '@components/icon';
import { Photo, PhotoTone } from '@components/photo';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { resolvePhoto, type Persona } from '@/content';
import styles from './team-card.module.css';
import { TEAM_CARD_MESSAGES } from './team-card.const';

export interface TeamCardProps {
  person: Persona;
}

export const TeamCard = ({ person }: TeamCardProps) => {
  const { formatMessage } = useIntl();
  const photo = resolvePhoto(person.foto);

  return (
    <li className={styles.teamCard}>
      {photo ? (
        <Photo src={photo} alt={person.nombre} tone={PhotoTone.ROSE} />
      ) : (
        <span role="img" aria-label={formatMessage({ id: TEAM_CARD_MESSAGES.noPhoto }, { name: person.nombre })} className={styles.noPhoto}>
          <span aria-hidden="true" className={styles.circle} />
          <span aria-hidden="true" className={styles.initial}>
            {getInitial(person.nombre)}
          </span>
          <Icon name={IconName.WHEAT} size={IconSize.L} className={styles.wheat} />
        </span>
      )}
      <span className={styles.texts}>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY}>
          {person.puesto}
        </Text>
        <Text kind={TypographyKinds.H3} variant={TypographyVariant.TITLE_CARD}>
          {person.nombre}
        </Text>
        <Text variant={TypographyVariant.BODY_S} className={styles.description}>
          {person.descripcion}
        </Text>
      </span>
    </li>
  );
};
