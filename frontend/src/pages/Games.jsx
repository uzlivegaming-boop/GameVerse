import { useEffect, useMemo, useState } from 'react';
import { createGame, getGames } from '../api/games';
import { useNavigate } from 'react-router';
export const games = [
  {
    name: 'Minecraft',
    type: 'Adventure • Survival',
    category: 'Adventure',
    image: 'https://minecraft.wiki/images/MC_key_art_2024.jpg',
    rating: '4.9',
    size: 'Launcher',
    downloadUrl: 'https://www.minecraft.net/en-us/download/'
  },
  {
    name: 'CS2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    rating: '4.8',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/730/CounterStrike_2/'
  },
  {
    name: 'Valorant',
    type: 'FPS • Competitive',
    category: 'Action',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSEHoBNfqSz-qMT03KmgFrC9aLwYFqpCCWu7CJtLT72po2muLlB64C9tS&s=10',
    rating: '4.8',
    size: 'Free',
    downloadUrl: 'https://playvalorant.com/en-us/download/'
  },
  {
    name: 'Forza Horizon 5',
    type: 'Racing • Open World',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/'
  },
  {
    name: 'GTA V',
    type: 'Action • Open World',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.rockstargames.com/game/buy-gta-v'
  },
  {
    name: 'Roblox',
    type: 'Adventure • Online',
    category: 'Adventure',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVh4qmAnrdhBSYpLHSwkXhAK8tqSxmJf0pkwpd7f3jg&s=10',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://www.roblox.com/download'
  },
  {
    name: 'Dota 2',
    type: 'MOBA • Multiplayer',
    category: 'Strategy',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/570/Dota_2/'
  },
  {
    name: 'Need for Speed',
    type: 'Racing • Open World',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://www.ea.com/games/need-for-speed'
  },
  {
    name: 'Black Myth: Wukong',
    type: 'Action • Adventure',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/'
  },
  {
    name: 'Call of Duty',
    type: 'Shooter • Multiplayer',
    category: 'Action',
    image: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg',
    rating: '4.7',
    size: 'Launcher',
    downloadUrl: 'https://www.callofduty.com/'
  },
  {
    name: 'PUBG Battlegrounds',
    type: 'Battle Royale • Online',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/'
  },
  {
    name: 'Funnel Runners',
    type: 'Horror • Online',
    category: 'Adventure',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6aE-2DsZ7oUzh9A8FyWb3uWKjMEc4bfcqagUeOpyfVkxa84wIkpD65M&s=10',
    rating: '4.3',
    size: 'Game',
    downloadUrl: 'https://store.steampowered.com/'
  },
  {
    name: 'The Sims 4',
    type: 'Simulation • Life',
    category: 'Simulation',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://www.ea.com/games/the-sims/the-sims-4/buy'
  },
  {
    name: 'Stardew Valley',
    type: 'Farming • RPG',
    category: 'Simulation',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/413150/Stardew_Valley/'
  },
  {
    name: 'Terraria',
    type: 'Sandbox • Adventure',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/105600/Terraria/'
  },
  {
    name: 'Euro Truck Simulator 2',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/227300/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/'
  },
  {
    name: 'Trackmania',
    type: 'Racing • Time Attack',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2225070/header.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.trackmania.com/'
  },
  {
    name: 'Fall Guys',
    type: 'Party • Multiplayer',
    category: 'Casual',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.fallguys.com/'
  },
  {
    name: 'Brawlhalla',
    type: 'Fighting • Online',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/291550/header.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.brawlhalla.com/'
  },
  {
    name: 'Palworld',
    type: 'Survival • Open World',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1623730/Palworld/'
  },
  {
    name: 'Red Dead Redemption 2',
    type: 'Action • Open World',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/'
  },
  {
    name: 'The Witcher 3',
    type: 'RPG • Open World',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/'
  },
  {
    name: 'Cyberpunk 2077',
    type: 'RPG • Open World',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'
  },
  {
    name: 'Elden Ring',
    type: 'Action • RPG',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1245620/ELDEN_RING/'
  },
  {
    name: 'God of War',
    type: 'Action • Adventure',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1593500/God_of_War/'
  },
  {
    name: 'Hogwarts Legacy',
    type: 'Adventure • RPG',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/'
  },
  {
    name: 'Horizon Zero Dawn',
    type: 'Action • RPG',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1151640/Horizon_Zero_Dawn_Complete_Edition/'
  },
  {
    name: 'Days Gone',
    type: 'Action • Survival',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1259420/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1259420/Days_Gone/'
  },
  {
    name: 'Dying Light',
    type: 'Action • Survival',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/239140/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/239140/Dying_Light/'
  },
  {
    name: 'Left 4 Dead 2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/550/Left_4_Dead_2/'
  },
  {
    name: 'Apex Legends',
    type: 'FPS • Battle Royale',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/1172470/Apex_Legends/'
  },
  {
    name: 'Overwatch 2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://overwatch.blizzard.com/'
  },
  {
    name: 'Rainbow Six Siege',
    type: 'FPS • Tactical',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/'
  },
  {
    name: 'Rocket League',
    type: 'Sports • Racing',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://store.epicgames.com/en-US/p/rocket-league'
  },
  {
    name: 'F1 24',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/header.jpg',
    rating: '4.5',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/2488620/F1_24/'
  },
  {
    name: 'Assetto Corsa',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/244210/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/244210/Assetto_Corsa/'
  },
  {
    name: 'American Truck Simulator',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/270880/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/270880/American_Truck_Simulator/'
  },
  {
    name: 'BeamNG.drive',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/284160/BeamNGdrive/'
  },
  {
    name: 'DiRT Rally 2.0',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/690790/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/690790/DiRT_Rally_20/'
  },
  {
    name: 'Cities: Skylines',
    type: 'Building • Strategy',
    category: 'Strategy',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/255710/Cities_Skylines/'
  },
  {
    name: 'Civilization VI',
    type: 'Strategy • Turn-Based',
    category: 'Strategy',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/'
  },
  {
    name: 'Age of Empires IV',
    type: 'Strategy • RTS',
    category: 'Strategy',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1466860/Age_of_Empires_IV/'
  },
  {
    name: 'ARK: Survival Evolved',
    type: 'Survival • Open World',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/'
  },
  {
    name: 'Rust',
    type: 'Survival • Multiplayer',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/252490/Rust/'
  },
  {
    name: 'Raft',
    type: 'Survival • Adventure',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/648800/Raft/'
  },
  {
    name: 'Subnautica',
    type: 'Survival • Exploration',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/264710/Subnautica/'
  },
  {
    name: 'Hades',
    type: 'Action • RPG',
    category: 'Action',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1145360/Hades/'
  },
  {
    name: 'Hollow Knight',
    type: 'Adventure • Metroidvania',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/367520/Hollow_Knight/'
  },
  {
    name: 'Among Us',
    type: 'Party • Multiplayer',
    category: 'Casual',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/945360/Among_Us/'
  },
  {
    name: 'Human Fall Flat',
    type: 'Puzzle • Multiplayer',
    category: 'Casual',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/477160/header.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/477160/Human_Fall_Flat/'
  },
  {
    name: 'It Takes Two',
    type: 'Adventure • Co-op',
    category: 'Adventure',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1426210/It_Takes_Two/'
  }
];

