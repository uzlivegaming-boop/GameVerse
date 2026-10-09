import {
  SignInButton,
  SignUpButton,
  useAuth
} from '@clerk/react';

import { Navigate } from 'react-router';

function Home() {
  const {
    isLoaded,
    isSignedIn
  } = useAuth();

  // Login qilingan bo'lsa,
  // Home sahifasida qolmaydi
  if (isLoaded && isSignedIn) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <main className="auth-page">

      <div className="auth-overlay" />

      <section className="auth-card">

        <div className="logo-mark">
          🎮
        </div>

        <div className="brand">
          <span>Game</span>Verse
        </div>

        <h1>
          O'yin dunyosiga qo'shiling
        </h1>

        <p>
          Profil yarating va sevimli
          o'yinlaringizni bir joyda
          saqlang.
        </p>

        {/* KIRISH */}
        <SignInButton mode="modal">
          <button
            className="primary-btn auth-btn"
            type="button"
          >
            Kirish
          </button>
        </SignInButton>

        {/* RO'YXATDAN O'TISH */}
        <SignUpButton mode="modal">
          <button
            className="secondary-btn auth-btn"
            type="button"
          >
            Ro'yxatdan o'tish
          </button>
        </SignUpButton>

        <div className="auth-note">
          Hisobingiz bo'lsa — kiring.
          Hisobingiz bo'lmasa — ro'yxatdan o'ting.
        </div>

      </section>

    </main>
  );
}

export default Home;