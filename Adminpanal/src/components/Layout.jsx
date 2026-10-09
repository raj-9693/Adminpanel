import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../styles/dashboard.css';

export default function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
