import { useState } from 'react';
import MarbleTexture from './MarbleTexture';

// image가 있으면 사진을, 없거나 로드 실패 시 코드로 그린 쇼룸 장면을 보여준다.
export default function Hero({ headline, subhead, slabs, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="hero">
      <h1 className="hero__headline">{headline}</h1>
      <p className="hero__subhead">{subhead}</p>

      <div className="hero__visual">
        <div className="scene" aria-hidden="true">
          <div className="scene__wall" />
          <div className="scene__light" />
          <div className="scene__floor" />
          <div className="scene__slabs">
            {slabs.map((colors, i) => (
              <div className="slab" key={i}>
                <div className="slab__face">
                  <MarbleTexture name={`${headline}-${i}`} colors={colors} />
                </div>
                <div className="slab__side" style={{ background: colors[0] }} />
                <div className="slab__reflection">
                  <MarbleTexture name={`${headline}-${i}`} colors={colors} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {image && (
          <img
            className={`hero__image ${imageLoaded ? 'is-loaded' : ''}`}
            src={image}
            alt={subhead}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
    </section>
  );
}
