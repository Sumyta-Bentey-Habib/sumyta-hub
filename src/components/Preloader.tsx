'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { PRELOADER_DATA } from '@/utils/constants';
import {
  VIRTUAL_WIDTH,
  VIRTUAL_HEIGHT,
  initPreloaderScene,
  updatePreloaderScene,
  renderPreloaderScene,
} from '@/utils/preloader';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

const TOTAL_SEGMENTS = 20;

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const isCompletedRef = useRef(false);

  useEffect(() => {

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onComplete();
      return;
    }

    // Lock scroll during preloading
    document.body.style.overflow = 'hidden';


    const canvas = canvasRef.current;
    let animFrameId: number;
    let ctx2d: CanvasRenderingContext2D | null = null;
    const scene = initPreloaderScene();

    if (canvas) {
      ctx2d = canvas.getContext('2d');
      if (ctx2d) {
        ctx2d.imageSmoothingEnabled = false;
      }
    }

    const renderLoop = () => {
      if (ctx2d) {
        updatePreloaderScene(scene, countRef.current);
        renderPreloaderScene(ctx2d, scene, countRef.current);
      }
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);


    const gsapCtx = gsap.context(() => {
      const counterTarget = { value: 0 };

      const triggerExitSequence = () => {
        if (isCompletedRef.current) return;
        isCompletedRef.current = true;

        const exitTl = gsap.timeline({
          delay: 0.35,
          onComplete: () => {
            document.body.style.overflow = 'auto';
            onComplete();
          },
        });

        exitTl
          .to(uiRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.out',
          })
          .to(
            containerRef.current,
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              duration: 0.65,
              ease: 'steps(8)',
            },
            '-=0.1'
          );
      };

      const counterTween = gsap.to(counterTarget, {
        value: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.floor(counterTarget.value);
          countRef.current = currentVal;
          setCount(currentVal);
        },
        onComplete: () => {
          triggerExitSequence();
        },
      });

      // Genuine asset load listener
      const handleWindowLoad = () => {

        if (counterTween.progress() < 0.8) {
          gsap.to(counterTween, { timeScale: 2.0, duration: 0.4 });
        }
      };

      if (typeof document !== 'undefined') {
        if (document.readyState === 'complete') {
          handleWindowLoad();
        } else {
          window.addEventListener('load', handleWindowLoad, { once: true });
        }
      }


      const failsafeTimer = setTimeout(() => {
        if (!isCompletedRef.current) {
          counterTarget.value = 100;
          countRef.current = 100;
          setCount(100);
          triggerExitSequence();
        }
      }, 2800);

      return () => {
        clearTimeout(failsafeTimer);
        window.removeEventListener('load', handleWindowLoad);
      };
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      gsapCtx.revert();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  // Compute active segments for the 20-block pixel bar
  const activeSegments = Math.round((count / 100) * TOTAL_SEGMENTS);

  return (
    <div
      ref={containerRef}
      className={styles.preloader}
      aria-live="polite"
      aria-label={PRELOADER_DATA.sceneTitle}
    >
      {/* 16-Bit Pixel Canvas */}
      <canvas
        ref={canvasRef}
        width={VIRTUAL_WIDTH}
        height={VIRTUAL_HEIGHT}
        className={styles.pixelCanvas}
      />

      {/* CRT Scanline & Curved Vignette Overlays */}
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.crtVignette} aria-hidden="true" />

      {/* Retro HUD Interface */}
      <div ref={uiRef} className={styles.uiLayer}>
        {/* Top Header Telemetry */}
        <header className={styles.topBar}>
          <div className={styles.identity}>
            <span className={styles.name}>{PRELOADER_DATA.name}</span>
            <span className={styles.title}>{PRELOADER_DATA.title}</span>
          </div>

          <div className={styles.statusBadge}>
            <span
              className={`${styles.statusDot} ${count >= 100 ? styles.statusDotOnline : ''}`}
            />
            <span>{count >= 100 ? PRELOADER_DATA.statusOnline : PRELOADER_DATA.statusAwakening}</span>
          </div>
        </header>

        {/* Bottom HUD: Progress Bar & Skyline Status */}
        <footer className={styles.bottomHud}>
          <div className={styles.bottomHudHeader}>
            <span className={styles.sceneTitle}>{PRELOADER_DATA.sceneTitle}</span>
            <span className={styles.percentText}>[ {count}% ]</span>
          </div>

          {/* Stepped 20-segment pixel-art progress bar */}
          <div
            className={styles.pixelBarTrack}
            role="progressbar"
            aria-valuenow={count}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
              <div
                key={index}
                className={`${styles.pixelBarBlock} ${
                  index < activeSegments ? styles.pixelBarBlockActive : ''
                }`}
              />
            ))}
          </div>

          <div className={styles.bottomHudFooter}>
            <span>
              {count >= 100 ? PRELOADER_DATA.completeTag : PRELOADER_DATA.initializingTag}
            </span>
            <span className={styles.hudBlinker} aria-hidden="true" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Preloader;
