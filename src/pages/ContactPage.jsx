import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { NAV } from '../data/categories';

export default function ContactPage() {
  const { state } = useLocation();
  const [sent, setSent] = useState(false);

  // TODO: 실제 접수 API(메일, 폼 서비스 등)와 연결
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Breadcrumb current="상담 문의" />
      <section className="container page-intro">
        <h1 className="page-intro__headline">Let&rsquo;s Talk Stone.</h1>
        <p className="hero__subhead">프로젝트에 대해 알려주시면 담당자가 연락드리겠습니다.</p>
      </section>

      <section className="container contact">
        {sent ? (
          <p className="contact__done">문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <span>이름</span>
              <input name="name" required />
            </label>
            <label>
              <span>연락처</span>
              <input name="phone" type="tel" required />
            </label>
            <label>
              <span>이메일</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>관심 분야</span>
              <select name="category" defaultValue="">
                <option value="" disabled>선택해주세요</option>
                {NAV.filter((n) => n.path !== '/projects').map((n) => (
                  <option key={n.path}>{n.label}</option>
                ))}
              </select>
            </label>
            <label className="form__full">
              <span>문의 내용</span>
              <textarea
                name="message"
                rows="6"
                defaultValue={state?.stone ? `[${state.stone}] 문의드립니다.\n` : ''}
                required
              />
            </label>
            <button type="submit" className="btn btn--dark form__full">문의 보내기</button>
          </form>
        )}
      </section>
    </>
  );
}
