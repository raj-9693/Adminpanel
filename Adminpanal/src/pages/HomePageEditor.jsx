import { useState } from 'react';
import EditorHeader from '../components/editor/EditorHeader';
import SectionItem from '../components/editor/SectionItem';
import LivePreview from '../components/editor/LivePreview';
import EditorFooter from '../components/editor/EditorFooter';
import { formMap } from '../components/editor/SectionForms';
import { DotsIcon } from '../components/editor/EditorIcons';
import { editorMeta, sectionList, initialContent } from '../data/editorData';
import '../styles/editor.css';

export default function HomePageEditor() {
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [openId, setOpenId] = useState('hero');      // jo accordion khula hai
  const [previewId, setPreviewId] = useState('hero'); // preview me konsa section dikhana hai
  const [device, setDevice] = useState('desktop');
  const [mode, setMode] = useState('draft');

  const setSection = (key, value) => setContent((c) => ({ ...c, [key]: value }));

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
    setPreviewId(id);
  };

  return (
    <div className="ed-page">
      <EditorHeader />

      <div className="ed-body">
        {/* ---------- Left: Page sections ---------- */}
        <section className="ed-left">
          <div className="ed-panel-head">
            <div>
              <h2 className="ed-panel-title">{editorMeta.sectionsTitle}</h2>
              <p className="ed-panel-sub">{editorMeta.sectionsSub}</p>
            </div>
            <button className="ed-more" aria-label="More options"><DotsIcon /></button>
          </div>

          <div className="ed-accordion">
            {sectionList.map((meta) => {
              const Form = formMap[meta.id];
              return (
                <SectionItem
                  key={meta.id} meta={meta}
                  isOpen={openId === meta.id}
                  onToggle={() => toggle(meta.id)}
                >
                  <Form data={content[meta.id]} onChange={(v) => setSection(meta.id, v)} />
                </SectionItem>
              );
            })}
          </div>
        </section>

        {/* ---------- Right: Live preview ---------- */}
        <LivePreview content={content} section={previewId} device={device} setDevice={setDevice} />
      </div>

      <EditorFooter
        mode={mode} setMode={setMode}
        onDiscard={() => setContent(savedContent)}
        onSave={() => setSavedContent(content)}
      />
    </div>
  );
}
