import styles from './switch.module.css';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelledBy: string;
  describedBy?: string;
}

export const Switch = ({ checked, onChange, labelledBy, describedBy }: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    aria-describedby={describedBy}
    className={styles.switch}
    onClick={() => onChange(!checked)}
  >
    <span className={[styles.track, checked && styles.on].filter(Boolean).join(' ')}>
      <span className={styles.knob} />
    </span>
  </button>
);
