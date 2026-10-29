'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { PRELOADER_DATA } from '@/utils/constants';
import styles from './Preloader.module.css';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

 
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Counter animation
      const counterTarget = { value: 0 };
      gsap.to(counterTarget, {
        value: 100,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterTarget.value));
        },
      });

      // Progress bar animation
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 2.2,
        ease: 'power3.inOut',
      });

      // Final disappearance animation
      const tl = gsap.timeline({
        delay: 2.3,
        onComplete: () => {
          document.body.style.overflow = 'auto';
          onComplete();
        },
      });

      tl.to(counterRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.in',
      })
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.9,
        ease: 'expo.inOut',
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={styles.preloader}
      aria-live="polite"
      aria-label={PRELOADER_DATA.initializingTag}
    >
      <div
        ref={counterRef}
        className="relative"
      >
        <span className={styles.counterValue}>
          {count.toString().padStart(3, '0')}
        </span>
        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-headline font-bold uppercase tracking-[0.4em] text-sm">
            {count >= 100 ? PRELOADER_DATA.completeTag : PRELOADER_DATA.initializingTag}
          </span>
          <span className="text-secondary font-mono text-sm">
            {count}%
          </span>
        </div>
      </div>

      {/* Brutalist Progress Bar */}
      <div className={styles.progressBarTrack}>
        <div className={styles.progressBarBg}>
          <div
            ref={progressRef}
            className={styles.progressBarFill}
          />
        </div>
      </div>
    </div>
  );
};


export default Preloader;
