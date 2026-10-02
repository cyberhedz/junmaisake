import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';

export function Account() {
  const { user, signIn, signOut } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    signIn({ name: name.trim(), email: email.trim() });
  }

  if (user) {
    return (
      <div className="container section">
        <div className={styles.panel}>
          <h1>Account</h1>
          <p className={styles.note}>
            Signed in as a mock account — there is no real authentication yet.
          </p>
          <div className={styles.card}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className={styles.panel}>
        <h1>Account</h1>
        <p className={styles.note}>
          This is a mock sign-in — no password, no real account is created.
        </p>
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
