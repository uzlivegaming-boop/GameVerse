import { useCallback, useEffect, useState } from 'react';
import {
  createGame,
  deleteGame,
  getGames,
  updateGame,
} from '../api/games';

const emptyForm = {
  name: '',
  description: '',
  image: '',
  category: 'Action',
  platform: 'PC',
  downloadUrl: '',
  rating: '4.5',
};

const categories = [
  'Action',
  'Adventure',
  'Racing',
  'Simulation',
  'Strategy',
  'Casual',
  'Other',
];

export default function MyGames() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const loadGames = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    try {
      const result = await getGames();
      setItems(Array.isArray(result) ? result : []);
    } catch (error) {
      setLoadError(
        error.response?.data?.error ||
          error.message ||
          'O‘yinlarni yuklab bo‘lmadi.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormError('');
    setModalOpen(true);
  }

  function openEdit(game) {
    setEditingId(game.id);

    setForm({
      name: game.name || '',
      description: game.description || '',
      image: game.image || '',
      category: game.category || 'Other',
      platform: game.platform || 'PC',
      downloadUrl: game.downloadUrl || '',
      rating: String(game.rating ?? 4.5),
    });

    setFormError('');
    setModalOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setFormError('');

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      category: form.category,
      platform: form.platform.trim() || null,
      downloadUrl: form.downloadUrl.trim() || null,
      rating: Number(form.rating),
    };

    try {
      if (editingId !== null) {
        await updateGame(editingId, payload);
      } else {
        await createGame(payload);
      }

      setModalOpen(false);
      await loadGames();
    } catch (error) {
      const message = error.response?.data?.error;

      setFormError(
        (Array.isArray(message)
          ? message[0]?.message
          : message) ||
          error.response?.data?.message ||
          error.message ||
          'Saqlashda xatolik yuz berdi.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(game) {
    const confirmed = window.confirm(
      `“${game.name}” o‘yinini o‘chirmoqchimisiz?`
    );

    if (!confirmed) return;

    setDeletingId(game.id);
    setLoadError('');

    try {
      await deleteGame(game.id);

      setItems((current) =>
        current.filter((item) => item.id !== game.id)
      );
    } catch (error) {
      setLoadError(
        error.response?.data?.error ||
          error.message ||
          'O‘yin o‘chirilmadi.'
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="page games-page my-games-page">
      <div className="page-heading games-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h1>Mening o‘yinlarim</h1>
          <p className="games-subtitle">
            O‘zingiz qo‘shgan o‘yinlarni shu yerdan
            tahrirlang yoki o‘chiring.
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={openCreate}
        >
          + O‘yin qo‘shish
        </button>
      </div>

      {loadError && (
        <div className="game-form-error" role="alert">
          {loadError}
        </div>
      )}

      {loading ? (
        <div className="empty-page game-empty">
          <div>⏳</div>
          <h2>O‘yinlar yuklanmoqda...</h2>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-page game-empty">
          <div>🎮</div>
          <h2>Hozircha o‘yin qo‘shmagansiz</h2>
          <p>
            “O‘yin qo‘shish” tugmasini bosing.
            Qo‘shgan o‘yinlaringiz shu bo‘limda ko‘rinadi.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={openCreate}
          >
            + Birinchi o‘yinni qo‘shish
          </button>
        </div>
      ) : (
        <>
          <div className="library-stats">
            <span>
              <b>{items.length}</b> ta o‘yin
            </span>
            <span>✏️ Tahrirlash mumkin</span>
            <span>🔒 Faqat sizning o‘yinlaringiz</span>
          </div>

          <div className="game-grid large">
            {items.map((game) => (
              <article
                className="game-card enhanced-game-card"
                key={game.id}
              >
                <div className="game-cover">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="emoji-cover">🎮</div>
                  )}

                  <span className="rating-badge">
                    ★ {Number(game.rating ?? 0).toFixed(1)}
                  </span>
                </div>

                <div className="game-info">
                  <div className="game-title-row">
                    <h3>{game.name}</h3>
                    <span className="game-size">
                      {game.platform || 'PC'}
                    </span>
                  </div>

                  <p>{game.description}</p>

                  <div className="my-game-actions">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => openEdit(game)}
                    >
                      ✏️ Tahrirlash
                    </button>

                    <button
                      type="button"
                      className="secondary-modal-btn"
                      disabled={deletingId === game.id}
                      onClick={() => handleDelete(game)}
                    >
                      {deletingId === game.id
                        ? 'O‘chirilmoqda...'
                        : '🗑 O‘chirish'}
                    </button>
                  </div>

                  {game.downloadUrl && (
                    <a
                      className="my-game-download"
                      href={game.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Yuklab olish ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {modalOpen && (
        <div
          className="game-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !saving
            ) {
              setModalOpen(false);
            }
          }}
        >
          <section
            className="game-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="my-game-form-title"
          >
            <div className="game-modal-header">
              <div>
                <p className="eyebrow">YOUR COLLECTION</p>

                <h2 id="my-game-form-title">
                  {editingId !== null
                    ? 'O‘yinni tahrirlash'
                    : 'Yangi o‘yin qo‘shish'}
                </h2>

                <p>Ma’lumotlarni to‘ldiring.</p>
              </div>

              <button
                type="button"
                className="game-modal-close"
                onClick={() => !saving && setModalOpen(false)}
                aria-label="Yopish"
              >
                ✕
              </button>
            </div>

            <form
              className="game-add-form"
              onSubmit={handleSubmit}
            >
              <label>
                O‘yin nomi
                <input
                  className="search"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Qisqa tavsif
                <input
                  className="search"
                  required
                  minLength={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Rasm URL
                <input
                  className="search"
                  required
                  type="url"
                  placeholder="https://example.com/game.jpg"
                  value={form.image}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      image: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Kategoriya
                <select
                  className="sort-select"
                  value={form.category}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      category: event.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Platforma
                <input
                  className="search"
                  placeholder="PC"
                  value={form.platform}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      platform: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Yuklab olish URL
                <input
                  className="search"
                  type="url"
                  placeholder="https://... (ixtiyoriy)"
                  value={form.downloadUrl}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      downloadUrl: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Reyting (0–5)
                <input
                  className="search"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      rating: event.target.value,
                    })
                  }
                />
              </label>

              {formError && (
                <p role="alert" className="game-form-error">
                  {formError}
                </p>
              )}

              <div className="game-modal-actions">
                <button
                  className="secondary-modal-btn"
                  type="button"
                  disabled={saving}
                  onClick={() => setModalOpen(false)}
                >
                  Bekor qilish
                </button>

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? 'Saqlanmoqda...' : '✓ Saqlash'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}