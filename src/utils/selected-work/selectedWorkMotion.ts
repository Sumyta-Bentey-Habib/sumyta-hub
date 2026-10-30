import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SelectedWorkMotionElements {
  readonly section: HTMLElement | null;
  readonly header: HTMLDivElement | null;
  readonly cardsContainer: HTMLDivElement | null;
  readonly banner: HTMLDivElement | null;
}

export function initSelectedWorkScrollAnimations(elements: SelectedWorkMotionElements): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!elements.section) return;

    if (elements.header) {
      gsap.fromTo(
        elements.header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.header,
            start: 'top 85%',
          },
        }
      );
    }

    if (elements.cardsContainer) {
      const cards = elements.cardsContainer.querySelectorAll('.selected-work-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.cardsContainer,
            start: 'top 80%',
          },
        }
      );
    }

    if (elements.banner) {
      gsap.fromTo(
        elements.banner,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.banner,
            start: 'top 90%',
          },
        }
      );
    }
  });

  return () => mm.revert();
}

