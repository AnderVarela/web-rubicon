import { MEDIA_REDUCED_MOTION, useMediaQuery } from '@hooks/use-media-query';

export const useReducedMotion = () => useMediaQuery(MEDIA_REDUCED_MOTION);
