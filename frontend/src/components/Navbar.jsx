import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { UserButton, useUser } from '@clerk/react';

const navLinks = [
  // { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Games', path: '/games' },
  { name: 'Favorites', path: '/favorites' },
  { name: 'Notifications', path: '/notifications' },
];

const THEME_KEY = 'gameverse-theme';

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark';
  } catch {
    return document.body.classList.contains('dark-mode');
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getSavedTheme);

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);

    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // localStorage mavjud bo'lmasa, tema faqat shu sessiyada ishlaydi
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function renderLinks(mobile = false) {
    const linkClass = ({ isActive }) =>
      `nav-link${isActive ? ' active' : ''}`;

    return (
      <>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={linkClass}
            onClick={closeMenu}
          >
            {link.name}
          </NavLink>
        ))}

        {isSignedIn && (
          <NavLink
            to="/profile"
            className={linkClass}
            onClick={closeMenu}
          >
            Profile
          </NavLink>
        )}

        {mobile && (
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        )}
      </>
    );
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span>🎮</span> GameVerse
        </Link>
      </div>

      <nav className="desktop-nav">
        {renderLinks()}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Mavzuni almashtirish"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <div className="navbar-actions">
        {isSignedIn ? (
          <div className="nav-profile">
            <span className="profile-mini">
              {user?.firstName || 'User'}
            </span>
            <UserButton />
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="nav-link"
            onClick={closeMenu}
          >
            Sign in
          </Link>
        )}

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav">
          {renderLinks(true)}

          {isSignedIn ? (
            <div className="nav-profile">
              <span className="profile-mini">
                {user?.firstName || 'User'}
              </span>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="nav-link"
              onClick={closeMenu}
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}