import type { MouseEventHandler, Ref } from 'react';
import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { getExternalLinkProps } from '@components/button';
import styles from './icon-button.module.css';
import { DEFAULT_ICON_BUTTON_SIZE, DEFAULT_ICON_BUTTON_VARIANT, IconButtonSize, IconButtonVariant } from './icon-button.const';
import { getIconButtonClassName } from './icon-button.helper';

export interface IconButtonProps {
  icon: IconName;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  iconSize?: IconSize;
  iconTone?: IconTone;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  ref?: Ref<HTMLButtonElement & HTMLAnchorElement>;
}

export const IconButton = ({
  icon,
  label,
  variant = DEFAULT_ICON_BUTTON_VARIANT,
  size = DEFAULT_ICON_BUTTON_SIZE,
  iconSize = IconSize.M,
  iconTone,
  href,
  external,
  disabled,
  onClick,
  className,
  ref,
}: IconButtonProps) => {
  const classes = getIconButtonClassName(styles, { variant, size, className });
  const glyph = <Icon name={icon} size={iconSize} tone={iconTone} />;

  if (href) {
    return (
      <a ref={ref} href={href} aria-label={label} className={classes} onClick={onClick} {...getExternalLinkProps(external)}>
        {glyph}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" aria-label={label} className={classes} disabled={disabled} onClick={onClick}>
      {glyph}
    </button>
  );
};