const categories = [
  'Barchasi',
  'Action',
  'Adventure',
  'Racing',
  'Simulation',
  'Strategy',
  'Casual',
  'Other'
];



function gameSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}



function Games() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Barchasi');
  const [sort, setSort] = useState('popular');
  const [downloading, setDownloading] = useState('');
  const [savedGames, setSavedGames] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    category: 'Action',
    platform: 'PC',
    downloadUrl: '',
    rating: '4.5'
  });

  const loadSavedGames = async () => {
    try {
      const result = await getGames();
      setSavedGames(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(
        'Bazadagi o‘yinlarni yuklab bo‘lmadi:',
        error.message
      );
    }
  };

  useEffect(() => {
    loadSavedGames();
  }, []);

  const allGames = useMemo(() => {
    const mapped = savedGames.map((game) => ({
      ...game,
      type: game.description || game.platform || 'Yangi o‘yin',
      size: game.platform || 'PC',
      rating: String(game.rating ?? 0),
      downloadUrl: game.downloadUrl || '#',
      fromDatabase: true
    }));

    const savedNames = new Set(
      mapped.map((game) => game.name.toLowerCase())
    );

    return [
      ...mapped,
      ...games.filter(
        (game) => !savedNames.has(game.name.toLowerCase())
      )
    ];
  }, [savedGames]);

  const handleAddGame = async (event) => {
    event.preventDefault();

    setSaving(true);
    setFormError('');

    try {
      await createGame({
        name: form.name.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        category: form.category,
        platform: form.platform.trim() || null,
        downloadUrl: form.downloadUrl.trim() || '',
        rating: Number(form.rating)
      });

      await loadSavedGames();

      setForm({
        name: '',
        description: '',
        image: '',
        category: 'Action',
        platform: 'PC',
        downloadUrl: '',
        rating: '4.5'
      });

      setShowAddForm(false);
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
        error.message ||
        'O‘yin saqlanmadi. Backend va database ulanishini tekshiring.'
      );
    } finally {
      setSaving(false);
    }
  };

  const filteredGames = useMemo(() => {
    const result = allGames.filter((game) => {
      const searchText = `${game.name} ${game.type}`.toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());

      const matchesCategory =
        category === 'Barchasi' || game.category === category;

      return matchesQuery && matchesCategory;
    });

    if (sort === 'name') {
      return [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return [...result].sort(
      (a, b) => Number(b.rating) - Number(a.rating)
    );
  }, [allGames, query, category, sort]);

  const handleDownload = (game) => {
    if (!game.downloadUrl || game.downloadUrl === '#') {
      return;
    }

    setDownloading(game.name);

    setTimeout(() => {
      window.open(
        game.downloadUrl,
        '_blank',
        'noopener,noreferrer'
      );

      setDownloading('');
    }, 450);
  };

  return (
    <div className="page games-page">
      <div className="page-heading games-heading">
        <div>
          <p className="eyebrow">GAME LIBRARY</p>
          <h1>O'yinlar</h1>
          <p className="games-subtitle">
            Sevimli o'yinlaringizni toping va rasmiy manbadan
            yuklashni boshlang.
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowAddForm(true);
            setFormError('');
          }}
        >
          + Add Game
        </button>

        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="🔍 O'yin qidirish..."
        />
      </div>

      {showAddForm && (
        <div
          className="game-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !saving
            ) {
              setShowAddForm(false);
            }
          }}
        >
          <section
            className="game-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-game-title"
          >
            <div className="game-modal-header">
              <div>
                <p className="eyebrow">GAME LIBRARY</p>
                <h2 id="add-game-title">
                  Yangi o‘yin qo‘shish
                </h2>
                <p>O‘yin ma’lumotlarini kiriting.</p>
              </div>

              <button
                type="button"
                className="game-modal-close"
                aria-label="Yopish"
                onClick={() => {
                  if (!saving) setShowAddForm(false);
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddGame}
              className="game-add-form"
            >
              <label>
                O‘yin nomi
                <input
                  className="search"
                  required
                  minLength={2}
                  placeholder="Masalan, Minecraft"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value
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
                  placeholder="Adventure • Survival"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Rasm URL manzili
                <input
                  className="search"
                  required
                  type="url"
                  placeholder="https://example.com/game.jpg"
                  value={form.image}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      image: event.target.value
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
                      category: event.target.value
                    })
                  }
                >
                  <option>Action</option>
                  <option>Adventure</option>
                  <option>Racing</option>
                  <option>Simulation</option>
                  <option>Strategy</option>
                  <option>Casual</option>
                  <option>Other</option>
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
                      platform: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Yuklab olish URL manzili
                <input
                  className="search"
                  type="url"
                  placeholder="https://... (ixtiyoriy)"
                  value={form.downloadUrl}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      downloadUrl: event.target.value
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
                      rating: event.target.value
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
                  onClick={() => setShowAddForm(false)}
                >
                  Bekor qilish
                </button>

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? 'Saqlanmoqda...'
                    : '✓ O‘yinni saqlash'}
                </button>
              </div>

              <small>
                O‘yin database’ga saqlanadi va keyin ham
                ro‘yxatda qoladi.
              </small>
            </form>
          </section>
        </div>
      )}

      <div className="games-toolbar">
        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-btn ${category === item ? 'active' : ''
                }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="popular">Reyting bo'yicha</option>
          <option value="name">Nom bo'yicha</option>
        </select>
      </div>

      <div className="library-stats">
        <span>
          <b>{filteredGames.length}</b> ta o'yin
        </span>
        <span>✓ Rasmiy yuklash manbalari</span>
        <span>⚡ Tezkor kirish</span>
      </div>

      {filteredGames.length > 0 ? (
        <div className="game-grid large">
          {filteredGames.map((game) => (
            <article
              className="game-card enhanced-game-card game-card-clickable"
              key={game.id ?? game.name}
              role="link"
              tabIndex={0}
              aria-label={`${game.name} haqida batafsil`}
              onClick={() =>
                navigate(`/games/${gameSlug(game.name)}`)
              }
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  navigate(`/games/${gameSlug(game.name)}`);
                }
              }}
            >
              <div className="game-cover">
                {game.image ? (
                  <img src={game.image} alt={game.name} />
                ) : (
                  <div className="emoji-cover" aria-hidden="true">
                    {game.emoji || '🎮'}
                  </div>
                )}

                <span className="rating-badge">
                  ★ {game.rating}
                </span>
              </div>

              <div className="game-info">
                <div className="game-title-row">
                  <h3>{game.name}</h3>
                  <span className="game-size">
                    {game.size}
                  </span>
                </div>

                <p>{game.type}</p>

                <button
                  type="button"
                  className="primary-btn download-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDownload(game);
                  }}
                  disabled={
                    downloading === game.name ||
                    !game.downloadUrl ||
                    game.downloadUrl === '#'
                  }
                >
                  {downloading === game.name
                    ? '⏳ Tayyorlanmoqda...'
                    : 'Download ⬇'}
                </button>

                <small className="official-note">
                  Rasmiy manbaga yo'naltiradi
                </small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-page game-empty">
          <div>🔎</div>
          <h2>O'yin topilmadi</h2>
          <p>
            Boshqa nom yoki kategoriya bilan qidirib ko'ring.
          </p>
        </div>
      )}
    </div>
  );
}

export default Games;