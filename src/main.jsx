import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const agents = [
  {
    id: 'zip', name: 'Zip', role: 'The Builder', status: 'working', statusLabel: 'Working',
    task: 'Putting the finishing touches on a search fix.', detail: 'Zip is making steady progress on a small Product task. The sample status is just for this demo.',
    color: '#67a4ff', tint: '#eaf2ff', initials: 'Z', decoration: 'tool'
  },
  {
    id: 'momo', name: 'Momo', role: 'The Finisher', status: 'complete', statusLabel: 'All done',
    task: 'Wrapped up the keyboard-friendly clear button.', detail: 'Momo finished a sample task and is ready for the next one. Nothing here is connected to a live project.',
    color: '#49c895', tint: '#e4f8ef', initials: 'M', decoration: 'spark'
  },
  {
    id: 'pip', name: 'Pip', role: 'The Lookout', status: 'attention', statusLabel: 'Needs attention',
    task: 'Waiting for a person to choose the next step.', detail: 'Pip has reached a decision point and is waiting for human direction. The card does not approve or execute anything.',
    color: '#f1a34f', tint: '#fff1df', initials: 'P', decoration: 'alert'
  },
  {
    id: 'lulu', name: 'Lulu', role: 'The Daydreamer', status: 'idle', statusLabel: 'Taking a breather',
    task: 'Ready when there’s something useful to do.', detail: 'Lulu is idle by design. Routine work should not need a human approval just to keep an agent busy.',
    color: '#a68be9', tint: '#f0eaff', initials: 'L', decoration: 'moon'
  }
];

const filters = [
  { id: 'all', label: 'All buddies' },
  { id: 'working', label: 'Working' },
  { id: 'complete', label: 'Completed' },
  { id: 'attention', label: 'Needs attention' },
  { id: 'idle', label: 'Idle' }
];

