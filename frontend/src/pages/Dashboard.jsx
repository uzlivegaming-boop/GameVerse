import { useUser } from '@clerk/react';

const games = [
  {
    name: 'Minecraft',
    type: 'Sandbox • Survival',
    image: '/games/minecraft.jpg',
    downloadUrl: 'https://www.minecraft.net/en-us/download/'
  },
  {
    name: 'CS2',
    type: 'FPS • Competitive',
    image: '/games/cs2.jpg',
    downloadUrl: 'https://store.steampowered.com/app/730/CounterStrike_2/'
  },
  {
    name: 'Forza Horizon 5',
    type: 'Racing • Open World',
    image: '/games/forza-horizon-5.jpg',
    downloadUrl: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/'
  },
  {
    name: 'GTA V',
    type: 'Action • Open World',
    image: '/games/gta-v.jpg',
    downloadUrl: 'https://store.rockstargames.com/game/buy-gta-v'
  },
  {
    name: 'Wukong',
    type: 'Action • Adventure',
    image: '/games/Wukong.jpg',
    downloadUrl: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/'
  },
  {
    name: 'Call of Duty',
    type: 'Shooter • Multiplayer',
    image: '/games/COD.jpg',
    downloadUrl: 'https://www.callofduty.com/'
  },
  {
    name: 'PUBG Battlegrounds',
    type: 'Battle Royale • Multiplayer',
    image: '/games/PUBG.jpg',
    downloadUrl: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/'
  },
  {
    name: 'Funnel Runners',
    type: 'Survival Horror • Online',
    image: '/games/FR.jpg',
    downloadUrl: 'https://store.steampowered.com/'
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