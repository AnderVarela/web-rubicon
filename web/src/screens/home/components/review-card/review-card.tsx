import { useId, useState } from 'react';
import { useIntl } from 'react-intl';
import { Avatar, AvatarTone } from '@components/avatar';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Icon, IconName, IconSize } from '@components/icon';
import { StarRating } from '@components/star-rating';
import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import type { Resena } from '@/content';
import styles from './review-card.module.css';
import { REVIEW_CARD_MESSAGES } from './review-card.const';
import { getReviewAge, isLongReview } from './review-card.helper';

export interface ReviewCardProps {
  review: Resena;
  now: Date;
  tone?: AvatarTone;
}

export const ReviewCard = ({ review, now, tone = AvatarTone.PEACH }: ReviewCardProps) => {
  const intl = useIntl();
  const textId = useId();
  const [expanded, setExpanded] = useState(false);
  const long = isLongReview(review.texto);
  const age = getReviewAge(review.publicadaEn, now);

  return (
    <li className={styles.reviewCard}>
      <article className={styles.article}>
        <div className={styles.top}>
          <StarRating value={review.puntuacion} label={intl.formatMessage({ id: REVIEW_CARD_MESSAGES.rating }, { rating: review.puntuacion })} />
          <Icon name={IconName.GOOGLE} size={IconSize.S} label={intl.formatMessage({ id: REVIEW_CARD_MESSAGES.google })} className={styles.google} />
        </div>
        <blockquote className={styles.quote}>
          <Text id={textId} variant={TypographyVariant.QUOTE} className={[styles.text, long && !expanded && styles.clamped].filter(Boolean).join(' ')}>
            {intl.formatMessage({ id: REVIEW_CARD_MESSAGES.quote }, { text: review.texto })}
          </Text>
        </blockquote>
        {long && (
          <Button
            variant={ButtonVariant.LINK}
            size={ButtonSize.S}
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((value) => !value)}
            className={styles.toggle}
          >
            {intl.formatMessage({ id: expanded ? REVIEW_CARD_MESSAGES.less : REVIEW_CARD_MESSAGES.more })}
          </Button>
        )}
        <footer className={styles.footer}>
          <Avatar name={review.autor} tone={tone} />
          <span className={styles.author}>
            <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_S} weight={TypographyWeight.SEMIBOLD}>
              {review.autor}
            </Text>
            <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.CAPTION} tone={TypographyTone.SECONDARY}>
              {intl.formatRelativeTime(age.value, age.unit, { numeric: age.value === 0 ? 'auto' : 'always' })}
            </Text>
          </span>
        </footer>
      </article>
    </li>
  );
};
