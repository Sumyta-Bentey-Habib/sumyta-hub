import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceMotionElements {
  readonly section: HTMLElement | null;
  readonly header: HTMLDivElement | null;
  readonly container: HTMLDivElement | null;
  readonly footer: HTMLDivElement | null;
}


export function initExperienceScrollAnimations(elements: ExperienceMotionElements): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!elements.section) return;

    // Header reveal
    if (elements.header) {
      gsap.fromTo(
        elements.header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements.header,
            start: 'top 85%',
          },
        }
      );
    }

    // Experience milestones reveal
    if (elements.container) {
      const items = elements.container.querySelectorAll('.experience-milestone');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }

    // Footer note reveal (if separate)
    if (elements.footer) {
      gsap.fromTo(
        elements.footer,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
