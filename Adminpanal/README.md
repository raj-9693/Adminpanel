# Home page editor (Enquiries screen)

Naye files: `src/data/editorData.js`, `src/styles/editor.css`, `src/pages/HomePageEditor.jsx`,
`src/components/editor/*`.

Sirf 2 jagah purani files me change:
1. App.jsx  ->  import HomePageEditor from './pages/HomePageEditor';
                <Route path="/enquiries" element={<HomePageEditor />} />
2. data/dummyData.js (navItems) -> enquiries ka  path: '/enquiries'
