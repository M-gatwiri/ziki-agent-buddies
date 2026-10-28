import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const mascotRef = useRef(null);
  const [helloCount, setHelloCount] = useState(0);
  const [isHello, setIsHello] = useState(false);

  useEffect(() => {
    const followPointer = (event) => {
      if (event.pointerType === 'touch' || !mascotRef.current) return;

      const bounds = mascotRef.current.getBoundingClientRect();
      const x = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
      const y = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
      mascotRef.current.style.setProperty('--look-x', `${Math.max(-3, Math.min(3, x * 3))}px`);
      mascotRef.current.style.setProperty('--look-y', `${Math.max(-2, Math.min(2, y * 2))}px`);
    };

    const resetGaze = () => {
      mascotRef.current?.style.setProperty('--look-x', '0px');
      mascotRef.current?.style.setProperty('--look-y', '0px');
    };

    window.addEventListener('pointermove', followPointer, { passive: true });
    window.addEventListener('blur', resetGaze);
    return () => {
      window.removeEventListener('pointermove', followPointer);
      window.removeEventListener('blur', resetGaze);
    };
  }, []);

  useEffect(() => {
    if (!isHello) return undefined;
    const timeout = window.setTimeout(() => setIsHello(false), 850);
    return () => window.clearTimeout(timeout);
  }, [helloCount, isHello]);

  function sayHello() {
    setHelloCount((count) => count + 1);
    setIsHello(true);
  }

  return (
    <main className="stage">
      <a className="wordmark" href="#home" aria-label="Ziki home">
        <span className="z-mark" aria-hidden="true"><i /><b /></span>
        <span>ziki</span>
      </a>

      <section className="hello" id="home" aria-labelledby="hello-title">
        <p className="eyebrow">A LITTLE HELLO FROM ZIKI</p>
        <h1 id="hello-title">Here with you.</h1>
        <p className="intro">A small helper, keeping an eye on things.</p>

        <button
          ref={mascotRef}
          className={`mascot ${isHello ? 'is-hello' : ''}`}
          type="button"
          onClick={sayHello}
          aria-label="Say hello to the little agent"
          aria-describedby="mascot-hint"
        >
          <svg viewBox="0 0 240 230" aria-hidden="true" focusable="false">
            <ellipse className="shadow" cx="120" cy="207" rx="60" ry="9" />
            <path className="antenna" d="M120 39V25" />
            <circle className="antenna-tip" cx="120" cy="20" r="8" />
            <path className="ear" d="M55 91c-16-3-24 7-24 21 0 12 8 20 22 19m152-40c16-3 24 7 24 21 0 12-8 20-22 19" />
            <rect className="body" x="49" y="47" width="142" height="145" rx="54" />
            <path className="shine" d="M68 78c8-17 21-24 38-25" />
            <g className="eyes">
              <ellipse cx="94" cy="111" rx="10" ry="13" />
              <ellipse cx="146" cy="111" rx="10" ry="13" />
            </g>
            <g className="pupils">
              <circle cx="94" cy="112" r="5" />
              <circle cx="146" cy="112" r="5" />
            </g>
            <path className="mouth" d="M106 142q14 13 28 0" />
            <circle className="cheek cheek-left" cx="73" cy="137" r="7" />
            <circle className="cheek cheek-right" cx="167" cy="137" r="7" />
            <g className="sparkles">
              <path d="M34 55v14m-7-7h14" />
              <path d="M203 47v12m-6-6h12" />
              <path d="M205 162v10m-5-5h10" />
            </g>
          </svg>
          <span className="sr-only">Say hello</span>
        </button>

        <p className="hint" id="mascot-hint">Give me a little tap.</p>
        <p className="sr-only" role="status" aria-live="polite">
          {isHello ? 'The little agent says hello!' : ''}
        </p>
      </section>

      <p className="footnote">A thoughtful little presence, whenever you need it.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
