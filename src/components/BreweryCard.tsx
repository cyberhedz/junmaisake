import { Link } from 'react-router-dom';
import type { Brewery } from '../types';
import styles from './BreweryCard.module.css';

export function BreweryCard({ brewery }: { brewery: Brewery }) {
  return (
    <Link to={`/brewery/${brewery.slug}`} className={styles.card}>
      <div className={styles.swatch} style={{ backgroundColor: brewery.color }} aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.name}>{brewery.name}</div>
        <div className={styles.nameJa}>{brewery.nameJa}</div>
        <div className={styles.region}>
          {brewery.region} · Est. {brewery.founded}
        </div>
      </div>
    </Link>
  );
}
