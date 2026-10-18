import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { ActionRow } from '@components/action-row';
import { Dialog, DialogPlacement } from '@components/dialog';
import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { IconButton } from '@components/icon-button';
import { Photo, PhotoRatio } from '@components/photo';
import { Tag } from '@components/tag';
import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import { CONTENT, resolvePhoto, type Producto } from '@/content';
import { MEDIA_DESKTOP, useMediaQuery } from '@hooks/use-media-query';
import { AllergenList } from '@screens/home/components/allergen-list';
import { getTagTone } from '@screens/home/components/product-card';
import { ProductPrice, ProductPriceLayout } from '@screens/home/components/product-price';
import styles from './product-sheet.module.css';
import { PRODUCT_SHEET_ALLERGENS_ID, PRODUCT_SHEET_MESSAGES, PRODUCT_SHEET_TITLE_ID } from './product-sheet.const';
import { buildWhatsappLink, parseIngredients } from './product-sheet.helper';

export interface ProductSheetProps {
  product: Producto | null;
  categoryName: string;
  onClose: () => void;
}

// Ficha del producto: panel lateral en escritorio y hoja inferior en móvil.
export const ProductSheet = ({ product, categoryName, onClose }: ProductSheetProps) => {
  const { formatMessage } = useIntl();
  const desktop = useMediaQuery(MEDIA_DESKTOP);
  const closeRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  // Se conserva el último producto para que el panel no se vacíe mientras sale.
  const [shown, setShown] = useState(product);
  if (product && product !== shown) setShown(product);

  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      labelledBy={PRODUCT_SHEET_TITLE_ID}
      placement={desktop ? DialogPlacement.SIDE : DialogPlacement.BOTTOM}
      initialFocusRef={closeRef}
    >
      {shown && (
        <>
          <div className={styles.bar}>
            <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY}>
              {categoryName}
            </Text>
            <IconButton ref={closeRef} icon={IconName.CLOSE} label={formatMessage({ id: PRODUCT_SHEET_MESSAGES.close })} onClick={onClose} />
          </div>
          <Photo src={resolvePhoto(shown.fotoFicha)} alt={shown.nombre} ratio={PhotoRatio.LANDSCAPE} eager>
            {shown.etiqueta && <Tag label={shown.etiqueta} tone={getTagTone(shown.etiqueta)} className={styles.tag} />}
          </Photo>
          <div className={styles.body}>
            <div className={styles.intro}>
              <Text kind={TypographyKinds.H2} variant={TypographyVariant.TITLE_L} id={PRODUCT_SHEET_TITLE_ID}>
                {shown.nombre}
              </Text>
              <ProductPrice product={shown} layout={ProductPriceLayout.INLINE} />
              <Text variant={TypographyVariant.BODY_M}>{shown.descripcionLarga}</Text>
            </div>
            <div className={styles.block}>
              <Text kind={TypographyKinds.H3} variant={TypographyVariant.LABEL} tone={TypographyTone.SECONDARY} weight={TypographyWeight.MEDIUM}>
                {formatMessage({ id: PRODUCT_SHEET_MESSAGES.ingredients })}
              </Text>
              <Text variant={TypographyVariant.BODY_M}>
                {parseIngredients(shown.ingredientes).map((chunk, index) =>
                  chunk.bold ? (
                    <Text key={index} kind={TypographyKinds.STRONG} variant={TypographyVariant.BODY_M} weight={TypographyWeight.BOLD}>
                      {chunk.text}
                    </Text>
                  ) : (
                    chunk.text
                  ),
                )}
              </Text>
            </div>
            <div className={styles.block}>
              <Text
                kind={TypographyKinds.H3}
                variant={TypographyVariant.LABEL}
                tone={TypographyTone.SECONDARY}
                weight={TypographyWeight.MEDIUM}
                id={PRODUCT_SHEET_ALLERGENS_ID}
                className={styles.allergensTitle}
              >
                {formatMessage({ id: PRODUCT_SHEET_MESSAGES.allergens })}
              </Text>
              <AllergenList allergens={shown.alergenos} labelledBy={PRODUCT_SHEET_ALLERGENS_ID} />
            </div>
            <div className={styles.traces}>
              <Icon name={IconName.INFO} size={IconSize.M} tone={IconTone.INVERSE} />
              <Text variant={TypographyVariant.BODY_S} tone={TypographyTone.INVERSE}>
                {formatMessage({ id: PRODUCT_SHEET_MESSAGES.traces })}
              </Text>
            </div>
            <div className={styles.whatsapp}>
              <ActionRow
                href={buildWhatsappLink(
                  CONTENT.contacto.whatsapp.enlace,
                  formatMessage({ id: PRODUCT_SHEET_MESSAGES.whatsappMessage }, { product: shown.nombre }),
                )}
                icon={IconName.WHATSAPP}
                iconTone={IconTone.WHATSAPP}
                title={formatMessage({ id: PRODUCT_SHEET_MESSAGES.whatsappTitle })}
                subtitle={formatMessage({ id: PRODUCT_SHEET_MESSAGES.whatsappNote })}
                external
                hoverSubtle
              />
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
};
