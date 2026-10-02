import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { breweries } from '../data/breweries';
import { BottlePlaceholder } from './BottlePlaceholder';
import styles from './ProductCard.module.css';

export function ProductCard({ product }: { product: Product }) {
  const brewery = breweries.find((b) => b.id === product.breweryId);
  return (
    <Link to={`/sake/${product.slug}`} className={styles.card}>
      <BottlePlaceholder color={product.color} label={product.name} />
      <div className={styles.meta}>
        <span className={styles.style}>{product.style}</span>
        <span>{product.region}</span>
      </div>
      <div className={styles.name}>{product.name}</div>
      {brewery && <div className={styles.brewery}>{brewery.name}</div>}
      <div className={styles.price}>
        ${product.price} <span className={styles.priceUnit}>/ {product.size}</span>
      </div>
    </Link>
  );
}
