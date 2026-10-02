import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { BottlePlaceholder } from '../components/BottlePlaceholder';
import styles from './Cart.module.css';

export function Cart() {
  const { lines, setQuantity, removeItem, subtotal } = useCart();
  const { findProduct } = useProducts();

  if (lines.length === 0) {
    return (
      <div className="container section">
        <h1>Cart</h1>
        <p className="empty-state">
          Your cart is empty. <Link to="/search">Browse sake</Link> to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Cart</h1>

      <div className={styles.layout}>
        <ul className={styles.lines}>
          {lines.map((line) => {
            const product = findProduct(line.productId);
            if (!product) return null;
            return (
              <li key={line.productId} className={styles.line}>
                <Link to={`/sake/${product.slug}`} className={styles.thumb}>
                  <BottlePlaceholder color={product.color} aspectRatio="1 / 1" label={product.name} />
                </Link>
                <div className={styles.lineInfo}>
                  <Link to={`/sake/${product.slug}`} className={styles.lineName}>
                    {product.name}
                  </Link>
                  <div className={styles.lineMeta}>
                    {product.style} · {product.size}
                  </div>
                  <div className={styles.lineControls}>
                    <label className="visually-hidden" htmlFor={`qty-${product.id}`}>
                      Quantity
                    </label>
                    <select
                      id={`qty-${product.id}`}
                      value={line.quantity}
                      onChange={(e) => setQuantity(product.id, Number(e.target.value))}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          Qty {n}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.lineTotal}>${product.price * line.quantity}</div>
              </li>
            );
          })}
        </ul>

        <aside className={styles.summary}>
          <h2>Order summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={styles.muted}>Calculated at checkout</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
