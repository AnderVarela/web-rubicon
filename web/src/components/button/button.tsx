import type { AriaAttributes, MouseEventHandler, ReactNode, Ref } from 'react';
import { Icon, IconName, IconSize } from '@components/icon';
import styles from './button.module.css';
import {
  ButtonJustify,
  ButtonSize,
  ButtonVariant,
  DEFAULT_BUTTON_JUSTIFY,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
  IconPosition,
} from './button.const';
import { getButtonClassName, getExternalLinkProps } from './button.helper';

type AriaProps = Pick<
  AriaAttributes,
  'aria-label' | 'aria-expanded' | 'aria-controls' | 'aria-haspopup' | 'aria-current' | 'aria-describedby' | 'aria-pressed'
>;

export interface ButtonProps extends AriaProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  justify?: ButtonJustify;
  icon?: IconName;
  iconPosition?: IconPosition;
  iconSize?: IconSize;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  ref?: Ref<HTMLButtonElement & HTMLAnchorElement>;
}

export const Button = ({
  children,
  variant = DEFAULT_BUTTON_VARIANT,
  size = DEFAULT_BUTTON_SIZE,
  justify = DEFAULT_BUTTON_JUSTIFY,
  icon,
  iconPosition = IconPosition.END,
  iconSize = IconSize.M,
  href,
  external,
  type = 'button',
  disabled,
  fullWidth,
  onClick,
  className,
  ref,
  ...aria
}: ButtonProps) => {
  const classes = getButtonClassName(styles, { variant, size, justify, fullWidth, className });
  const iconElement = icon ? <Icon name={icon} size={iconSize} /> : null;
  const content = (
    <>
      {iconPosition === IconPosition.START && iconElement}
      <span className={styles.label}>{children}</span>
      {iconPosition === IconPosition.END && iconElement}
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onClick={onClick} {...getExternalLinkProps(external)} {...aria}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  );
};
