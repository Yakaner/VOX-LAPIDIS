export const NAV = [
  { label: '명품석', href: '/signature' },
  { label: '세라믹', href: '/ceramic' },
  { label: '인조석', href: '/engineered-stone' },
  { label: '대리석', href: '/marble' },
  { label: '시공사례', href: '#' },
  { label: '표면마감 및 가공', href: '#' },
]

export function Header({ active }) {
  return (
    <>
      <header className="header wrap">
        <a href="/" className="logo">VOX LAPIDIS</a>
        <nav className="nav">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className={n.label === active ? 'active' : undefined}>{n.label}</a>
          ))}
        </nav>
        <a href="#inquiry" className="btn">상담 문의</a>
      </header>
      <div className="wrap crumb"><a href="/">홈</a> <span>&gt;</span> {active}</div>
    </>
  )
}

export function Inquiry({ title, text }) {
  return (
    <section className="inquiry" id="inquiry">
      <p className="eyebrow">Inquiry</p>
      <h2 className="serif-kr">{title}</h2>
      <p>{text}</p>
      <a href="mailto:bef18b@naver.com" className="btn wide">소재 상담하기</a>
    </section>
  )
}

export function Footer({ note = '이미지는 시안용 예시입니다.' }) {
  return (
    <footer className="footer wrap">
      <span className="logo small">VOX LAPIDIS</span>
      <div>
        <span>경기도 이천시 부발읍 중부대로1796번길 99</span>
        <a href="tel:+821034751928">010-3475-1928</a>
        <a href="mailto:bef18b@naver.com">bef18b@naver.com</a>
        <span className="note">{note}</span>
      </div>
    </footer>
  )
}

// ponytail: CSS-drawn stone placeholders (p = marble|bands|wood|concrete|terrazzo|solid); pass img once real photos exist
export function Visual({ v, className = '', label }) {
  if (v.img) return <img src={v.img} alt={label ?? ''} className={`visual ${className}`} />
  return (
    <div
      className={`visual swatch ${v.p ?? 'marble'} ${className}`}
      style={{ '--b': v.b, '--v': v.v, '--v2': v.v2 }}
      role="img"
      aria-label={label}
    />
  )
}
