
import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} GameVerse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
