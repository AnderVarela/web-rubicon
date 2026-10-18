export enum ProductPriceLayout {
  STACKED = 'stacked',
  INLINE = 'inline',
}

export const CURRENCY = 'EUR';

export const PRODUCT_PRICE_MESSAGES = {
  perUnit: 'price.perUnit',
  ask: 'price.ask',
  askNote: 'price.askNote',
  cardPrice: 'product.cardPrice',
  cardPriceAsk: 'product.cardPriceAsk',
} as const;
