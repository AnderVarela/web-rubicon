import styles from './skip-link.module.css';

export interface SkipLinkProps {
  targetId: string;
  label: string;
}

// Primer elemento enfocable: salta directamente al contenido principal.
export const SkipLink = ({ targetId, label }: SkipLinkProps) => (
  <a href={`#${targetId}`} className={styles.skipLink}>
    {label}
  </a>
);
