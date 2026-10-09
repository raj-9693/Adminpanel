import { SaveIcon } from './EditorIcons';

export default function EditorFooter({ mode, setMode, onDiscard, onSave }) {
  return (
    <footer className="ed-footer">
      <div className="ed-footer__left">
        <span className="ed-footer__dot" />
        <b>Unsaved changes</b>
        <span className="ed-footer__muted">Edited just now</span>
        <div className="ed-mode">
          <button className={'ed-mode__btn' + (mode === 'draft' ? ' is-active' : '')} onClick={() => setMode('draft')}>Draft</button>
          <button className={'ed-mode__btn' + (mode === 'published' ? ' is-active' : '')} onClick={() => setMode('published')}>Published</button>
        </div>
      </div>

      <div className="ed-footer__right">
        <button className="ed-discard" onClick={onDiscard}>Discard</button>
        <button className="ed-save" onClick={onSave}><SaveIcon /> Save changes</button>
      </div>
    </footer>
  );
}
