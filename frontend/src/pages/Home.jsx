
import { SignInButton, SignUpButton, useAuth } from '@clerk/react';
import { Navigate } from 'react-router';

function Home() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="auth-page">
      {/* Harakatlanuvchi video fon */}
      <video
        className="auth-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="https://media.istockphoto.com/id/1432965103/video/neon-flash-light-structures-hi-tech-neon-sci-fi-tunel-trendy-neon-glow-lines-form-pattern-and.mp4?s=mp4-640x640-is&k=20&c=SM_RaXPByXS6uy-fmxpLl4SNL6TdO98Q9Tz9DRRsYrs=" type="video/mp4" />
      </video>

      {/* Video ustidagi qoramtir qatlam */}
      <div className="auth-overlay" />

      {/* Orqa fondagi animatsiyali yorug'lik */}
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      {/* Kirish kartasi */}
      <section className="auth-card">
        <div className="logo-mark">
          🎮
        </div>

        <div className="brand auth-brand">
          <span>Game</span>Verse
        </div>

        <div className="auth-badge">
          <span className="auth-status-dot" />
          YOUR NEXT LEVEL STARTS HERE
        </div>

        <h1>O'yin dunyosiga qo'shiling</h1>

        <p className="auth-description">
          Sevimli o'yinlaringizni kashf eting,
          to'plamingizni yarating va GameVerse
          hamjamiyatiga qo'shiling.
        </p>

        <SignInButton mode="modal">
          <button className="primary-btn auth-btn" type="button">
            <span>Kirish</span>
            <span className="auth-button-arrow">→</span>
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="secondary-btn auth-btn" type="button">
            Ro'yxatdan o'tish
          </button>
        </SignUpButton>

        <div className="auth-divider">
          <span />
          <span>GAMEVERSE</span>
          <span />
        </div>

        <div className="auth-note">
          Hisobingiz bormi? Kirish tugmasini bosing.
        </div>
      </section>

      <div className="auth-bottom-label">
        <span>●</span> ENTER THE GAMEVERSE
      </div>
    </main>
  );
}

export default Home;
