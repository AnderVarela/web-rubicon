import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { IconName } from '@components/icon';
import { IconButton, IconButtonSize } from '@components/icon-button';
import { ScrollRow } from '@components/scroll-row';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import type { Categoria, Producto } from '@/content';
import { useReducedMotion } from '@hooks/use-reduced-motion';
import { ProductCard } from '@screens/home/components/product-card';
import { useScrollProgress } from '@screens/home/hooks/use-scroll-progress';
import styles from './category-row.module.css';
import { CATEGORY_ROW_MESSAGES, ScrollDirection } from './category-row.const';
import { getCategoryAnchor, getThumbStyle, handleRowKeyDown, scrollRow } from './category-row.helper';

export interface CategoryRowProps {
  category: Categoria;
  onOpenProduct: (product: Producto) => void;
}

export const CategoryRow = ({ category, onOpenProduct }: CategoryRowProps) => {
  const { formatMessage } = useIntl();
  const rowRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(rowRef);
  const smooth = !useReducedMotion();
  const titleId = `${getCategoryAnchor(category.id)}-titulo`;
  const values = { category: category.nombre };

  return (
    <section id={getCategoryAnchor(category.id)} aria-labelledby={titleId} className={styles.categoryRow}>
      <div className={styles.header}>
        <Text kind={TypographyKinds.H3} variant={TypographyVariant.TITLE_M} id={titleId} className={styles.title}>
          {category.nombre}{' '}
          <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.CAPTION} tone={TypographyTone.SECONDARY} tabular className={styles.count}>
            {formatMessage({ id: CATEGORY_ROW_MESSAGES.count }, { count: category.productos.length })}
          </Text>
        </Text>
        <div className={styles.arrows}>
          <IconButton
            icon={IconName.CHEVRON_LEFT}
            label={formatMessage({ id: CATEGORY_ROW_MESSAGES.previous }, values)}
            size={IconButtonSize.L}
            disabled={progress.atStart}
            onClick={() => scrollRow(rowRef.current, ScrollDirection.BACK, smooth)}
          />
          <IconButton
            icon={IconName.CHEVRON_RIGHT}
            label={formatMessage({ id: CATEGORY_ROW_MESSAGES.next }, values)}
            size={IconButtonSize.L}
            disabled={progress.atEnd}
            onClick={() => scrollRow(rowRef.current, ScrollDirection.FORWARD, smooth)}
          />
        </div>
      </div>
      <ScrollRow
        ref={rowRef}
        role="region"
        label={formatMessage({ id: CATEGORY_ROW_MESSAGES.region }, values)}
        focusable
        onKeyDown={(event) => handleRowKeyDown(event, smooth)}
      >
        {category.productos.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
        ))}
      </ScrollRow>
      <span aria-hidden="true" className={styles.track} style={getThumbStyle(progress)}>
        <span className={styles.thumb} />
      </span>
    </section>
  );
};
