import { ChevronIcon, sectionIcons } from './EditorIcons';

export default function SectionItem({ meta, isOpen, onToggle, children }) {
  const Icon = sectionIcons[meta.icon];
  return (
    <div className={'ed-acc' + (isOpen ? ' is-open' : '')}>
      <button className="ed-acc__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="ed-acc__icon"><Icon /></span>
        <span className="ed-acc__text">
          <b>{meta.title}</b>
          <small>{meta.subtitle}</small>
        </span>
        <ChevronIcon className="ed-acc__chev" />
      </button>
      <div className="ed-acc__body" style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
}
