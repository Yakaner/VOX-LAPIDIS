import { Link } from 'react-router-dom';

export default function Breadcrumb({ current }) {
  return (
    <div className="container breadcrumb">
      <Link to="/">홈</Link>
      <span className="breadcrumb__sep">&gt;</span>
      <span>{current}</span>
    </div>
  );
}
