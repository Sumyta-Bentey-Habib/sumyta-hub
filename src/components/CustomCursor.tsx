'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Immediate move for the dot
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Trailing move for the ring
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });
    };

    const onPointerDown = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.1,
      });
    };

    const onPointerUp = () => {
      gsap.to(ring, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Global listeners for interactive elements
    const handleHoverStart = () => {
      gsap.to(ring, {
        scale: 2.5,
        backgroundColor: 'rgba(255, 141, 144, 0.2)',
        borderColor: 'rgba(255, 141, 144, 0.8)',
        duration: 0.4,
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
      });
    };

    const handleHoverEnd = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 141, 144, 0.4)',
        duration: 0.4,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // Initial state
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .group, h1, h2');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden lg:block">
      {/* Small inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-20"
      />
      {/* Larger trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/40 rounded-full z-10"
      />
    </div>
  );
};

export default CustomCursor;