function App() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState('zip');
  const [wavingId, setWavingId] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const visibleAgents = agents.filter((agent) => filter === 'all' || agent.status === filter);
  const selectedAgent = agents.find((agent) => agent.id === selectedId);

  function wave(agent) {
    setSelectedId(agent.id);
    setWavingId(agent.id);
    setAnnouncement(`${agent.name} waves hello!`);
    window.setTimeout(() => setWavingId(''), 850);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Ziki Agent Buddies home">
          <span className="z-mark" aria-hidden="true"><i /><b /></span>
          <span>ziki</span>
        </a>
        <span className="topbar-divider" aria-hidden="true" />
        <span className="product-label">Agent Buddies</span>
        <span className="sample-label"><span /> Sample crew</span>
      </header>

      <section className="intro" id="home" aria-labelledby="page-title">
        <span className="eyebrow"><span className="eyebrow-star" aria-hidden="true">✳</span> A LITTLE TEAMWORK, A LITTLE PERSONALITY</span>
        <h1 id="page-title">Meet your <span>Agent Buddies.</span></h1>
        <p className="intro-copy">Small helpers, big can-do energy. See who’s working, who’s wrapped up, and who could use a human hand.</p>
        <p className="demo-note"><span className="note-dot" /> A playful concept with sample activity · No live Ziki connection</p>
      </section>

      <section className="crew-section" aria-labelledby="crew-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">YOUR CREW</span>
            <h2 id="crew-title">Four buddies. One good rhythm.</h2>
          </div>
          <span className="crew-count">04 <span>buddies</span></span>
        </div>

        <div className="filter-row" role="group" aria-label="Filter buddies by status">
          {filters.map((item) => (
            <button key={item.id} type="button" className={`filter-chip ${filter === item.id ? 'active' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
              {item.id !== 'all' && <span className={`filter-dot ${item.id}`} aria-hidden="true" />}
              {item.label}
            </button>
          ))}
        </div>

        <div className="buddy-grid" aria-live="polite">
          {visibleAgents.map((agent) => (
            <button key={agent.id} type="button" className={`buddy-card ${agent.status} ${selectedId === agent.id ? 'selected' : ''}`} aria-pressed={selectedId === agent.id} onClick={() => setSelectedId(agent.id)}>
              <span className="card-topline"><span className={`status-pill ${agent.status}`}><i aria-hidden="true" />{agent.statusLabel}</span><span className="card-spark" aria-hidden="true">✳</span></span>
              <BuddyArt agent={agent} waving={wavingId === agent.id} />
              <span className="buddy-name">{agent.name}</span>
              <span className="buddy-role">{agent.role}</span>
              <span className="buddy-task">{agent.task}</span>
              <span className="card-hint">Select buddy <span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
        {visibleAgents.length === 0 && <div className="empty-state">No buddies in this status right now.</div>}
      </section>

      {selectedAgent && (
        <section className="buddy-detail" aria-labelledby="detail-title">
          <BuddyArt agent={selectedAgent} waving={wavingId === selectedAgent.id} compact />
          <div className="detail-copy">
            <span className="detail-kicker">A NOTE FROM THE CREW</span>
            <h2 id="detail-title">A little hello from {selectedAgent.name}</h2>
            <p>{selectedAgent.detail}</p>
          </div>
          <button className="wave-button" type="button" onClick={() => wave(selectedAgent)}><span aria-hidden="true">✦</span> Give {selectedAgent.name} a wave</button>
        </section>
      )}

      <footer className="footer-note"><span>Made for the human + agent team.</span><span>Be kind. Ship thoughtfully.</span></footer>
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
    </main>
  );
}

function BuddyArt({ agent, waving, compact = false }) {
  return (
    <span className={`buddy-art ${agent.decoration} ${waving ? 'waving' : ''} ${compact ? 'compact' : ''}`} style={{ '--buddy': agent.color, '--buddy-tint': agent.tint }} aria-hidden="true">
      <svg viewBox="0 0 180 150" focusable="false">
        <ellipse className="buddy-shadow" cx="90" cy="137" rx="45" ry="7" />
        {agent.decoration === 'tool' && <g className="antenna"><path d="M90 33V19"/><circle cx="90" cy="15" r="6"/></g>}
        {agent.decoration === 'spark' && <g className="ear-pieces"><rect x="31" y="72" width="15" height="30" rx="7"/><rect x="134" y="72" width="15" height="30" rx="7"/></g>}
        {agent.decoration === 'alert' && <g className="antenna"><path d="M90 36V24"/><path d="M90 18l7 8H83z"/></g>}
        {agent.decoration === 'moon' && <g className="moon-stars"><path d="M139 36c-8 2-11 11-6 17 4 5 11 5 15 1-7 1-12-6-9-12 1-3 3-5 6-6-2-1-4-1-6 0z"/><circle cx="48" cy="44" r="3"/><path d="M129 76v9m-4-4h8"/></g>}
        {agent.decoration === 'spark' ? <path className="buddy-body star-body" d="M90 31c8 0 11 13 17 17s20 2 23 10-7 17-7 24 9 17 5 24-19 7-26 12-9 19-18 19-13-13-20-18-22-3-26-11 6-18 6-26-9-19-5-26 20-6 27-11 15-14 24-14z"/> : <path className={`buddy-body body-${agent.decoration}`} d={agent.decoration === 'tool' ? 'M51 58c0-14 12-25 27-25h24c15 0 27 11 27 25v45c0 16-13 29-29 29H80c-16 0-29-13-29-29z' : agent.decoration === 'alert' ? 'M57 51c9-10 20-14 33-14s24 4 33 14c7 8 10 19 10 32v20c0 18-13 31-31 31H78c-18 0-31-13-31-31V83c0-13 3-24 10-32z' : 'M54 55c0-17 14-30 31-30h10c17 0 31 13 31 30v46c0 19-13 32-32 32H86c-19 0-32-13-32-32z'} />}
        <path className="face-shade" d="M64 56c6-9 15-13 27-13h2c-15 5-20 15-20 29v25c0 14 7 25 19 34-19-1-30-12-30-29V79c0-9 0-16 2-23z"/>
        <g className="face">
          {agent.decoration === 'moon' ? <><path d="M73 81q7 7 14 0"/><path d="M99 81q7 7 14 0"/></> : agent.decoration === 'spark' ? <><circle cx="75" cy="78" r="4"/><circle cx="105" cy="78" r="4"/></> : <><ellipse cx="75" cy="78" rx="4" ry="6"/><ellipse cx="105" cy="78" rx="4" ry="6"/></>}
          {agent.decoration === 'alert' ? <path d="M84 99h12m-6-7v8"/> : <path d="M82 98q8 8 16 0"/>}
        </g>
        {agent.decoration === 'tool' && <g className="tool-bits"><path d="M44 57l-8-6m100 7 8-6"/><circle cx="37" cy="50" r="3"/><circle cx="145" cy="50" r="3"/></g>}
        {agent.decoration === 'spark' && <g className="confetti"><path d="M36 47l5-5m96 8 5-5M42 112l-5 5m99-6 5 5"/><path d="M90 16v8m-4-4h8"/></g>}
        {agent.decoration === 'alert' && <g className="alert-mark"><circle cx="137" cy="48" r="13"/><path d="M137 41v8m0 5v1"/></g>}
      </svg>
    </span>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
