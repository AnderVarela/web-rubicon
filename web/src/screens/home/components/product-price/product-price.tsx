import { useIntl } from 'react-intl';
import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import type { Producto } from '@/content';
import styles from './product-price.module.css';
import { ProductPriceLayout } from './product-price.const';
import { getPriceLines } from './product-price.helper';

export interface ProductPriceProps {
  product: Pick<Producto, 'precio' | 'unidad'>;
  layout?: ProductPriceLayout;
}

export const ProductPrice = ({ product, layout = ProductPriceLayout.STACKED }: ProductPriceProps) => {
  const intl = useIntl();
  const { amount, note } = getPriceLines(product, intl);
  const inline = layout === ProductPriceLayout.INLINE;

  return (
    <span className={[styles.productPrice, styles[layout]].join(' ')}>
      <Text
        kind={TypographyKinds.STRONG}
        variant={inline ? TypographyVariant.QUOTE : TypographyVariant.BODY_MS}
        weight={TypographyWeight.SEMIBOLD}
        tabular
        className={styles.amount}
      >
        {amount}
      </Text>
      <Text
        kind={TypographyKinds.SPAN}
        variant={inline ? TypographyVariant.BODY_S : TypographyVariant.EYEBROW}
        tone={TypographyTone.SECONDARY}
        className={styles.note}
      >
        {note}
      </Text>
    </span>
  );
};
