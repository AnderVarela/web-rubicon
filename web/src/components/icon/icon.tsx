import styles from './icon.module.css';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ICON_TONE,
  FILLED_ICONS,
  GLYPHS,
  ICON_STROKE_WIDTH,
  ICON_VIEW_BOX,
  IconName,
  IconSize,
  IconTone,
  LUCIDE_ICONS,
} from './icon.const';
import { getIconA11yProps, getIconClassName } from './icon.helper';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
  label?: string;
  className?: string;
}

export const Icon = ({ name, size = DEFAULT_ICON_SIZE, tone = DEFAULT_ICON_TONE, label, className }: IconProps) => {
  const classes = getIconClassName(styles, { size, tone, className });
  const a11y = getIconA11yProps(label);
  const LucideGlyph = LUCIDE_ICONS[name];

  if (LucideGlyph) {
    return (
      <LucideGlyph
        className={classes}
        strokeWidth={ICON_STROKE_WIDTH}
        fill={FILLED_ICONS.has(name) ? 'currentColor' : 'none'}
        focusable="false"
        {...a11y}
      />
    );
  }

  const glyph = GLYPHS[name];

  return (
    <svg
      className={classes}
      viewBox={ICON_VIEW_BOX}
      fill={glyph?.filled ? 'currentColor' : 'none'}
      stroke={glyph?.filled ? 'none' : 'currentColor'}
      strokeWidth={ICON_STROKE_WIDTH}
      focusable="false"
      {...a11y}
    >
      {glyph?.shapes.map((shape) => <path key={shape.d} d={shape.d} transform={shape.transform} />)}
    </svg>
  );
};
