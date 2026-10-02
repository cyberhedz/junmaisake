import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>Junmaisake — a marketplace for independent sake breweries.</span>
        <span className={styles.muted}>This is a demo build. No real payments are processed.</span>
      </div>
    </footer>
  );
}
