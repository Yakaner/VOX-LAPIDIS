import { useEffect, useState } from 'react'
import { Header, Footer, Inquiry, Visual } from './ui.jsx'

const TONE = {
  bianco: { b: '#eeeeec', v: '#aeb2b7', v2: '#d2d4d7' },
  calacatta: { b: '#f4f1eb', v: '#b8995f', v2: '#c4c8cd' },
  grey: { b: '#7b7b7b', v: '#e6e6e6', v2: '#a3a3a3' },
  beige: { b: '#e7dbc6', v: '#b59a6a', v2: '#f4ece0' },
  nero: { b: '#181818', v: '#e9e9e9', v2: '#575757' },
  verde: { b: '#3d5846', v: '#cad8cd', v2: '#6e8a76' },
}

const STONES = [
  { name: 'Bianco', kr: '비앙코', tone: 'bianco', cat: '화이트' },
  { name: 'Calacatta', kr: '칼라카타', tone: 'calacatta', cat: '화이트' },
  { name: 'Grey Vein', kr: '그레이 베인', tone: 'grey', cat: '그레이' },
  { name: 'Cream Beige', kr: '크림 베이지', tone: 'beige', cat: '베이지' },
  { name: 'Nero', kr: '네로', tone: 'nero', cat: '블랙' },
  { name: 'Verde', kr: '베르데', tone: 'verde', cat: '그린' },
]

const TABS = ['전체', '화이트', '베이지', '그레이', '블랙']

const SCENES = [
  { img: '/img/kitchen.webp', label: '주방', stone: 'Cream Beige' },
  { img: '/img/bath.webp', label: '욕실', stone: 'Bianco' },
  { img: '/img/living.webp', label: '거실', stone: 'Nero' },
]

const SLABS = [
  { name: 'Bianco', img: '/img/bianco.webp' },
  { name: 'Cream Beige', img: '/img/beige.webp' },
  { name: 'Nero', img: '/img/nero.webp' },
]

// Writes CSS vars directly so mousemove doesn't re-render React.
// Measured on the untransformed .slot so the rotating box can't feed back into the rect.
function turn(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--ry', `${(x - 0.5) * 40}deg`)
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
}

function reset(e) {
  e.currentTarget.style.removeProperty('--ry')
}

const Marble = ({ tone, className }) => <Visual v={TONE[tone]} className={className} label={`${tone} marble`} />

export default function App() {
  const [tab, setTab] = useState('전체')
  const [q, setQ] = useState('')
  const [scene, setScene] = useState(0)

  // Re-armed on every change, so a manual pick also restarts the 5s timer.
  useEffect(() => {
    const id = setTimeout(() => setScene((scene + 1) % SCENES.length), 5000)
    return () => clearTimeout(id)
  }, [scene])

  const query = q.trim().toLowerCase()
  const shown = STONES.filter(
    (s) =>
      (tab === '전체' || s.cat === tab) &&
      `${s.name} ${s.kr} ${s.cat}`.toLowerCase().includes(query),
  )

  return (
    <>
      <Header active="대리석" />

      <section className="hero">
        <h1 className="serif-en">Nature, in Every Vein.</h1>
        <p className="serif-kr">자연의 결을 담은 대리석</p>
        <div className="room">
          {SLABS.map((s) => (
            <div
              key={s.name}
              className="slot"
              role="img"
              aria-label={s.name}
              style={{ '--img': `url(${s.img})` }}
              onMouseMove={turn}
              onMouseLeave={reset}
            >
              <div className="box">
                <i className="shade" />
                <i className="reflect" />
                <i className="face left" />
                <i className="face right" />
                <i className="face front" />
              </div>
              <span className="serif-en">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      <main className="wrap">
        <section className="collection">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Marble Collection</p>
              <h2 className="serif-kr">대리석 컬렉션</h2>
            </div>
            <p className="desc">
              오랜 시간, 자연이 빚어낸 단 하나의 결.<br />
              대리석은 공간에 깊이 있는 아름다움과 시간이 더할수록 빛나는 가치를 선사합니다.
            </p>
          </div>

          <div className="toolbar">
            <div className="tabs" role="tablist">
              {TABS.map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            <input
              type="search"
              className="search"
              placeholder="석재명 검색 (예: Nero, 비앙코)"
              aria-label="석재 검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {shown.length ? (
            <ul className="grid">
              {shown.map((s) => (
                <li key={s.name}>
                  <Marble tone={s.tone} className="card" />
                  <span className="serif-en">{s.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">‘{q}’에 해당하는 석재가 없습니다.</p>
          )}
        </section>

        <section className="feature">
          <div className="text">
            <p className="eyebrow">Application</p>
            <h2 className="serif-kr">공간을 완성하는<br />자연의 아름다움</h2>
            <p>대리석이 만들어내는 섬세한 결과 깊이 있는 질감은<br />공간에 우아함과 품격을 더합니다.<br />일상의 공간을 특별한 가치로 완성합니다.</p>
          </div>
          <div className="scene">
            {SCENES.map((s, i) => (
              <img
                key={s.img}
                src={s.img}
                alt={`${s.stone} 대리석으로 마감한 ${s.label}`}
                className={i === scene ? 'on' : undefined}
              />
            ))}
            <div className="scene-nav">
              {SCENES.map((s, i) => (
                <button key={s.label} aria-pressed={i === scene} onClick={() => setScene(i)}>
                  <b>{s.label}</b> {s.stone}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="feature">
          <div className="text">
            <p className="eyebrow">Detail View</p>
            <h2 className="serif-kr">디테일로 만나는<br />대리석의 깊이</h2>
            <p>넓은 판재에서 느껴지는 전체적인 흐름과<br />가까이서 만나는 섬세한 무늬까지,<br />자연이 만든 고유한 아름다움을 확인해보세요.</p>
          </div>
          <div className="details">
            <figure><Marble tone="bianco" className="detail" /><figcaption>전체 판재</figcaption></figure>
            <figure><Marble tone="calacatta" className="detail zoom" /><figcaption>무늬 디테일</figcaption></figure>
          </div>
        </section>

        <Inquiry title="공간에 맞는 소재를 찾아드립니다" text="전문 상담을 통해 최적의 대리석을 제안해드립니다." />
      </main>

      <Footer />
    </>
  )
}
