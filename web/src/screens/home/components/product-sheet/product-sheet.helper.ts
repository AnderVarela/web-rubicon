import { BOLD_MARK } from './product-sheet.const';

export interface IngredientChunk {
  text: string;
  bold: boolean;
}

// «Harina de **trigo**, agua» → trozos con los alérgenos marcados en negrita.
export const parseIngredients = (ingredients: string): IngredientChunk[] =>
  ingredients
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith(BOLD_MARK) && chunk.endsWith(BOLD_MARK)
        ? { text: chunk.slice(BOLD_MARK.length, -BOLD_MARK.length), bold: true }
        : { text: chunk, bold: false },
    );

export const buildWhatsappLink = (base: string, message: string) => `${base}?text=${encodeURIComponent(message)}`;
