import { useMemo, useState } from 'react';

const games = [
  {
    name: 'Minecraft',
    type: 'Adventure • Survival',
    category: 'Adventure',
    image: '/games/minecraft.jpg',
    rating: '4.9',
    size: 'Launcher',
    downloadUrl: 'https://www.minecraft.net/en-us/download/'
  },
  {
    name: 'CS2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: '/games/CS2.jpg',
    rating: '4.8',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/730/CounterStrike_2/'
  },
  {
    name: 'Valorant',
    type: 'FPS • Competitive',
    category: 'Action',
    image: '/games/valorant.jpg',
    rating: '4.8',
    size: 'Free',
    downloadUrl: 'https://playvalorant.com/en-us/download/'
  },
  {
    name: 'Forza Horizon 5',
    type: 'Racing • Open World',
    category: 'Racing',
    image: '/games/forza-horizon-5.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/'
  },
  {
    name: 'GTA V',
    type: 'Action • Open World',
    category: 'Action',
    image: '/games/gta-v.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.rockstargames.com/game/buy-gta-v'
  },
  {
    name: 'Roblox',
    type: 'Adventure • Online',
    category: 'Adventure',
    image: '/games/roblox.jpg',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://www.roblox.com/download'
  },
  {
    name: 'Dota 2',
    type: 'MOBA • Multiplayer',
    category: 'Strategy',
    image: '/games/Dota-2.jpg',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/570/Dota_2/'
  },
  {
    name: 'Need for Speed',
    type: 'Racing • Open World',
    category: 'Racing',
    image: '/games/NFS.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://www.ea.com/games/need-for-speed'
  },
  {
    name: 'Black Myth: Wukong',
    type: 'Action • Adventure',
    category: 'Adventure',
    image: '/games/Wukong.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/'
  },
  {
    name: 'Call of Duty',
    type: 'Shooter • Multiplayer',
    category: 'Action',
    image: '/games/COD.jpg',
    rating: '4.7',
    size: 'Launcher',
    downloadUrl: 'https://www.callofduty.com/'
  },
  {
    name: 'PUBG Battlegrounds',
    type: 'Battle Royale • Online',
    category: 'Action',
    image: '/games/PUBG.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/'
  },
  {
    name: 'Funnel Runners',
    type: 'Horror • Online',
    category: 'Adventure',
    image: '/games/FR.jpg',
    rating: '4.3',
    size: 'Game',
    downloadUrl: 'https://store.steampowered.com/'
  },
  {
    name: 'The Sims 4',
    type: 'Simulation • Life',
    category: 'Simulation',
    image: '/games/The-Sims-4.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://www.ea.com/games/the-sims/the-sims-4/buy'
  },
  {
    name: 'Stardew Valley',
    type: 'Farming • RPG',
    category: 'Simulation',
    image: '/games/images.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/413150/Stardew_Valley/'
  },
  {
    name: 'Terraria',
    type: 'Sandbox • Adventure',
    category: 'Adventure',
    image: '/games/Terraria.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/105600/Terraria/'
  },
  {
    name: 'Euro Truck Simulator 2',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: '/games/ETS.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/'
  },
  {
    name: 'Trackmania',
    type: 'Racing • Time Attack',
    category: 'Racing',
    image: '/games/Trackmania.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.trackmania.com/'
  },
  {
    name: 'Fall Guys',
    type: 'Party • Multiplayer',
    category: 'Casual',
    image: '/games/Fall-Guys.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.fallguys.com/'
  },
  {
    name: 'Brawlhalla',
    type: 'Fighting • Online',
    category: 'Action',
    image: '/games/Brawlhalla.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://www.brawlhalla.com/'
  },
  {
    name: 'Palworld',
    type: 'Survival • Open World',
    category: 'Adventure',
    image: '/games/Palworld.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1623730/Palworld/'
  },
  {
    name: 'Red Dead Redemption 2',
    type: 'Action • Open World',
    category: 'Action',
    image: '/games/rdr2.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/'
  },
  {
    name: 'The Witcher 3',
    type: 'RPG • Open World',
    category: 'Adventure',
    image: '/games/witcher-3.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/'
  },
  {
    name: 'Cyberpunk 2077',
    type: 'RPG • Open World',
    category: 'Action',
    image: '/games/cyberpunk-2077.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'
  },
  {
    name: 'Elden Ring',
    type: 'Action • RPG',
    category: 'Adventure',
    image: '/games/elden-ring.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1245620/ELDEN_RING/'
  },
  {
    name: 'God of War',
    type: 'Action • Adventure',
    category: 'Action',
    image: '/games/god-of-war.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1593500/God_of_War/'
  },
  {
    name: 'Hogwarts Legacy',
    type: 'Adventure • RPG',
    category: 'Adventure',
    image: '/games/hogwarts-legacy.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/'
  },
  {
    name: 'Horizon Zero Dawn',
    type: 'Action • RPG',
    category: 'Adventure',
    image: '/games/horizon-zero-dawn.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1151640/Horizon_Zero_Dawn_Complete_Edition/'
  },
  {
    name: 'Days Gone',
    type: 'Action • Survival',
    category: 'Action',
    image: '/games/days-gone.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1259420/Days_Gone/'
  },
  {
    name: 'Dying Light',
    type: 'Action • Survival',
    category: 'Action',
    image: '/games/dying-light.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/239140/Dying_Light/'
  },
  {
    name: 'Left 4 Dead 2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: '/games/left-4-dead-2.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/550/Left_4_Dead_2/'
  },
  {
    name: 'Apex Legends',
    type: 'FPS • Battle Royale',
    category: 'Action',
    image: '/games/apex-legends.jpg',
    rating: '4.6',
    size: 'Free',
    downloadUrl: 'https://store.steampowered.com/app/1172470/Apex_Legends/'
  },
  {
    name: 'Overwatch 2',
    type: 'FPS • Multiplayer',
    category: 'Action',
    image: '/games/overwatch-2.jpg',
    rating: '4.5',
    size: 'Free',
    downloadUrl: 'https://overwatch.blizzard.com/'
  },
  {
    name: 'Rainbow Six Siege',
    type: 'FPS • Tactical',
    category: 'Action',
    image: '/games/rainbow-six-siege.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/'
  },
  {
    name: 'Rocket League',
    type: 'Sports • Racing',
    category: 'Racing',
    image: '/games/rocket-league.jpg',
    rating: '4.7',
    size: 'Free',
    downloadUrl: 'https://store.epicgames.com/en-US/p/rocket-league'
  },
  {
    name: 'F1 24',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: '/games/f1-24.jpg',
    rating: '4.5',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/2488620/F1_24/'
  },
  {
    name: 'Assetto Corsa',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: '/games/assetto-corsa.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/244210/Assetto_Corsa/'
  },
  {
    name: 'American Truck Simulator',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: '/games/american-truck-simulator.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/270880/American_Truck_Simulator/'
  },
  {
    name: 'BeamNG.drive',
    type: 'Driving • Simulation',
    category: 'Racing',
    image: '/games/beamng-drive.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/284160/BeamNGdrive/'
  },
  {
    name: 'DiRT Rally 2.0',
    type: 'Racing • Simulation',
    category: 'Racing',
    image: '/games/dirt-rally-2.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/690790/DiRT_Rally_20/'
  },
  {
    name: 'Cities: Skylines',
    type: 'Building • Strategy',
    category: 'Strategy',
    image: '/games/cities-skylines.jpg',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/255710/Cities_Skylines/'
  },
  {
    name: 'Civilization VI',
    type: 'Strategy • Turn-Based',
    category: 'Strategy',
    image: '/games/civilization-6.avif',
    rating: '4.8',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/'
  },
  {
    name: 'Age of Empires IV',
    type: 'Strategy • RTS',
    category: 'Strategy',
    image: '/games/age-of-empires-4.webp',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1466860/Age_of_Empires_IV/'
  },
  {
    name: 'ARK: Survival Evolved',
    type: 'Survival • Open World',
    category: 'Adventure',
    image: '/games/ark-survival-evolved.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/'
  },
  {
    name: 'Rust',
    type: 'Survival • Multiplayer',
    category: 'Adventure',
    image: '/games/rust.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/252490/Rust/'
  },
  {
    name: 'Raft',
    type: 'Survival • Adventure',
    category: 'Adventure',
    image: '/games/raft.jpg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/648800/Raft/'
  },
  {
    name: 'Subnautica',
    type: 'Survival • Exploration',
    category: 'Adventure',
    image: '/games/subnautica.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/264710/Subnautica/'
  },
  {
    name: 'Hades',
    type: 'Action • RPG',
    category: 'Action',
    image: '/games/hades.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1145360/Hades/'
  },
  {
    name: 'Hollow Knight',
    type: 'Adventure • Metroidvania',
    category: 'Adventure',
    image: '/games/hollow-knight.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/367520/Hollow_Knight/'
  },
  {
    name: 'Among Us',
    type: 'Party • Multiplayer',
    category: 'Casual',
    image: '/games/among-us.jpg',
    rating: '4.6',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/945360/Among_Us/'
  },
  {
    name: 'Human Fall Flat',
    type: 'Puzzle • Multiplayer',
    category: 'Casual',
    image: '/games/human-fall-flat.jpeg',
    rating: '4.7',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/477160/Human_Fall_Flat/'
  },
  {
    name: 'It Takes Two',
    type: 'Adventure • Co-op',
    category: 'Adventure',
    image: '/games/it-takes-two.jpg',
    rating: '4.9',
    size: 'Store',
    downloadUrl: 'https://store.steampowered.com/app/1426210/It_Takes_Two/'
  },
];

