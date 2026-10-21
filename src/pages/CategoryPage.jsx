import { useMemo, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Hero from '../components/Hero';
import MarbleTexture from '../components/MarbleTexture';
import StoneModal from '../components/StoneModal';

export default function CategoryPage({ category }) {
  const [tone, setTone] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const toneLabel = (key) => category.tones.find((t) => t.key === key)?.label ?? '';

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return category.items.filter(
      (s) =>
        (tone === 'all' || s.tone === tone) &&
        (!q || s.name.toLowerCase().includes(q) || s.ko.includes(q)),
    );
  }, [category, tone, query]);

  return (
    <>
      <Breadcrumb current={category.label} />
      <Hero
        headline={category.headline}
        subhead={category.subhead}
        slabs={category.heroSlabs}
        image={category.heroImage}
      />

      <section className="container collection">
        <div className="collection__head">
          <div>
            <p className="eyebrow">{category.eyebrow}</p>
            <h2 className="collection__title">{category.title}</h2>
          </div>
          <p className="collection__desc">
            {category.description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <div className="toolbar">
          <div className="tabs" role="tablist">
            {category.tones.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tone === t.key}
                className={`tab ${tone === t.key ? 'is-active' : ''}`}
                onClick={() => setTone(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              placeholder={category.searchPlaceholder}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        {items.length ? (
          <ul className="grid">
            {items.map((stone) => (
              <li key={stone.name}>
                <button type="button" className="card" onClick={() => setSelected(stone)}>
                  <div className="card__media">
                    <MarbleTexture name={stone.name} colors={stone.colors} />
                  </div>
                  <div className="card__body">
                    <h3 className="card__name">{stone.name}</h3>
                    <p className="card__meta">
                      <span>{stone.ko}</span>
                      <span>{stone.origin}</span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">검색 결과가 없습니다.</p>
        )}
      </section>

      {selected && (
        <StoneModal
          stone={selected}
          category={category.eyebrow}
          toneLabel={toneLabel(selected.tone)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
