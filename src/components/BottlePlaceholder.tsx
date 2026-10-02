import styles from './BottlePlaceholder.module.css';

interface Props {
  color: string;
  aspectRatio?: string;
  label?: string;
}

/** A solid-color placeholder standing in for a product photo — no stock photography. */
export function BottlePlaceholder({ color, aspectRatio = '3 / 4', label }: Props) {
  return (
    <div
      className={styles.wrap}
      style={{ backgroundColor: color, aspectRatio }}
      role="img"
      aria-label={label ? `Bottle placeholder for ${label}` : 'Bottle placeholder'}
    >
      <div className={styles.bottle} />
    </div>
  );
}