const categories = ['Barchasi', 'Action', 'Adventure', 'Racing', 'Simulation', 'Strategy', 'Casual'];

function Games() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Barchasi');
  const [sort, setSort] = useState('popular');
  const [downloading, setDownloading] = useState('');

  const filteredGames = useMemo(() => {
    const result = games.filter((game) => {
      const matchesQuery = `${game.name} ${game.type}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'Barchasi' || game.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === 'name') return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
  }, [query, category, sort]);

  const handleDownload = (game) => {
    setDownloading(game.name);
    setTimeout(() => {
      window.open(game.downloadUrl, '_blank', 'noopener,noreferrer');
      setDownloading('');
    }, 450);
  };

  return (
    <div className="page games-page">
      <div className="page-heading games-heading">
        <div>
          <p className="eyebrow">GAME LIBRARY</p>
          <h1>O'yinlar</h1>
          <p className="games-subtitle">Sevimli o'yinlaringizni toping va rasmiy manbadan yuklashni boshlang.</p>
        </div>

        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="🔍 O'yin qidirish..."
        />
      </div>

      <div className="games-toolbar">
        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-btn ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="popular">Reyting bo'yicha</option>
          <option value="name">Nom bo'yicha</option>
        </select>
      </div>

      <div className="library-stats">
        <span><b>{filteredGames.length}</b> ta o'yin</span>
        <span>✓ Rasmiy yuklash manbalari</span>
        <span>⚡ Tezkor kirish</span>
      </div>

      {filteredGames.length > 0 ? (
        <div className="game-grid large">
          {filteredGames.map((game) => (
            <article className="game-card enhanced-game-card" key={game.name}>
              <div className="game-cover">
                {game.image ? (
                  <img src={game.image} alt={game.name} />
                ) : (
                  <div className="emoji-cover" aria-hidden="true">{game.emoji}</div>
                )}
                <span className="rating-badge">★ {game.rating}</span>
              </div>

              <div className="game-info">
                <div className="game-title-row">
                  <h3>{game.name}</h3>
                  <span className="game-size">{game.size}</span>
                </div>
                <p>{game.type}</p>
                <button
                  type="button"
                  className="primary-btn download-btn"
                  onClick={() => handleDownload(game)}
                  disabled={downloading === game.name}
                >
                  {downloading === game.name ? '⏳ Tayyorlanmoqda...' : 'Download ⬇'}
                </button>
                <small className="official-note">Rasmiy manbaga yo'naltiradi</small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-page game-empty">
          <div>🔎</div>
          <h2>O'yin topilmadi</h2>
          <p>Boshqa nom yoki kategoriya bilan qidirib ko'ring.</p>
        </div>
      )}
    </div>
  );
}

export default Games;
