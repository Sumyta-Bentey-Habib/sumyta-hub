'use client';

import React, { useState, useRef } from 'react';

const Footer = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    setHasDragged(false);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    if (buttonRef.current) {
      buttonRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    
    // Calculate the distance moved to determine if it's a drag or a click
    const moveX = Math.abs(e.clientX - startPos.current.x - position.x);
    const moveY = Math.abs(e.clientY - startPos.current.y - position.y);
    if (moveX > 5 || moveY > 5) {
      setHasDragged(true);
    }

    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    if (buttonRef.current) {
      buttonRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full min-h-[614px] flex flex-col justify-end p-6 md:p-12 bg-surface-dim overflow-hidden" id="contact">
      <div className="w-full flex flex-col items-start">
        <div className="mb-24 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-8">
              Ready to evolve?
            </h2>
            <a
              className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-white hover:text-primary transition-colors duration-400 break-all"
              href="mailto:sumytabenteyhabib@gmail.com"
            >
              sumytabenteyhabib@gmail.com
            </a>
          </div>
          <div className="flex gap-12 font-headline text-[0.875rem] uppercase tracking-widest">
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="https://www.linkedin.com/in/sumytabenteyhabib/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="https://github.com/Sumyta-Bentey-Habib"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="mailto:sumytabenteyhabib@gmail.com"
            >
              Email
            </a>
          </div>
        </div>
        <div className="w-full border-t border-outline/10 pt-12 mt-12 flex flex-col md:flex-row justify-between gap-8">
          <div className="text-4xl font-black text-primary mb-8 font-headline tracking-tighter uppercase leading-none">
            S.B.H.
          </div>
          <p className="text-secondary font-headline text-[0.875rem] uppercase tracking-widest md:max-w-xs text-left md:text-right">
            © 2026 SUMYTA BENTEY HABIB. ENGINEERED FOR IMPACT.
          </p>
        </div>
      </div>

      {/* Go to Top Button */}
      <button 
        ref={buttonRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute bottom-6 right-6 md:bottom-12 md:right-12 px-6 h-12 bg-primary text-on-primary-fixed rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 z-10 font-headline font-bold uppercase tracking-widest text-xs md:text-sm ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'}`}
        aria-label="Go to top"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          touchAction: 'none'
        }}
      >
        <span>Click me to go top</span>
        <span className="material-symbols-outlined text-[1.2rem]">arrow_upward</span>
      </button>
    </footer>
  );
};

export default Footer;
