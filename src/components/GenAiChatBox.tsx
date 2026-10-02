import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { breweries } from '../data/breweries';
import { answerQuery } from '../lib/sakeAssistant';
import { BottlePlaceholder } from './BottlePlaceholder';
import { SendIcon } from './icons';
import styles from './GenAiChatBox.module.css';
import type { Product } from '../types';

type Message =
  | { role: 'user'; text: string }
  | { role: 'assistant'; text: string; matches: Product[] };

/** Hero chat box — answers come from matching the question against our own
 * catalog, not a live language model. Same "clearly mocked" spirit as the
 * rest of this MVP (checkout, auth). */
export function GenAiChatBox() {
  const { products } = useProducts();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const { reply, matches } = answerQuery(trimmed, products, breweries);
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

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a style, region, or price…"
          aria-label="Ask the sake assistant"
        />
        <button type="submit" className={styles.send} aria-label="Send">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
