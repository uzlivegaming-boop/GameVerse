import {
  useEffect,
  useState
} from 'react';

import {
  NavLink,
  Link
} from 'react-router';

import {
  UserButton,
  useUser
} from '@clerk/react';


function Navbar() {

  const { user } =
    useUser();


  const [
    darkMode,
    setDarkMode
  ] = useState(() => {

    return (
      localStorage.getItem(
        'gameverse-theme'
      ) === 'dark'
    );

  });


  useEffect(() => {

    document.body.classList.toggle(
      'dark-mode',
      darkMode
    );

    localStorage.setItem(
      'gameverse-theme',
      darkMode
        ? 'dark'
        : 'light'
    );

  }, [darkMode]);


  return (
    <header className="navbar">

      <Link
        className="brand navbar-brand"
        to={
          user
            ? '/dashboard'
            : '/'
        }
      >
        🎮 <span>Game</span>Verse
      </Link>


      {user && (
        <nav>

          <NavLink
            to="/dashboard"
            className={({
              isActive
            }) =>
              `nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <span>⌂</span>
            Bosh sahifa
          </NavLink>


          <NavLink
            to="/games"
            className={({
              isActive
            }) =>
              `nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <span>🎮</span>
            O'yinlar
          </NavLink>


          <NavLink
            to="/favorites"
            className={({
              isActive
            }) =>
              `nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <span>☆</span>
            Sevimlilar
          </NavLink>


          <NavLink
            to="/notifications"
            className={({
              isActive
            }) =>
              `nav-link ${
                isActive
                  ? 'active'
                  : ''
              }`
            }
          >
            <span>🔔</span>
            Bildirishnomalar
          </NavLink>

        </nav>
      )}


      <button
        type="button"
        className="theme-toggle"
        onClick={() =>
          setDarkMode(
            prev => !prev
          )
        }
      >
        {
          darkMode
            ? '☀️'
            : '🌙'
        }
      </button>


      {user && (
        <div className="nav-profile">

          <Link
            className="profile-mini"
            to="/profile"
          >
            <span>
              {
                user.firstName ||
                user.username ||
                'Player'
              }
            </span>
          </Link>


          <UserButton />

        </div>
      )}

    </header>
  );
}


export default Navbar;