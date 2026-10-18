import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant, IconPosition } from '@components/button';
import { renderEmphasis } from '@components/emphasis';
import { Icon, IconName, IconSize } from '@components/icon';
import { ScrollRow, ScrollRowGap } from '@components/scroll-row';
import { Section } from '@components/section';
import { SectionHeading } from '@components/section-heading';
import { StarRating, StarRatingSize } from '@components/star-rating';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useNow } from '@hooks/use-now';
import { SectionId } from '@screens/components/section-nav';
import { ReviewCard } from '@screens/home/components/review-card';
import styles from './reviews.module.css';
import { REVIEWS_DESKTOP_COLUMNS, REVIEWS_MESSAGES, REVIEWS_NUMBER, REVIEWS_TITLE_ID } from './reviews.const';
import { getAvatarTone } from './reviews.helper';

export const Reviews = () => {
  const intl = useIntl();
  const now = useNow();
  const { valoracion, total, urlEscribir, urlTodas, lista } = CONTENT.resenas;
  const rating = valoracion === null ? null : intl.formatNumber(valoracion, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <Section id={SectionId.REVIEWS} labelledBy={REVIEWS_TITLE_ID} containerClassName={styles.grid}>
      <SectionHeading
        label={intl.formatMessage({ id: REVIEWS_MESSAGES.section })}
        number={intl.formatMessage({ id: REVIEWS_MESSAGES.number }, { number: REVIEWS_NUMBER })}
        className={styles.heading}
      />
      <div className={styles.summary}>
        <Text kind={TypographyKinds.H2} variant={TypographyVariant.DISPLAY} id={REVIEWS_TITLE_ID}>
          {intl.formatMessage({ id: REVIEWS_MESSAGES.title }, { em: renderEmphasis })}
        </Text>
        {rating !== null && valoracion !== null && (
          <div className={styles.rating}>
            <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.DISPLAY_NUMBER} tabular>
              {rating}
            </Text>
            <span className={styles.ratingDetail}>
              <StarRating value={valoracion} size={StarRatingSize.M} label={intl.formatMessage({ id: REVIEWS_MESSAGES.rating }, { rating })} />
              <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_S} className={styles.total}>
                <Icon name={IconName.GOOGLE} size={IconSize.XS} />
                {intl.formatMessage({ id: REVIEWS_MESSAGES.total }, { total })}
              </Text>
            </span>
          </div>
        )}
        <div className={styles.actions}>
          <Button href={urlEscribir} external icon={IconName.STAR} iconPosition={IconPosition.START} className={styles.write}>
            {intl.formatMessage({ id: REVIEWS_MESSAGES.write })}
          </Button>
          <Button href={urlTodas} external variant={ButtonVariant.PLAIN} size={ButtonSize.S} icon={IconName.ARROW_UP_RIGHT} iconSize={IconSize.S} className={styles.all}>
            {intl.formatMessage({ id: REVIEWS_MESSAGES.all })}
          </Button>
        </div>
        <Text variant={TypographyVariant.CAPTION} tone={TypographyTone.SECONDARY} className={styles.disclaimer}>
          {intl.formatMessage({ id: REVIEWS_MESSAGES.disclaimer })}
        </Text>
      </div>
      {lista.length ? (
        <ScrollRow role="list" label={intl.formatMessage({ id: REVIEWS_MESSAGES.list })} gap={ScrollRowGap.S} focusable desktopColumns={REVIEWS_DESKTOP_COLUMNS} className={styles.list}>
          {lista.map((review, index) => (
            <ReviewCard key={`${review.autor}-${review.publicadaEn}`} review={review} now={now} tone={getAvatarTone(index)} />
          ))}
        </ScrollRow>
      ) : (
        <Text variant={TypographyVariant.BODY_L} className={styles.empty}>
          {intl.formatMessage({ id: REVIEWS_MESSAGES.empty })}
        </Text>
      )}
    </Section>
  );
};
