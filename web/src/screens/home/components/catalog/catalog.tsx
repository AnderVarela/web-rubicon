import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Chip } from '@components/chip';
import { renderEmphasis } from '@components/emphasis';
import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { Reveal } from '@components/reveal';
import { Section } from '@components/section';
import { SectionHeading } from '@components/section-heading';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT, type Producto } from '@/content';
import { SectionId } from '@screens/components/section-nav';
import { CategoryRow, getCategoryAnchor } from '@screens/home/components/category-row';
import { ProductSheet } from '@screens/home/components/product-sheet';
import styles from './catalog.module.css';
import { CATALOG_MESSAGES, CATALOG_NUMBER, CATALOG_TITLE_ID } from './catalog.const';
import { findCategoryName } from './catalog.helper';

export const Catalog = () => {
  const { formatMessage } = useIntl();
  const [selected, setSelected] = useState<Producto | null>(null);
  const { catalogo } = CONTENT;

  return (
    <Section id={SectionId.CATALOG} labelledBy={CATALOG_TITLE_ID} className={styles.catalog}>
      <span aria-hidden="true" className={styles.decoration} />
      <Reveal>
        <SectionHeading
          label={formatMessage({ id: CATALOG_MESSAGES.section })}
          number={formatMessage({ id: CATALOG_MESSAGES.number }, { number: CATALOG_NUMBER })}
        />
      </Reveal>
      <Reveal delay={80} className={styles.intro}>
        <Text kind={TypographyKinds.H2} variant={TypographyVariant.DISPLAY} id={CATALOG_TITLE_ID}>
          {formatMessage({ id: CATALOG_MESSAGES.title }, { em: renderEmphasis })}
        </Text>
        <Text variant={TypographyVariant.BODY_M} className={styles.lead}>
          {formatMessage({ id: CATALOG_MESSAGES.intro })}
        </Text>
      </Reveal>
      {catalogo.length ? (
        <>
          <nav aria-label={formatMessage({ id: CATALOG_MESSAGES.categories })} className={styles.chips}>
            {catalogo.map((categoria) => (
              <Chip key={categoria.id} label={categoria.nombre} count={categoria.productos.length} href={`#${getCategoryAnchor(categoria.id)}`} />
            ))}
          </nav>
          <Text variant={TypographyVariant.CAPTION} tone={TypographyTone.SECONDARY} className={styles.note}>
            <Icon name={IconName.INFO} size={IconSize.S} tone={IconTone.SECONDARY} />
            {formatMessage({ id: CATALOG_MESSAGES.priceNote })}
          </Text>
          <div className={styles.rows}>
            {catalogo.map((categoria) => (
              <Reveal key={categoria.id}>
                <CategoryRow category={categoria} onOpenProduct={setSelected} />
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <Text variant={TypographyVariant.BODY_L}>{formatMessage({ id: CATALOG_MESSAGES.empty })}</Text>
      )}
      <ProductSheet product={selected} categoryName={findCategoryName(catalogo, selected)} onClose={() => setSelected(null)} />
    </Section>
  );
};
