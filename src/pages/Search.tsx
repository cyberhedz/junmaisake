import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { breweries } from '../data/breweries';
import { ProductCard } from '../components/ProductCard';
import { BreweryCard } from '../components/BreweryCard';
import { StyleFilterChips } from '../components/StyleFilterChips';

export function Search() {
  const [params] = useSearchParams();
  const { products } = useProducts();

  const q = params.get('q')?.trim().toLowerCase() ?? '';
  const style = params.get('style') ?? undefined;

  const results = useMemo(() => {
    return products.filter((p) => {
      if (style && p.style !== style) return false;
      if (!q) return true;
      const brewery = breweries.find((b) => b.id === p.breweryId);
      const haystack = [p.name, p.nameJa, p.region, p.rice, brewery?.name, brewery?.nameJa]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, q, style]);

  const showBreweries = !q && !style;

  let heading = 'All products';
  if (q && style) heading = `“${params.get('q')}” in ${style}`;
  else if (q) heading = `Results for “${params.get('q')}”`;
  else if (style) heading = style;

  return (
    <div className="container section">
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <StyleFilterChips active={style} />
      </div>

      <div className="section-head">
        <h2>{heading}</h2>
        <span className="section-link" style={{ color: 'var(--color-muted)' }}>
          {results.length} {results.length === 1 ? 'bottle' : 'bottles'}
        </span>
      </div>

      {results.length === 0 ? (
        <p className="empty-state">No sake matched that search. Try a different term or style.</p>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {showBreweries && (
        <section className="section">
          <div className="section-head">
            <h2>Breweries</h2>
          </div>
          <div className="brewery-grid">
            {breweries.map((brewery) => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
