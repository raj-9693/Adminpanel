import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { EditorBarProvider } from './editor/EditorBarContext';
import './styles/effects.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EditorBarProvider>
        <App />
      </EditorBarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
