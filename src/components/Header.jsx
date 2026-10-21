import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/categories';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo">VOX LAPIDIS</Link>

        <nav className={`gnb ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <NavLink key={item.path} to={item.path} className="gnb__link">
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="gnb__contact-mobile">상담 문의</Link>
        </nav>

        <Link to="/contact" className="btn-contact">상담 문의</Link>

        <button
          type="button"
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
