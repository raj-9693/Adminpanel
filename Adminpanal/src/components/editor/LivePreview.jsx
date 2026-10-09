import { MonitorIcon, PhoneIcon } from './EditorIcons';
import {
  HeroPreview, StatsPreview, ServicesPreview,
  GalleryPreview, ReviewsPreview, ValuesPreview,
} from './PreviewSections';
import { editorMeta, siteNav } from '../../data/editorData';

export default function LivePreview({ content, section, device, setDevice }) {
  // active section ke hisaab se design badalta hai
  const views = {
    hero: <HeroPreview data={content.hero} stats={content.stats} />,
    stats: <StatsPreview data={content.stats} />,
    services: <ServicesPreview data={content.services} />,
    gallery: <GalleryPreview data={content.gallery} />,
    reviews: <ReviewsPreview data={content.reviews} />,
    values: <ValuesPreview data={content.values} />,
  };

  return (
    <section className="ed-preview">
      <div className="ed-panel-head">
        <div>
          <h2 className="ed-panel-title">{editorMeta.previewTitle}</h2>
          <p className="ed-panel-sub">{device === 'desktop' ? 'Desktop' : 'Mobile'} · Home page</p>
        </div>
        <div className="ed-device">
          <button className={'ed-device__btn' + (device === 'desktop' ? ' is-active' : '')} onClick={() => setDevice('desktop')} aria-label="Desktop preview">
            <MonitorIcon />
          </button>
          <button className={'ed-device__btn' + (device === 'mobile' ? ' is-active' : '')} onClick={() => setDevice('mobile')} aria-label="Mobile preview">
            <PhoneIcon />
          </button>
        </div>
      </div>

      <div className="ed-preview__card">
        <div className={'ed-browser' + (device === 'mobile' ? ' is-mobile' : '')}>
          <div className="ed-browser__bar">
            <i /><i /><i />
            <span className="ed-browser__url" />
          </div>

          <div className="ed-site">
            <nav className="pv-nav">
              <span className="pv-logo">Saanjh</span>
              <ul>
                {siteNav.map((n) => <li key={n}><a href="#preview">{n}</a></li>)}
              </ul>
              <button className="pv-enquire">Enquire</button>
            </nav>

            {views[section]}
          </div>
        </div>
      </div>
    </section>
  );
}
