import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import MarbleTexture from '../components/MarbleTexture';
import { PROJECT_FILTERS, PROJECTS } from '../data/projects';

export default function ProjectsPage() {
  const [type, setType] = useState('all');
  const items = PROJECTS.filter((p) => type === 'all' || p.type === type);
  const typeLabel = (key) => PROJECT_FILTERS.find((f) => f.key === key)?.label;

  return (
    <>
      <Breadcrumb current="시공사례" />
      <section className="container page-intro">
        <h1 className="page-intro__headline">Crafted Spaces.</h1>
        <p className="hero__subhead">VOX LAPIDIS가 완성한 공간들</p>
      </section>

      <section className="container collection">
        <div className="toolbar toolbar--center">
          <div className="tabs" role="tablist">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={type === f.key}
                className={`tab ${type === f.key ? 'is-active' : ''}`}
                onClick={() => setType(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid--projects">
          {items.map((p) => (
            <li key={p.title} className="project">
              <div className="project__media">
                <MarbleTexture name={p.title} colors={p.colors} />
                <span className="project__tag">{typeLabel(p.type)}</span>
              </div>
              <h3 className="card__name">{p.title}</h3>
              <p className="card__meta">
                <span>{p.stone}</span>
                <span>{p.year}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
