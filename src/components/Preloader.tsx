'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Counter animation
      const counterTarget = { value: 0 };
      gsap.to(counterTarget, {
        value: 100,
        duration: 2.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterTarget.value));
        },
      });

      // Progress bar animation
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: 'power3.inOut',
      });

      // Final disappearance animation
      const tl = gsap.timeline({
        delay: 2.7,
        onComplete: () => {
          document.body.style.overflow = 'auto';
          onComplete();
        },
      });

      tl.to(counterRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in',
      })
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.2,
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
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div 
        ref={counterRef}
        className="relative"
      >
        <span className="text-[12rem] md:text-[20rem] font-headline font-black text-white leading-none tracking-tighter">
          {count.toString().padStart(3, '0')}
        </span>
        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-headline font-bold uppercase tracking-[0.4em] text-sm">
            Initializing System
          </span>
          <span className="text-secondary font-mono text-sm">
            {count}%
          </span>
        </div>
      </div>
      
      {/* Brutalist Progress Bar */}
      <div className="absolute bottom-12 left-0 w-full px-6 md:px-12">
        <div className="h-1 bg-surface-variant w-full relative">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-primary origin-left scale-x-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
