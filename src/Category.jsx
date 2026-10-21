import { useRef, useState } from 'react'
import { Header, Footer, Inquiry, Visual } from './ui.jsx'

const PER_PAGE = 9

export default function Category({ nav, eyebrow, title, sub, desc, hero, filters, metaKey, note, items, app }) {
  const [sel, setSel] = useState({})
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const listRef = useRef(null)

  const query = q.trim().toLowerCase()
  const shown = items.filter(
    (it) =>
      filters.every((f) => !sel[f.key] || sel[f.key] === '전체' || it[f.key] === sel[f.key]) &&
      [it.name, ...filters.map((f) => it[f.key])].join(' ').toLowerCase().includes(query),
  )
  const pages = Math.ceil(shown.length / PER_PAGE)
  const visible = shown.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  const pick = (key, opt) => { setSel({ ...sel, [key]: opt }); setPage(0) }
  const search = (v) => { setQ(v); setPage(0) }
  const goPage = (p) => { setPage(p); listRef.current.scrollIntoView({ behavior: 'smooth' }) }
  const showStone = () => { setSel({}); search(app.stone); listRef.current.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      <Header active={nav} />

      <main className="wrap">
        <section className="intro">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="serif-en">{title}</h1>
            <p className="serif-kr sub">{sub}</p>
            {desc && <p className="lead">{desc}</p>}
          </div>
          <Visual v={hero} className="intro-img" label={`${nav} 대표 이미지`} />
        </section>

        <section className="catalog" ref={listRef}>
          <div className="filterbar">
            <div className="groups">
              {filters.map((f) => (
                <div key={f.key} className="tabs" role="tablist" aria-label={f.label ?? '컬러'}>
                  {f.label && <strong>{f.label}</strong>}
                  {f.options.map((o) => (
                    <button key={o} role="tab" aria-selected={(sel[f.key] ?? '전체') === o} onClick={() => pick(f.key, o)}>{o}</button>
                  ))}
                </div>
              ))}
            </div>
            <input
              type="search"
              className="search box-search"
              placeholder="소재명 검색"
              aria-label="소재명 검색"
              value={q}
              onChange={(e) => search(e.target.value)}
            />
          </div>

          {visible.length ? (
            <ul className="cards">
              {visible.map((it) => (
                <li key={it.name}>
                  <Visual v={it} className="thumb" label={it.name} />
                  <div className="info">
                    <div>
                      <span className="serif-en name">{it.name}</span>
                      <small>{[nav, metaKey && it[metaKey]].filter(Boolean).join(' · ')}</small>
                    </div>
                    <span aria-hidden="true">→</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">{query ? `‘${q.trim()}’에 해당하는 소재가 없습니다.` : '선택한 조건에 맞는 소재가 없습니다.'}</p>
          )}

          {note && <p className="note-line">{note}</p>}

          {pages > 1 && (
            <nav className="pager" aria-label="페이지">
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} aria-current={i === page ? 'page' : undefined} onClick={() => goPage(i)}>
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
              <button aria-label="다음 페이지" disabled={page >= pages - 1} onClick={() => goPage(page + 1)}>→</button>
            </nav>
          )}
        </section>

        <section className="app">
          <div className="text">
            <p className="eyebrow">Application</p>
            <h2 className="serif-kr">공간 속 소재</h2>
            {app.sub && <p className="serif-kr app-sub">{app.sub}</p>}
            <p className="lead">{app.text}</p>
            <button className={`more ${app.link ? '' : 'serif-en'}`} onClick={showStone}>
              {app.link ?? app.stone} <span aria-hidden="true">→</span>
            </button>
          </div>
          <Visual v={app.visual} className="app-img" label={`${app.stone} 적용 공간`} />
        </section>

        <Inquiry title="프로젝트에 맞는 소재를 상담하세요" text={`전문 상담을 통해 최적의 ${nav}을 제안해드립니다.`} />
      </main>

      <Footer note="제품명과 이미지는 시안용 예시입니다." />
    </>
  )
}
