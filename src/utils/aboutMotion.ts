import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AboutMotionElements {
  readonly section: HTMLElement | null;
  readonly header: HTMLDivElement | null;
  readonly portrait: HTMLDivElement | null;
  readonly content: HTMLDivElement | null;
  readonly metadata: HTMLDivElement | null;
}


export function initAboutScrollAnimations(elements: AboutMotionElements): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!elements.section) return;

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

    if (elements.portrait) {
      gsap.fromTo(
        elements.portrait,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elements.portrait,
            start: 'top 80%',
          },
        }
      );
    }

    if (elements.content) {
      gsap.fromTo(
        elements.content,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: elements.content,
            start: 'top 80%',
          },
        }
      );
    }

    if (elements.metadata) {
      const items = elements.metadata.querySelectorAll('.meta-card');
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.metadata,
            start: 'top 85%',
          },
        }
      );
    }
  });

  return () => mm.revert();
}
