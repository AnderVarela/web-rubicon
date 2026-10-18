import { useIntl } from 'react-intl';
import { Icon, IconName, IconSize } from '@components/icon';
import { Photo } from '@components/photo';
import { Tag } from '@components/tag';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { resolvePhoto, type Producto } from '@/content';
import { ProductPrice, getPriceSentence } from '@screens/home/components/product-price';
import styles from './product-card.module.css';
import { NO_TAG, PRODUCT_CARD_MESSAGES } from './product-card.const';
import { getTagTone } from './product-card.helper';

export interface ProductCardProps {
  product: Producto;
  onOpen: (product: Producto) => void;
}

export const ProductCard = ({ product, onOpen }: ProductCardProps) => {
  const intl = useIntl();
  const label = intl.formatMessage(
    { id: PRODUCT_CARD_MESSAGES.label },
    { name: product.nombre, price: getPriceSentence(product, intl), tag: product.etiqueta ?? NO_TAG },
  );

  return (
    <button type="button" aria-label={label} className={styles.productCard} onClick={() => onOpen(product)}>
      <Photo src={resolvePhoto(product.foto)} alt="" className={styles.photo}>
        {product.etiqueta && <Tag label={product.etiqueta} tone={getTagTone(product.etiqueta)} className={styles.tag} />}
        <span aria-hidden="true" className={styles.reveal}>
          <Icon name={IconName.ARROW_UP_RIGHT} size={IconSize.S} />
        </span>
      </Photo>
      <span className={styles.body}>
        <span className={styles.heading}>
          <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.TITLE_XS} className={styles.name}>
            {product.nombre}
          </Text>
          <ProductPrice product={product} />
        </span>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_S} tone={TypographyTone.SECONDARY} className={styles.description}>
          {product.descripcion}
        </Text>
      </span>
    </button>
  );
};
