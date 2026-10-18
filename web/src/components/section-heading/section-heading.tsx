import { Text, TypographyKinds, TypographyTone, TypographyVariant, TypographyWeight } from '@components/text';
import styles from './section-heading.module.css';

export interface SectionHeadingProps {
  label: string;
  number: string;
  className?: string;
}

// Cabecera de sección: línea superior con el nombre y el número «N.º 01».
export const SectionHeading = ({ label, number, className }: SectionHeadingProps) => (
  <div className={[styles.sectionHeading, className].filter(Boolean).join(' ')}>
    <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.EYEBROW} weight={TypographyWeight.MEDIUM}>
      {label}
    </Text>
    <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.SERIF_NOTE} tone={TypographyTone.SECONDARY}>
      {number}
    </Text>
  </div>
);
