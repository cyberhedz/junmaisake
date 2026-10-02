import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import type { ShippingInfo } from '../types';
import styles from './Checkout.module.css';

const EMPTY_SHIPPING: ShippingInfo = {
  fullName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  email: '',
};

export function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const { findProduct } = useProducts();
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [placed, setPlaced] = useState(false);

  function update<K extends keyof ShippingInfo>(key: K, value: string) {
    setShipping((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="container section">
        <div className={styles.confirmation}>
          <h1>Order received</h1>
          <p>
            Thanks, {shipping.fullName.split(' ')[0] || 'friend'} — we'd ship this to you if
            payment were live. Payment processing is coming soon.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>

      <form className={styles.layout} onSubmit={handleSubmit}>
        <div className={styles.shipping}>
          <h2>Shipping information</h2>

          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              required
              value={shipping.fullName}
              onChange={(e) => update('fullName', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={shipping.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              required
              value={shipping.address}
              onChange={(e) => update('address', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                required
                value={shipping.city}
                onChange={(e) => update('city', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input
                id="state"
                required
                value={shipping.state}
                onChange={(e) => update('state', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="zip">ZIP</label>
              <input
                id="zip"
                required
                value={shipping.zip}
                onChange={(e) => update('zip', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.payment}>
            <h2>Payment</h2>
            <p>Payment processing is coming soon. No card will be charged in this demo.</p>
          </div>
        </div>

        <aside className={styles.summary}>
          <h2>Order summary</h2>
          <ul className={styles.items}>
            {lines.map((line) => {
              const product = findProduct(line.productId);
              if (!product) return null;
              return (
                <li key={line.productId} className={styles.item}>
                  <span>
                    {product.name} × {line.quantity}
                  </span>
                  <span>${product.price * line.quantity}</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={styles.muted}>Coming soon</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
