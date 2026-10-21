import { Link } from 'react-router-dom';
import { NAV } from '../data/categories';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link to="/" className="logo logo--footer">VOX LAPIDIS</Link>
          <p className="footer__tagline">The Voice of Stone</p>
        </div>
        <nav className="footer__nav">
          {NAV.map((item) => (
            <Link key={item.path} to={item.path}>{item.label}</Link>
          ))}
          <Link to="/contact">상담 문의</Link>
        </nav>
      </div>
      <div className="container footer__copy">© {new Date().getFullYear()} VOX LAPIDIS. All rights reserved.</div>
    </footer>
  );
}
