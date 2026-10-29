'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { COLOR_TOKENS } from '@/utils/constants';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;


    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      setDotX(clientX);
      setDotY(clientY);
      setRingX(clientX);
      setRingY(clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    const onPointerDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.15 });
    };

    const onPointerUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25 });
    };

    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select, .interactive-hover')) {
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: 'rgba(255, 141, 144, 0.15)',
          borderColor: COLOR_TOKENS.primary,
          duration: 0.3,
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select, .interactive-hover')) {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 141, 144, 0.4)',
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={styles.cursorContainer}
    >
      {/* Small inner dot */}
      <div
        ref={dotRef}
        className={styles.cursorDot}
      />
      {/* Larger trailing ring */}
      <div
        ref={ringRef}
        className={styles.cursorRing}
      />
    </div>
  );
};


export default CustomCursor;
