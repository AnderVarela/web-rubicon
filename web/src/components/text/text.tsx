import type { ReactNode } from 'react';
import styles from './text.module.css';
import {
  DEFAULT_KIND,
  DEFAULT_TONE,
  DEFAULT_VARIANT,
  TypographyKinds,
  TypographyTone,
  TypographyVariant,
  TypographyWeight,
} from './text.const';
import { getTextClassName } from './text.helper';

export interface TextProps {
  kind?: TypographyKinds;
  variant?: TypographyVariant;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  tabular?: boolean;
  balance?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  htmlFor?: string;
}

export const Text = ({
  kind = DEFAULT_KIND,
  variant = DEFAULT_VARIANT,
  tone = DEFAULT_TONE,
  weight,
  tabular,
  balance,
  children,
  className,
  id,
  htmlFor,
}: TextProps) => {
  const Component = kind;

  return (
    <Component
      id={id}
      className={getTextClassName(styles, { variant, tone, weight, tabular, balance, className })}
      {...(kind === TypographyKinds.LABEL && { htmlFor })}
    >
      {children}
    </Component>
  );
};
