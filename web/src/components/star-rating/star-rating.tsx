import { Icon, IconName, IconSize } from '@components/icon';
import styles from './star-rating.module.css';
import { StarRatingSize } from './star-rating.const';
import { getStars } from './star-rating.helper';

export interface StarRatingProps {
  value: number;
  label: string;
  size?: StarRatingSize;
}

export const StarRating = ({ value, label, size = StarRatingSize.S }: StarRatingProps) => (
  <span role="img" aria-label={label} className={[styles.starRating, styles[`size-${size}`]].join(' ')}>
    {getStars(value).map((filled, index) => (
      <Icon
        key={index}
        name={filled ? IconName.STAR_FILL : IconName.STAR}
        size={size === StarRatingSize.M ? IconSize.M : IconSize.XS}
      />
    ))}
  </span>
);
