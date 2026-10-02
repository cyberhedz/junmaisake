import { Link } from 'react-router-dom';
import type { SakeStyle } from '../types';
import styles from './StyleFilterChips.module.css';

const SAKE_STYLES: SakeStyle[] = ['Junmai', 'Junmai Ginjo', 'Junmai Daiginjo'];

/** Style filter pills — link to /search?style=… rather than filtering in place,
 * so results are shareable and the back button works as expected. */
export function StyleFilterChips({ active }: { active?: string }) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by style">
      <Link
        to="/search"
        className={`${styles.chip} ${!active ? styles.active : ''}`}
      >
        All styles
      </Link>
      {SAKE_STYLES.map((style) => (
        <Link
          key={style}
          to={`/search?style=${encodeURIComponent(style)}`}
          className={`${styles.chip} ${active === style ? styles.active : ''}`}
        >
          {style}
        </Link>
      ))}
    </div>
  );
}
