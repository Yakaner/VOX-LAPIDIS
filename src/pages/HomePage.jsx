import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MarbleTexture from '../components/MarbleTexture';
import { CATEGORIES } from '../data/categories';

const ORDER = ['luxury', 'ceramic', 'quartz', 'marble'];

export default function HomePage() {
  return (
    <>
      <Hero
        headline="The Voice of Stone."
        subhead="돌이 전하는 이야기, VOX LAPIDIS"
        slabs={[
          CATEGORIES.marble.items[2].colors,
          CATEGORIES.luxury.items[0].colors,
          CATEGORIES.marble.items[11].colors,
        ]}
      />

      <section className="container collection">
        <div className="collection__head">
          <div>
            <p className="eyebrow">OUR COLLECTIONS</p>
            <h2 className="collection__title">석재 컬렉션</h2>
          </div>
          <p className="collection__desc">
            <span>세계 각지에서 엄선한 천연석부터 첨단 소재까지.</span>
            <span>공간에 맞는 단 하나의 석재를 제안합니다.</span>
          </p>
        </div>

        <ul className="grid grid--categories">
          {ORDER.map((key) => {
            const c = CATEGORIES[key];
            return (
              <li key={key}>
                <Link to={`/${key}`} className="card card--category">
                  <div className="card__media">
                    <MarbleTexture name={c.items[0].name} colors={c.items[0].colors} />
                  </div>
                  <div className="card__body">
                    <p className="eyebrow">{c.eyebrow}</p>
                    <h3 className="card__name">{c.label}</h3>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__title">당신의 공간에 어울리는 석재를 찾아드립니다.</h2>
          <Link to="/contact" className="btn btn--light">상담 문의</Link>
        </div>
      </section>
    </>
  );
}
