import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useUser } from '@clerk/react';
import {
  createGameComment,
  getGameComments,
  getGames,
} from '../api/games';
import { games as featuredGames } from './Games';

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('uz-UZ', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return '';
  }
}

export default function GameDetails() {
  const { gameSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [savedGames, setSavedGames] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    let active = true;

    getGames()
      .then((items) => {
        if (active) {
          setSavedGames(Array.isArray(items) ? items : []);
        }
      })
      .catch((err) => {
        console.warn(
          'Bazadagi o‘yinlar yuklanmadi:',
          err.message
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const game = useMemo(() => {
    const databaseGames = savedGames.map((item) => ({
      ...item,
      type: item.description || item.platform || 'Yangi o‘yin',
      size: item.platform || 'PC',
      rating: String(item.rating ?? 0),
      downloadUrl: item.downloadUrl || '#',
      fromDatabase: true,
    }));

    const additionalGames = featuredGames.filter(
      (item) =>
        !savedGames.some(
          (saved) =>
            saved.name.toLowerCase() ===
            item.name.toLowerCase()
        )
    );

    const allGames = [
      ...databaseGames,
      ...additionalGames,
    ];

    return allGames.find(
      (item) => slugify(item.name) === gameSlug
    );
  }, [gameSlug, savedGames]);

  const gameKey = gameSlug;

  useEffect(() => {
    let active = true;

    setCommentsLoading(true);
    setCommentError('');

    getGameComments(gameKey)
      .then((items) => {
        if (active) {
          setComments(
            Array.isArray(items) ? items : []
          );
        }
      })
      .catch((err) => {
        if (active) {
          setComments([]);
          setCommentError(
            err.response?.data?.error ||
              'Izohlarni yuklab bo‘lmadi. Backend va database ulanishini tekshiring.'
          );
        }
      })
      .finally(() => {
        if (active) setCommentsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [gameKey]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = commentText.trim();

    if (content.length < 2) {
      setCommentError(
        'Izoh kamida 2 ta belgidan iborat bo‘lsin.'
      );
      return;
    }

    setSending(true);
    setCommentError('');

    try {
      const userName =
        user?.fullName ||
        user?.username ||
        user?.firstName ||
        'GameVerse foydalanuvchisi';

      const created = await createGameComment(
        gameKey,
        content,
        userName
      );

      setComments((current) => [
        created,
        ...current,
      ]);

      setCommentText('');
    } catch (err) {
      setCommentError(
        err.response?.data?.error ||
          'Izoh saqlanmadi. Backend va database ulanishini tekshiring.'
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="details-loading">
          O‘yin ma’lumotlari yuklanmoqda...
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="page">
        <div className="empty-page">
          <div className="empty-icon">🎮</div>
          <h1>O‘yin topilmadi</h1>
          <p>
            O‘yinlar sahifasiga qaytib, boshqa
            o‘yin tanlang.
          </p>

          <button
            className="primary-btn details-back-btn"
            onClick={() => navigate('/games')}
          >
            ← O‘yinlarga qaytish
          </button>
        </div>
      </div>
    );
  }

  const description = game.fromDatabase
    ? game.description
    : `${game.name} — ${game.type}. O‘yin haqida batafsil ma’lumot, asosiy janr va rasmiy yuklab olish manzili shu sahifada.`;

  return (
    <div className="page game-details-page">
      <button
        type="button"
        className="details-back-link"
        onClick={() => navigate('/games')}
      >
        ← Barcha o‘yinlar
      </button>

      <section className="game-details-hero">
        <div className="game-details-image">
          {game.image ? (
            <img src={game.image} alt={game.name} />
          ) : (
            <div className="emoji-cover">🎮</div>
          )}
        </div>

        <div className="game-details-summary">
          <p className="eyebrow">
            GAMEVERSE • O‘YIN MA’LUMOTI
          </p>

          <h1>{game.name}</h1>

          <p className="game-details-type">
            {game.type ||
              game.description ||
              'O‘yin'}
          </p>

          <div className="details-tags">
            <span>{game.category || 'Other'}</span>
            <span>
              {game.platform || game.size || 'PC'}
            </span>
            <span>★ {game.rating || '—'}</span>
          </div>

          <p className="game-details-description">
            {description}
          </p>

          {game.downloadUrl &&
          game.downloadUrl !== '#' ? (
            <a
              className="primary-btn download-btn details-download"
              href={game.downloadUrl}
              target="_blank"
              rel="noreferrer"
            >
              Rasmiy manbadan yuklab olish ↗
            </a>
          ) : (
            <p className="muted">
              Bu o‘yin uchun yuklab olish manzili
              kiritilmagan.
            </p>
          )}
        </div>
      </section>

      <section className="game-comments-section">
        <div className="game-comments-heading">
          <div>
            <p className="eyebrow">COMMUNITY</p>
            <h2>O‘yin haqidagi izohlar</h2>
          </div>

          <span className="comment-count">
            {comments.length} ta izoh
          </span>
        </div>

        <form
          className="comment-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="game-comment">
            Fikringizni yozing
          </label>

          <textarea
            id="game-comment"
            className="search comment-textarea"
            value={commentText}
            onChange={(event) =>
              setCommentText(event.target.value)
            }
            placeholder={`${game.name} haqida nima deb o‘ylaysiz?`}
            minLength={2}
            maxLength={1000}
            rows={4}
            required
          />

          <div className="comment-form-footer">
            <small>
              {commentText.length}/1000 belgi
            </small>

            <button
              type="submit"
              className="primary-btn comment-submit"
              disabled={
                sending ||
                commentText.trim().length < 2
              }
            >
              {sending
                ? 'Yuborilmoqda...'
                : 'Izoh qoldirish'}
            </button>
          </div>

          {commentError && (
            <p className="game-form-error" role="alert">
              {commentError}
            </p>
          )}
        </form>

        {commentsLoading ? (
          <p className="muted">
            Izohlar yuklanmoqda...
          </p>
        ) : comments.length ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <article
                className="comment-card"
                key={comment.id}
              >
                <div className="comment-avatar">
                  {(comment.userName || 'G')
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="comment-content">
                  <div className="comment-meta">
                    <strong>
                      {comment.userName ||
                        'GameVerse foydalanuvchisi'}
                    </strong>

                    <time dateTime={comment.createdAt}>
                      {formatDate(comment.createdAt)}
                    </time>
                  </div>

                  <p>{comment.content}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="comments-empty">
            <span>💬</span>
            <strong>Hozircha izohlar yo‘q</strong>
            <p>
              Birinchi bo‘lib o‘z fikringizni yozing.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}