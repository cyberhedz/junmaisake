import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { breweries } from '../data/breweries';
import { answerQuery } from '../lib/sakeAssistant';
import { BottlePlaceholder } from './BottlePlaceholder';
import { MicIcon, PlusIcon, SendIcon } from './icons';
import styles from './GenAiChatBox.module.css';
import type { Product, SakeStyle } from '../types';

type Message =
  | { role: 'user'; text: string }
  | { role: 'assistant'; text: string; matches: Product[] };

const SCOPES: Array<{ label: string; style?: SakeStyle }> = [
  { label: 'All styles' },
  { label: 'Junmai', style: 'Junmai' },
  { label: 'Junmai Ginjo', style: 'Junmai Ginjo' },
  { label: 'Junmai Daiginjo', style: 'Junmai Daiginjo' },
];

/** Hero chat box — answers come from matching the question against our own
 * catalog, not a live language model. Same "clearly mocked" spirit as the
 * rest of this MVP (checkout, auth). */
export function GenAiChatBox() {
  const { products } = useProducts();
  const [input, setInput] = useState('');
  const [scopeLabel, setScopeLabel] = useState(SCOPES[0].label);
  const [messages, setMessages] = useState<Message[]>([]);

  const scopeStyle = SCOPES.find((s) => s.label === scopeLabel)?.style;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const { reply, matches } = answerQuery(trimmed, products, breweries, scopeStyle);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: reply, matches },
    ]);
    setInput('');
  }

  return (
    <div className={styles.box}>
      <div className={styles.label}>
        <span className={styles.badge}>AI assistant</span>
        <span className={styles.note}>Answers come from our catalog — demo, not a live model.</span>
      </div>

      {messages.length > 0 && (
        <div className={styles.transcript} role="log" aria-live="polite">
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className={styles.userRow}>
                <p className={styles.userBubble}>{m.text}</p>
              </div>
            ) : (
              <div key={i} className={styles.assistantRow}>
                <p className={styles.assistantBubble}>{m.text}</p>
                {m.matches.length > 0 && (
                  <div className={styles.matches}>
                    {m.matches.map((p) => (
                      <Link key={p.id} to={`/sake/${p.slug}`} className={styles.matchCard}>
                        <BottlePlaceholder color={p.color} aspectRatio="1 / 1" label={p.name} />
                        <div className={styles.matchName}>{p.name}</div>
                        <div className={styles.matchMeta}>
                          {p.region} · ${p.price}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      )}

      <form className={styles.composer} onSubmit={handleSubmit}>
        <input
          className={styles.composerInput}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything"
          aria-label="Ask the sake assistant"
        />

        <div className={styles.toolbar}>
          <span
            className={styles.ghostIcon}
            title="Attachments coming soon"
            aria-hidden="true"
          >
            <PlusIcon />
          </span>

          <div className={styles.toolbarRight}>
            <label className="visually-hidden" htmlFor="chat-scope">
              Scope
            </label>
            <select
              id="chat-scope"
              className={styles.scopeSelect}
              value={scopeLabel}
              onChange={(e) => setScopeLabel(e.target.value)}
            >
              {SCOPES.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
            <span
              className={styles.ghostIcon}
              title="Voice input coming soon"
              aria-hidden="true"
            >
              <MicIcon />
            </span>
            <button type="submit" className={styles.send} aria-label="Send">
              <SendIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
