import { TagTone } from '@components/tag';
import { TAG_TONES } from './product-card.const';

export const getTagTone = (tag: string) => TAG_TONES[tag] ?? TagTone.NEUTRAL;
