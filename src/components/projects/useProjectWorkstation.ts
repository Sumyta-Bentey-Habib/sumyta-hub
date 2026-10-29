'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import { useReducedMotion } from '@/utils/useReducedMotion';

export interface UseProjectWorkstationResult {
  readonly activeProjectIndex: number;
  readonly isAutoPlaying: boolean;
  readonly prefersReducedMotion: boolean;
  readonly handleSelectProject: (index: number) => void;
  readonly handleToggleAuto: () => void;
  readonly sectionRef: React.RefObject<HTMLElement | null>;
}

export function useProjectWorkstation(): UseProjectWorkstationResult {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [userAutoPreference, setUserAutoPreference] = useState<boolean | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeIndexRef = useRef(activeProjectIndex);

  useEffect(() => {
    activeIndexRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const total = projects.length;

  const prefersReducedMotion = useReducedMotion();

  const isAutoEnabled = userAutoPreference !== null ? userAutoPreference : !prefersReducedMotion;


  const isAutoPlaying =
    isAutoEnabled &&
    isSectionVisible &&
    isTabVisible &&
    !isUserInteracting;

 
  const handleSelectProject = useCallback((index: number) => {
    setActiveProjectIndex(index);
    setIsUserInteracting(true);

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, PROJECTS_DATA.idleResumeDelayMs);
  }, []);

  // Explicit user toggle for auto/manual mode
  const handleToggleAuto = useCallback(() => {
    setUserAutoPreference((prev) => {
      const current = prev !== null ? prev : !prefersReducedMotion;
      const next = !current;
      if (next) {
        setIsUserInteracting(false);
      }
      return next;
    });
  }, [prefersReducedMotion]);

  // IntersectionObserver to pause when section leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Document tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Automatic cycle timer (single timer, only active when isAutoPlaying)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % total);
    }, PROJECTS_DATA.autoIntervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoPlaying, total]);

  // Clean up idle timeout on unmount
  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Global keyboard navigation (ArrowLeft / ArrowRight) with defaultPrevented check
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleSelectProject((activeIndexRef.current + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        handleSelectProject((activeIndexRef.current - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSelectProject, total]);

  return {
    activeProjectIndex,
    isAutoPlaying,
    prefersReducedMotion,
    handleSelectProject,
    handleToggleAuto,
    sectionRef,
  };
}
