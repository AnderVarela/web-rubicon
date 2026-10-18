import type { IntlShape } from 'react-intl';
import type { Producto } from '@/content';
import { CURRENCY, PRODUCT_PRICE_MESSAGES } from './product-price.const';

export const formatPrice = (precio: number, intl: IntlShape) =>
  intl.formatNumber(precio, { style: 'currency', currency: CURRENCY });

// Precio en dos líneas: «4,20 €» y «/ unidad», o «Consultar» y «en tienda».
export const getPriceLines = ({ precio, unidad }: Pick<Producto, 'precio' | 'unidad'>, intl: IntlShape) =>
  precio === null
    ? { amount: intl.formatMessage({ id: PRODUCT_PRICE_MESSAGES.ask }), note: intl.formatMessage({ id: PRODUCT_PRICE_MESSAGES.askNote }) }
    : { amount: formatPrice(precio, intl), note: intl.formatMessage({ id: PRODUCT_PRICE_MESSAGES.perUnit }, { unit: unidad }) };

// Precio en una frase para el nombre accesible de la tarjeta.
export const getPriceSentence = ({ precio, unidad }: Pick<Producto, 'precio' | 'unidad'>, intl: IntlShape) =>
  precio === null
    ? intl.formatMessage({ id: PRODUCT_PRICE_MESSAGES.cardPriceAsk })
    : intl.formatMessage({ id: PRODUCT_PRICE_MESSAGES.cardPrice }, { price: formatPrice(precio, intl), unit: unidad });
