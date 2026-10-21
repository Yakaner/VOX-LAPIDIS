import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MarbleTexture from './MarbleTexture';

export default function StoneModal({ stone, category, toneLabel, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={stone.name} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label="닫기" onClick={onClose}>×</button>
        <div className="modal__texture">
          <MarbleTexture name={stone.name} colors={stone.colors} />
        </div>
        <div className="modal__info">
          <p className="eyebrow">{category}</p>
          <h3 className="modal__title">{stone.name}</h3>
          <p className="modal__ko">{stone.ko}</p>
          <dl className="spec">
            <dt>원산지</dt><dd>{stone.origin}</dd>
            <dt>계열</dt><dd>{toneLabel}</dd>
            <dt>표면마감</dt><dd>폴리싱 · 혼드 · 브러쉬드</dd>
            <dt>두께</dt><dd>20mm / 30mm</dd>
          </dl>
          <Link to="/contact" state={{ stone: stone.name }} className="btn btn--dark">이 석재로 상담하기</Link>
        </div>
      </div>
    </div>
  );
}
