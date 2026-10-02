import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { breweries } from '../data/breweries';
import { BottlePlaceholder } from '../components/BottlePlaceholder';
import { ProductCard } from '../components/ProductCard';
import styles from './Product.module.css';

export function Product() {
  const { slug } = useParams();
  const { findProductBySlug, productsByBrewery } = useProducts();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const product = slug ? findProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/search" replace />;
  }

  const brewery = breweries.find((b) => b.id === product.breweryId);
  const more = productsByBrewery(product.breweryId).filter((p) => p.id !== product.id);

  function handleAddToCart() {
    addItem(product!.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="container section">
      <div className={styles.layout}>
        <div className={styles.imageCol}>
          <BottlePlaceholder color={product.color} aspectRatio="3 / 4" label={product.name} />
        </div>

        <div className={styles.infoCol}>
          <div className={styles.styleLine}>{product.style}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.nameJa}>{product.nameJa}</div>
          {brewery && (
            <Link to={`/brewery/${brewery.slug}`} className={styles.brewery}>
              {brewery.name}
            </Link>
          )}

          <div className={styles.price}>
            ${product.price}
            <span className={styles.priceUnit}> / {product.size}</span>
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={handleAddToCart}>
            {added ? 'Added to cart' : 'Add to cart'}
          </button>

          <dl className={styles.specs}>
            <div>
              <dt>Region</dt>
              <dd>{product.region}</dd>
            </div>
            <div>
              <dt>Style</dt>
              <dd>{product.style}</dd>
            </div>
            <div>
              <dt>ABV</dt>
              <dd>{product.abv}%</dd>
            </div>
            <div>
              <dt>SMV</dt>
              <dd>{product.smv > 0 ? `+${product.smv}` : product.smv}</dd>
            </div>
            <div>
              <dt>Rice</dt>
              <dd>{product.rice}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{product.size}</dd>
            </div>
          </dl>

          <div className={styles.description}>
            <h2>Tasting notes</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>More from {brewery?.name}</h2>
          </div>
          <div className="product-grid">
            {more.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
