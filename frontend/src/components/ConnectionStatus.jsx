import { useEffect, useState } from 'react';

const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/$/, '');

function ConnectionStatus() {
  const [status, setStatus] = useState('checking');
  const [database, setDatabase] = useState('checking');

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        const result = await response.json();

        if (!active) return;

        setStatus(
          result?.data?.backend === 'connected'
            ? 'connected'
            : 'disconnected'
        );

        setDatabase(
          result?.data?.database === 'connected'
            ? 'connected'
            : 'disconnected'
        );
      } catch {
        if (!active) return;

        setStatus('disconnected');
        setDatabase('unknown');
      }
    };

    check();

    const interval = window.setInterval(check, 15000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const label =
    status === 'checking'
      ? 'Ulanish tekshirilmoqda...'
      : status === 'disconnected'
        ? 'Backend topilmadi — API URL ni tekshiring'
        : database === 'connected'
          ? 'Backend va database ulangan'
          : 'Backend ulangan, database bilan aloqa yo‘q';

  const color =
    status === 'checking'
      ? '#eab308'
      : status === 'disconnected' || database !== 'connected'
        ? '#ef4444'
        : '#22c55e';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderRadius: 12,
        background: 'var(--card-bg, #111827)',
        color: 'var(--text-color, #fff)',
        boxShadow: '0 6px 24px #0003',
        fontSize: 13
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: color,
          display: 'inline-block'
        }}
      />
      {label}
    </div>
  );
}

export default ConnectionStatus;