import { useUser } from '@clerk/react';

const games = [
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
];

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="page dashboard-page">

      <section className="welcome-card">
        <div>
          <p className="eyebrow">GAMEVERSE</p>

          <h1>
            Xush kelibsiz,{' '}
            {user?.firstName ||
              user?.username ||
              'Player'}!
          </h1>

          <p>
            Bugun qaysi o'yinni o'ynaymiz?
          </p>
        </div>

        <div className="welcome-icon">
          🎮
        </div>
      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <b>12</b>
          <span>O'yinlar</span>
        </div>

        <div className="stat-card">
          <b>5</b>
          <span>Sevimlilar</span>
        </div>

        <div className="stat-card">
          <b>3</b>
          <span>Do'stlar</span>
        </div>

      </section>

      <section>

        <div className="section-title">
          <h2>Mashhur o'yinlar</h2>
          <span>Bugungi tanlov</span>
        </div>

        <div className="game-grid">

          {games.map((game) => (
            <article
              className="game-card"
              key={game.name}
            >

              <div className="game-cover">
                <img
                  src={game.image}
                  alt={game.name}
                />
              </div>

              <h3>{game.name}</h3>

              <p>{game.type}</p>

              <a
                href={game.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn download-btn"
              >
                Download
              </a>

            </article>
          ))}

        </div>

      </section>

      <section className="activity-card">

        <div>
          <span className="status-dot" />
          So'nggi faoliyat
        </div>

        <p>
          GameVerse profilingiz tayyor.
          Endi o'yinlarni tanlashingiz mumkin.
        </p>

      </section>

    </div>
  );
}

export default Dashboard;