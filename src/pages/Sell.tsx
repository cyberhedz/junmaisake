import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { breweries } from '../data/breweries';
import type { SakeStyle, SellFormInput } from '../types';
import styles from './Sell.module.css';

const SAKE_STYLES: SakeStyle[] = ['Junmai', 'Junmai Ginjo', 'Junmai Daiginjo'];
const PLACEHOLDER_COLORS = ['#7a1f2b', '#3f5a52', '#4a4036', '#6b4a3a', '#2f3e4a', '#5a3d4a'];

const EMPTY_FORM: SellFormInput = {
  name: '',
  nameJa: '',
  breweryId: breweries[0].id,
  style: 'Junmai',
  price: 30,
  size: '720ml',
  region: breweries[0].region,
  abv: 15,
  smv: 0,
  rice: '',
  description: '',
  color: PLACEHOLDER_COLORS[0],
};

export function Sell() {
  const { addProduct } = useProducts();
  const [form, setForm] = useState<SellFormInput>(EMPTY_FORM);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  function update<K extends keyof SellFormInput>(key: K, value: SellFormInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const color = PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
    const product = addProduct({ ...form, color });
    setJustAdded(product.name);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="container section">
      <h1>Sell on Junmaisake</h1>
      <p className={styles.note}>
        Add a product to your storefront. This is a demo — listings are saved to this browser
        only.
      </p>

      {justAdded && (
        <div className={styles.success}>
          <strong>{justAdded}</strong> was added.{' '}
          <Link to="/search">View it in search</Link>.
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className="field">
            <label htmlFor="name">Product name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g. Shirakawa Junmai"
            />
          </div>

          <div className="field">
            <label htmlFor="nameJa">Japanese name</label>
            <input
              id="nameJa"
              value={form.nameJa}
              onChange={(e) => update('nameJa', e.target.value)}
              placeholder="e.g. 白川純米"
            />
          </div>

          <div className="field">
            <label htmlFor="brewery">Brewery</label>
            <select
              id="brewery"
              value={form.breweryId}
              onChange={(e) => {
                const brewery = breweries.find((b) => b.id === e.target.value);
                update('breweryId', e.target.value);
                if (brewery) update('region', brewery.region);
              }}
            >
              {breweries.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="style">Style</label>
            <select
              id="style"
              value={form.style}
              onChange={(e) => update('style', e.target.value as SakeStyle)}
            >
              {SAKE_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="price">Price (USD)</label>
            <input
              id="price"
              type="number"
              min={1}
              required
              value={form.price}
              onChange={(e) => update('price', Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="size">Size</label>
            <input
              id="size"
              required
              value={form.size}
              onChange={(e) => update('size', e.target.value)}
              placeholder="e.g. 720ml"
            />
          </div>

          <div className="field">
            <label htmlFor="region">Region</label>
            <input
              id="region"
              required
              value={form.region}
              onChange={(e) => update('region', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="abv">ABV (%)</label>
            <input
              id="abv"
              type="number"
              step="0.1"
              min={0}
              required
              value={form.abv}
              onChange={(e) => update('abv', Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="smv">SMV</label>
            <input
              id="smv"
              type="number"
              step="1"
              required
              value={form.smv}
              onChange={(e) => update('smv', Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="rice">Rice</label>
            <input
              id="rice"
              required
              value={form.rice}
              onChange={(e) => update('rice', e.target.value)}
              placeholder="e.g. Yamada Nishiki"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Tasting notes, brewing details…"
          />
        </div>

        <div className="field">
          <label>Image</label>
          <p className={styles.imageNote}>
            No photo upload yet — new listings get a solid-color placeholder automatically.
          </p>
        </div>

        <button type="submit" className="btn btn-primary">
          Add product
        </button>
      </form>
    </div>
  );
}
