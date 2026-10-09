import { BellIcon } from './EditorIcons';
import { editorMeta } from '../../data/editorData';

export default function EditorHeader() {
  return (
    <header className="ed-header">
      <div>
        <p className="ed-eyebrow">{editorMeta.eyebrow}</p>
        <h1 className="ed-title">{editorMeta.title}</h1>
      </div>
      <div className="ed-header__right">
        <span className="ed-pill">{editorMeta.lastPublished}</span>
        <button className="ed-bell" aria-label="Notifications">
          <BellIcon />
          <span className="ed-bell__dot" />
        </button>
        <div className="ed-avatar">{editorMeta.userInitials}</div>
      </div>
    </header>
  );
}
