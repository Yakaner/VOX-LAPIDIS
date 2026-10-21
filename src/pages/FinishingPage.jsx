import Breadcrumb from '../components/Breadcrumb';
import MarbleTexture from '../components/MarbleTexture';
import { FINISHES, PROCESSES } from '../data/finishing';

const SWATCH = ['#e4dccf', '#a99478', '#c9bba5'];

export default function FinishingPage() {
  return (
    <>
      <Breadcrumb current="표면마감 및 가공" />
      <section className="container page-intro">
        <h1 className="page-intro__headline">Surface &amp; Craft.</h1>
        <p className="hero__subhead">같은 석재, 다른 표정</p>
      </section>

      <section className="container collection">
        <div className="collection__head">
          <div>
            <p className="eyebrow">SURFACE FINISH</p>
            <h2 className="collection__title">표면마감</h2>
          </div>
          <p className="collection__desc">
            <span>마감 방식에 따라 석재의 색감, 광택, 촉감이 달라집니다.</span>
            <span>공간의 용도와 분위기에 맞는 마감을 선택하세요.</span>
          </p>
        </div>

        <ul className="grid grid--finishes">
          {FINISHES.map((f) => (
            <li key={f.en} className="finish">
              <div
                className="finish__media"
                style={{ '--gloss': f.gloss, '--rough': f.roughness }}
              >
                <MarbleTexture name="finish-sample" colors={SWATCH} />
              </div>
              <p className="eyebrow">{f.en.toUpperCase()}</p>
              <h3 className="card__name">{f.name}</h3>
              <p className="finish__desc">{f.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container collection">
        <div className="collection__head">
          <div>
            <p className="eyebrow">FABRICATION</p>
            <h2 className="collection__title">가공</h2>
          </div>
        </div>
        <ol className="process">
          {PROCESSES.map((p) => (
            <li key={p.no} className="process__item">
              <span className="process__no">{p.no}</span>
              <div>
                <h3 className="card__name">{p.name}</h3>
                <p className="eyebrow">{p.en.toUpperCase()}</p>
              </div>
              <p className="finish__desc">{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
