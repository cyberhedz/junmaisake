import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import styles from './Header.module.css';

const STYLES = ['Junmai', 'Junmai Ginjo', 'Junmai Daiginjo'] as const;

export function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="" className={styles.logoMark} />
          <span className={styles.logoText}>Junmaisake</span>
        </Link>

        <form className={styles.searchForm} role="search" onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            type="search"
            name="q"
            placeholder="Search sake, brewery, or region…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
        </form>

        <nav className={styles.nav} aria-label="Primary">
          <Link to="/sell" className={styles.navLink}>
            Sell
          </Link>
          <Link to="/account" className={styles.navLink}>
            Account
          </Link>
          <Link to="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
            Cart
            {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
          </Link>
        </nav>
      </div>

      <div className={`container ${styles.subnav}`}>
        <Link
          to="/"
          className={`${styles.subnavLink} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        {STYLES.map((style) => (
          <Link
            key={style}
            to={`/search?style=${encodeURIComponent(style)}`}
            className={styles.subnavLink}
          >
            {style}
          </Link>
        ))}
        <Link to="/search" className={styles.subnavLink}>
          Breweries
        </Link>
      </div>
    </header>
  );
}
