import { Navigate, useParams } from 'react-router-dom';
import { breweries } from '../data/breweries';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import styles from './Brewery.module.css';

export function Brewery() {
  const { slug } = useParams();
  const { productsByBrewery } = useProducts();

  const brewery = breweries.find((b) => b.slug === slug);
  if (!brewery) {
    return <Navigate to="/search" replace />;
  }

  const products = productsByBrewery(brewery.id);

  return (
    <div>
      <div className={styles.banner} style={{ backgroundColor: brewery.color }} />
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.name}>{brewery.name}</h1>
          <div className={styles.nameJa}>{brewery.nameJa}</div>
          <div className={styles.meta}>
            {brewery.region} · Est. {brewery.founded}
          </div>
          <p className={styles.story}>{brewery.story}</p>
        </div>

        <section className="section">
          <div className="section-head">
            <h2>Bottles from {brewery.name}</h2>
          </div>
          {products.length === 0 ? (
            <p className="empty-state">No bottles listed yet.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
