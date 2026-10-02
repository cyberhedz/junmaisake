import { useProducts } from '../context/ProductsContext';
import { breweries } from '../data/breweries';
import { ProductCard } from '../components/ProductCard';
import { BreweryCard } from '../components/BreweryCard';
import { StyleFilterChips } from '../components/StyleFilterChips';
import { GenAiChatBox } from '../components/GenAiChatBox';
import styles from './Home.module.css';

export function Home() {
  const { products } = useProducts();

  const featured = products.filter((p) => p.featured);
  const latest = [...products].slice(-8).reverse();

  return (
    <div>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>
            Junmai sake, straight from the breweries that make it.
          </h1>
          <p className={styles.heroSub}>
            A marketplace for independent Japanese breweries — one cart, one checkout, many
            kura.
          </p>
          <GenAiChatBox />
          <div className={styles.heroFilters}>
            <StyleFilterChips />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="section-head">
            <h2>Featured breweries</h2>
            <a href="/search" className="section-link">
              See all breweries
            </a>
          </div>
          <div className="brewery-grid">
            {breweries.slice(0, 8).map((brewery) => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Featured bottles</h2>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Newly listed</h2>
          </div>
          <div className="product-grid">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
