import { useIntl } from 'react-intl';
import { Icon, IconSize } from '@components/icon';
import { Text, TypographyVariant } from '@components/text';
import type { Alergeno } from '@/content';
import styles from './allergen-list.module.css';
import { ALLERGEN_ICONS, ALLERGEN_LIST_MESSAGES } from './allergen-list.const';

export interface AllergenListProps {
  allergens: Alergeno[];
  labelledBy: string;
}

export const AllergenList = ({ allergens, labelledBy }: AllergenListProps) => {
  const { formatMessage } = useIntl();

  if (!allergens.length) {
    return <Text variant={TypographyVariant.BODY_M}>{formatMessage({ id: ALLERGEN_LIST_MESSAGES.empty })}</Text>;
  }

  return (
    <ul aria-labelledby={labelledBy} className={styles.allergenList}>
      {allergens.map((allergen) => (
        <li key={allergen} className={styles.item}>
          <Icon name={ALLERGEN_ICONS[allergen]} size={IconSize.XL} />
          {allergen}
        </li>
      ))}
    </ul>
  );
};
