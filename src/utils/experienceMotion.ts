import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceMotionElements {
  readonly section: HTMLElement | null;
  readonly header: HTMLDivElement | null;
  readonly container: HTMLDivElement | null;
  readonly footer: HTMLDivElement | null;
}

/**
 * Initializes restrained GSAP ScrollTrigger reveals for the Experience section.
 * Automatically respects prefers-reduced-motion media query.
 */
export function initExperienceScrollAnimations(elements: ExperienceMotionElements): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!elements.section) return;

    // Header reveal
    if (elements.header) {
      gsap.fromTo(
        elements.header,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elements.header,
            start: 'top 85%',
          },
        }
      );
    }

    // District cards reveal
    if (elements.container) {
      const cards = elements.container.querySelectorAll('.district-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
            },
          }
        );
      });
    }

    // Footer note reveal
    if (elements.footer) {
      gsap.fromTo(
        elements.footer,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.footer,
            start: 'top 90%',
          },
        }
      );
    }
  });

  return () => mm.revert();
}
