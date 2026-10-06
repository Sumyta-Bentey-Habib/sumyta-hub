'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItemElements {
  container: HTMLDivElement | null;
  number: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  subtitle: HTMLParagraphElement | null;
  role: HTMLDivElement | null;
  desc: HTMLParagraphElement | null;
  tech: HTMLDivElement | null;
  actions: HTMLDivElement | null;
  imgSliceTop: HTMLDivElement | null;
  imgSliceBottom: HTMLDivElement | null;
  visualWrap: HTMLDivElement | null;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isAssembled, setIsAssembled] = useState(false);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  const projects = PROJECTS_DATA.projects;
  const totalProjects = projects.length;

  // Refs for each project's individual elements initialized with empty slots
  const elementsRef = useRef<ProjectItemElements[]>(
    PROJECTS_DATA.projects.map(() => ({
      container: null,
      number: null,
      title: null,
      subtitle: null,
      role: null,
      desc: null,
      tech: null,
      actions: null,
      imgSliceTop: null,
      imgSliceBottom: null,
      visualWrap: null,
    }))
  );

  // Smooth scroll jump to a specific project
  const scrollToProject = useCallback(
    (targetIndex: number) => {
      if (!scrollTriggerInstance.current || totalProjects <= 1) return;
      const st = scrollTriggerInstance.current;
      // Scroll to the hold center of the target project
      const targetProgress = (targetIndex + 0.5) / totalProjects;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    },
    [totalProjects]
  );

  // Subtle pointer parallax on active visual
  const handleVisualMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const activeVisual = elementsRef.current[activeProjectIndex]?.visualWrap;
    if (!activeVisual) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(activeVisual, {
      x: xRatio * 16,
      y: yRatio * 12,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleVisualMouseLeave = () => {
    const activeVisual = elementsRef.current[activeProjectIndex]?.visualWrap;
    if (!activeVisual) return;
    gsap.to(activeVisual, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        isMobileOrReduced: '(max-width: 1023px), (prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop: canAnimateDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobileOrReduced: boolean;
        };

        if (canAnimateDesktop && sectionRef.current && stageRef.current) {
          const section = sectionRef.current;

          if (elementsRef.current.length !== totalProjects) {
            elementsRef.current = Array.from({ length: totalProjects }, () => ({
              container: null,
              number: null,
              title: null,
              subtitle: null,
              role: null,
              desc: null,
              tech: null,
              actions: null,
              imgSliceTop: null,
              imgSliceBottom: null,
              visualWrap: null,
            }));
          }

          // Set initial states for all projects
          elementsRef.current.forEach((el, idx) => {
            if (!el.container) return;

            if (idx === 0) {
              // First project begins assembling
              gsap.set(el.container, { opacity: 1, pointerEvents: 'auto' });
              if (el.number) gsap.set(el.number, { y: 0, opacity: 1 });
              if (el.title) gsap.set(el.title, { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' });
              if (el.subtitle) gsap.set(el.subtitle, { y: 0, opacity: 1 });
              if (el.role) gsap.set(el.role, { x: 0, opacity: 1 });
              if (el.desc) gsap.set(el.desc, { y: 0, opacity: 1 });
              if (el.tech) gsap.set(el.tech, { x: 0, opacity: 1 });
              if (el.actions) gsap.set(el.actions, { y: 0, opacity: 1 });
              if (el.imgSliceTop) gsap.set(el.imgSliceTop, { x: 0, y: 0, opacity: 1 });
              if (el.imgSliceBottom) gsap.set(el.imgSliceBottom, { x: 0, y: 0, opacity: 1 });
            } else {
              // Subsequent projects start completely scattered and hidden
              gsap.set(el.container, { opacity: 0, pointerEvents: 'none' });
              if (el.number) gsap.set(el.number, { y: -70, opacity: 0 });
              if (el.title) gsap.set(el.title, { x: -80, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' });
              if (el.subtitle) gsap.set(el.subtitle, { y: 25, opacity: 0 });
              if (el.role) gsap.set(el.role, { x: -50, opacity: 0 });
              if (el.desc) gsap.set(el.desc, { y: 35, opacity: 0 });
              if (el.tech) gsap.set(el.tech, { x: 60, opacity: 0 });
              if (el.actions) gsap.set(el.actions, { y: 40, opacity: 0 });
              if (el.imgSliceTop) gsap.set(el.imgSliceTop, { x: -35, y: -30, opacity: 0 });
              if (el.imgSliceBottom) gsap.set(el.imgSliceBottom, { x: 35, y: 30, opacity: 0 });
            }
          });

          // Master ScrollTrigger Timeline: 1 unit per project
          // Total distance proportional to project count
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 0.8,
              start: 'top top',
              end: () => `+=${window.innerHeight * totalProjects * 1.6}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;

                // Update bottom global progress bar
                if (progressBarRef.current) {
                  gsap.set(progressBarRef.current, {
                    scaleX: progress,
                    transformOrigin: 'left center',
                  });
                }

                // Determine active project index and assembly state
                const rawProjectFraction = progress * totalProjects;
                const currentIdx = Math.min(totalProjects - 1, Math.floor(rawProjectFraction));
                setActiveProjectIndex(currentIdx);

                // Local cycle progress within current project (0 to 1)
                const localProgress = rawProjectFraction - currentIdx;
                // Deemed assembled during the hold phase (between ~0.35 and ~0.8)
                setIsAssembled(localProgress >= 0.28 && localProgress <= 0.82);
              },
            },
          });

          scrollTriggerInstance.current = tl.scrollTrigger ?? null;

          // Build Assembly & Deconstruction Timeline for each project
          for (let i = 0; i < totalProjects; i++) {
            const current = elementsRef.current[i];
            const next = i < totalProjects - 1 ? elementsRef.current[i + 1] : null;

            const baseTime = i * 2.0;

            if (i > 0) {
              // ── PHASE 1: SCATTERED -> ASSEMBLING ──
              tl.set(current.container, { opacity: 1, pointerEvents: 'auto' }, baseTime);

              // 1. Number enters
              if (current.number) {
                tl.fromTo(
                  current.number,
                  { y: -70, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
                  baseTime
                );
              }

              // 2. Title clips and slides into place
              if (current.title) {
                tl.fromTo(
                  current.title,
                  { x: -80, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
                  { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power3.out' },
                  baseTime + 0.1
                );
              }

              // 3. Image Slices snap together from opposing displacements
              if (current.imgSliceTop && current.imgSliceBottom) {
                tl.fromTo(
                  current.imgSliceTop,
                  { x: -40, y: -30, opacity: 0 },
                  { x: 0, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
                  baseTime + 0.15
                );
                tl.fromTo(
                  current.imgSliceBottom,
                  { x: 40, y: 30, opacity: 0 },
                  { x: 0, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
                  baseTime + 0.15
                );
              }

              // 4. Subtitle & Role specifications enter
              if (current.subtitle) {
                tl.fromTo(
                  current.subtitle,
                  { y: 25, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
                  baseTime + 0.25
                );
              }
              if (current.role) {
                tl.fromTo(
                  current.role,
                  { x: -45, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                  baseTime + 0.3
                );
              }

              // 5. Short Description settles
              if (current.desc) {
                tl.fromTo(
                  current.desc,
                  { y: 30, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
                  baseTime + 0.35
                );
              }

              // 6. Technology tags snap in
              if (current.tech) {
                tl.fromTo(
                  current.tech,
                  { x: 50, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
                  baseTime + 0.4
                );
              }

              // 7. Action links lock in
              if (current.actions) {
                tl.fromTo(
                  current.actions,
                  { y: 35, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                  baseTime + 0.45
                );
              }
            }

            // ── PHASE 2: HOLD (0.6 duration where everything is locked and readable) ──
            // Handled naturally by the timeline spacing between baseTime+0.55 and deconstruction start

            // ── PHASE 3: DECONSTRUCTION -> TRANSITION TO NEXT PROJECT ──
            if (next) {
              const deconstructTime = baseTime + 1.4;

              // Title and Number drift away
              if (current.title) {
                tl.to(
                  current.title,
                  { x: -60, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power2.in' },
                  deconstructTime
                );
              }
              if (current.number) {
                tl.to(current.number, { y: -50, opacity: 0, duration: 0.4, ease: 'power2.in' }, deconstructTime);
              }

              // Image slices separate along divergent vectors
              if (current.imgSliceTop && current.imgSliceBottom) {
                tl.to(
                  current.imgSliceTop,
                  { x: -40, y: -30, opacity: 0, duration: 0.55, ease: 'power2.in' },
                  deconstructTime + 0.05
                );
                tl.to(
                  current.imgSliceBottom,
                  { x: 40, y: 30, opacity: 0, duration: 0.55, ease: 'power2.in' },
                  deconstructTime + 0.05
                );
              }

              // Metadata & Tech tags disperse
              if (current.role) {
                tl.to(current.role, { x: -40, opacity: 0, duration: 0.4, ease: 'power2.in' }, deconstructTime + 0.1);
              }
              if (current.desc) {
                tl.to(current.desc, { y: -25, opacity: 0, duration: 0.4, ease: 'power2.in' }, deconstructTime + 0.1);
              }
              if (current.tech) {
                tl.to(current.tech, { x: 40, opacity: 0, duration: 0.4, ease: 'power2.in' }, deconstructTime + 0.1);
              }
              if (current.actions) {
                tl.to(current.actions, { y: 30, opacity: 0, duration: 0.4, ease: 'power2.in' }, deconstructTime + 0.1);
              }

              tl.set(current.container, { pointerEvents: 'none', opacity: 0 }, deconstructTime + 0.55);
            }
          }
        }

        return () => {
          scrollTriggerInstance.current = null;
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, [totalProjects]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Casework and Projects"
      className="relative bg-surface-container-lowest text-white border-t border-outline/10 selection:bg-primary selection:text-black overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP VIEWPORT: PROJECT ASSEMBLY ENGINE (>= 1024px)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col h-screen w-full relative justify-between overflow-hidden">
        {/* TOP STATUS & CONTROL BAR */}
        <header className="z-30 w-full px-12 xl:px-16 pt-8 pb-4 flex justify-between items-center border-b border-outline/10 bg-surface-container-lowest/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-primary tracking-[0.35em] uppercase">
              {PROJECTS_DATA.sectionTag}
            </span>
            <span className="text-outline/40 font-mono text-xs select-none">/</span>
            <span className="text-xs font-mono text-secondary/60 tracking-widest uppercase">
              {PROJECTS_DATA.assemblySequenceLabel}
            </span>
          </div>

          {/* Minimal Project Progress Indicator: 01 / 04 */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-primary font-bold tracking-widest text-sm">
                0{activeProjectIndex + 1}
              </span>
              <span className="text-outline/50">/</span>
              <span className="text-secondary/60 text-sm">
                0{totalProjects}
              </span>
            </div>

            {/* Quick jump project indicators */}
            <nav aria-label="Jump to project composition" className="flex items-center gap-2">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => scrollToProject(idx)}
                  className={`px-2.5 py-1 text-[11px] font-mono border transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none ${
                    activeProjectIndex === idx
                      ? 'border-primary bg-primary/10 text-primary font-bold scale-105'
                      : 'border-outline/20 text-secondary/50 hover:border-outline/50 hover:text-white'
                  }`}
                  aria-label={`Jump to project ${proj.number}: ${proj.title}`}
                  aria-current={activeProjectIndex === idx ? 'true' : undefined}
                >
                  {proj.number}
                </button>
              ))}
            </nav>

            {/* Live Assembly State Chip */}
            <div className="hidden xl:flex items-center gap-2 font-mono text-xs border border-outline/20 px-3 py-1 bg-surface-container/40">
              <span className={`w-1.5 h-1.5 rounded-full ${isAssembled ? 'bg-primary' : 'bg-primary/40 animate-pulse'}`} />
              <span className="text-secondary/70 uppercase tracking-widest text-[10px]">
                {isAssembled ? PROJECTS_DATA.statusAssembled : PROJECTS_DATA.statusAssembling}
              </span>
            </div>
          </div>
        </header>

        {/* MAIN STAGE: SPATIALLY ASSEMBLED COMPOSITIONS */}
        <div
          ref={stageRef}
          onMouseMove={handleVisualMouseMove}
          onMouseLeave={handleVisualMouseLeave}
          className="relative flex-1 min-h-0 w-full flex items-center justify-center px-8 lg:px-12 xl:px-16 overflow-hidden"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (elementsRef.current[index]) elementsRef.current[index].container = el;
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center px-4 py-2 xl:px-8 xl:py-4 pointer-events-none will-change-transform"
              aria-hidden={activeProjectIndex !== index}
            >
              <div className="w-full max-w-7xl grid grid-cols-12 gap-8 xl:gap-12 items-center my-auto">
                {/* ── LEFT COMPOSITION: TYPOGRAPHY, METADATA & SPECS ── */}
                <div className="col-span-6 flex flex-col justify-center space-y-3 xl:space-y-4 z-20">
                  {/* Project Number & Group Badge */}
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <div
                      ref={(el) => {
                        if (elementsRef.current[index]) elementsRef.current[index].number = el;
                      }}
                      className="font-mono text-4xl xl:text-6xl font-black text-outline/30 leading-none select-none will-change-transform"
                    >
                      {project.number}
                    </div>

                    {project.isGroupProject && (
                      <span className="bg-primary text-black font-headline font-bold text-[10px] tracking-widest uppercase px-2.5 py-0.5 inline-flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-xs">group</span>
                        {project.groupBadge || PROJECTS_DATA.groupProjectBadge}
                      </span>
                    )}

                    <span className="font-mono text-[11px] xl:text-xs text-secondary/40 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {/* Oversized Typography Title */}
                  <div>
                    <h3
                      ref={(el) => {
                        if (elementsRef.current[index]) elementsRef.current[index].title = el;
                      }}
                      className="text-4xl xl:text-6xl 2xl:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.9] text-white will-change-transform"
                    >
                      {project.title}
                    </h3>

                    <p
                      ref={(el) => {
                        if (elementsRef.current[index]) elementsRef.current[index].subtitle = el;
                      }}
                      className="mt-1 font-mono text-[11px] xl:text-xs uppercase tracking-widest text-primary font-bold will-change-transform"
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Developer Role / Contribution */}
                  <div
                    ref={(el) => {
                      if (elementsRef.current[index]) elementsRef.current[index].role = el;
                    }}
                    className="border-l-2 border-primary/50 pl-3.5 py-0.5 will-change-transform"
                  >
                    <span className="block font-mono text-[9px] xl:text-[10px] text-primary uppercase tracking-widest font-bold mb-0.5">
                      {PROJECTS_DATA.roleLabel}
                    </span>
                    <p className="text-secondary/90 text-xs xl:text-sm font-body leading-snug max-w-lg">
                      {project.role}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p
                    ref={(el) => {
                      if (elementsRef.current[index]) elementsRef.current[index].desc = el;
                    }}
                    className="text-secondary/75 text-xs xl:text-sm font-body leading-relaxed max-w-lg line-clamp-2 2xl:line-clamp-3 will-change-transform"
                  >
                    {project.description}
                  </p>

                  {/* Technologies Badges */}
                  <div
                    ref={(el) => {
                      if (elementsRef.current[index]) elementsRef.current[index].tech = el;
                    }}
                    className="will-change-transform"
                  >
                    <span className="block font-mono text-[9px] xl:text-[10px] text-secondary/50 uppercase tracking-widest mb-1.5">
                      {PROJECTS_DATA.techLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] xl:text-[11px] font-mono border border-outline/20 text-secondary bg-surface-container/50 uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Live Demo & Source Code */}
                  <div
                    ref={(el) => {
                      if (elementsRef.current[index]) elementsRef.current[index].actions = el;
                    }}
                    className="pt-2 flex items-center gap-3.5 will-change-transform z-30"
                  >
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={activeProjectIndex === index ? 0 : -1}
                        className="h-10 px-5 bg-primary text-black font-headline font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-2 shadow-sm border border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none shrink-0"
                      >
                        <span>{PROJECTS_DATA.demoButtonText}</span>
                        <span className="material-symbols-outlined text-sm leading-none">arrow_outward</span>
                      </a>
                    )}

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={activeProjectIndex === index ? 0 : -1}
                        className="h-10 px-5 border border-outline/30 bg-surface-container-low/80 text-white hover:border-primary hover:text-primary font-headline font-bold text-xs uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none shrink-0"
                      >
                        <span>{PROJECTS_DATA.githubButtonText}</span>
                        <span className="material-symbols-outlined text-sm leading-none">code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* ── RIGHT COMPOSITION: MULTI-SLICE CREATIVE IMAGE ASSEMBLY ── */}
                <div className="col-span-6 relative flex items-center justify-center">
                  <div
                    ref={(el) => {
                      if (elementsRef.current[index]) elementsRef.current[index].visualWrap = el;
                    }}
                    className="relative w-full max-h-[68vh] aspect-[16/10] bg-surface-container-high border border-outline/25 shadow-2xl overflow-hidden group will-change-transform"
                  >
                    {/* Visual Slice A (Top Section) */}
                    <div
                      ref={(el) => {
                        if (elementsRef.current[index]) elementsRef.current[index].imgSliceTop = el;
                      }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                      style={{ clipPath: 'inset(0% 0% 50% 0%)' }}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>

                    {/* Visual Slice B (Bottom Section) */}
                    <div
                      ref={(el) => {
                        if (elementsRef.current[index]) elementsRef.current[index].imgSliceBottom = el;
                      }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                      style={{ clipPath: 'inset(50% 0% 0% 0%)' }}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>

                    {/* Subtle Assembly Seam & Grid Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Corner Accent Badge */}
                    <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/80 bg-black/80 px-2.5 py-1 border border-white/10 uppercase tracking-widest pointer-events-none">
                      FIG. 0{index + 1} — UI SYSTEM
                    </div>

                    {/* Hover Runtime Link */}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-4 bg-primary text-black font-headline font-bold text-xs tracking-widest uppercase px-3.5 py-2 inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        <span>{PROJECTS_DATA.viewProjectLabel}</span>
                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM GLOBAL STATUS BAR */}
        <footer className="z-40 w-full h-11 px-12 border-t border-outline/15 bg-surface-container-lowest flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-[11px] font-mono text-secondary/60">
            <span className="text-primary">●</span>
            <span className="uppercase tracking-widest">
              CASE 0{activeProjectIndex + 1} OF 0{totalProjects}: {projects[activeProjectIndex]?.title}
            </span>
          </div>

          {/* Tracking Progress Indicator Bar */}
          <div className="w-64 h-1 bg-outline/20 overflow-hidden relative" aria-hidden="true">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 bottom-0 w-full bg-primary"
              style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />
          </div>

          <div className="text-[11px] font-mono text-secondary/50 uppercase tracking-widest">
            {PROJECTS_DATA.scrollHint} ↓
          </div>
        </footer>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE / TABLET / REDUCED-MOTION: EDITORIAL STACK (< 1024px)
      ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col px-6 md:px-12 py-24 md:py-32">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-outline/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
            <p className="text-xs font-mono font-bold text-primary tracking-[0.35em] uppercase">
              {PROJECTS_DATA.sectionTag}
            </p>
            <span className="text-outline/40 font-mono text-xs">/</span>
            <p className="text-xs font-mono text-secondary/60 tracking-widest uppercase">
              {PROJECTS_DATA.period}
            </p>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.9] text-white mb-6">
            Selected
            <br />
            <span className="text-primary">Casework</span>
          </h2>
          <p className="text-secondary/70 font-body text-base max-w-xl">
            A progressive construction archive presenting technical architecture and production application interfaces.
          </p>
        </div>

        {/* Vertical Stack: Project Number & Title -> Visual -> Role & Specs -> Actions */}
        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="flex flex-col bg-surface-container-low border border-outline/15 overflow-hidden"
              aria-labelledby={`mobile-project-heading-${project.id}`}
            >
              {/* Header Meta */}
              <div className="p-6 border-b border-outline/10 flex items-center justify-between bg-surface-container-lowest">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-widest">
                    {PROJECTS_DATA.indexPrefix}{project.number}
                  </span>
                  {project.isGroupProject && (
                    <span className="bg-primary text-black font-headline font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">group</span>
                      {project.groupBadge || PROJECTS_DATA.groupProjectBadge}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-secondary/50">
                  0{index + 1} / 0{totalProjects}
                </span>
              </div>

              {/* Title & Category */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3
                  id={`mobile-project-heading-${project.id}`}
                  className="text-3xl sm:text-4xl font-headline font-black uppercase tracking-tight text-white"
                >
                  {project.title}
                </h3>
                <p className="text-primary font-mono text-xs uppercase tracking-wider font-bold">
                  {project.subtitle} · {project.category}
                </p>
                <p className="text-secondary/80 text-sm font-body leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Visual Display */}
              <div className="aspect-[16/10] w-full bg-surface-container overflow-hidden relative border-y border-outline/10">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover grayscale contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/80 bg-black/70 px-2.5 py-1 border border-white/10 uppercase tracking-wider">
                  FIG. 0{index + 1} — UI SYSTEM
                </div>
              </div>

              {/* Role & Technologies */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="border-l-2 border-primary/60 pl-3 py-1 bg-surface-container-lowest/40">
                  <span className="block font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                    {PROJECTS_DATA.roleLabel}
                  </span>
                  <p className="text-secondary/90 text-xs font-body leading-relaxed">
                    {project.role}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-[10px] text-secondary/50 uppercase tracking-widest mb-2">
                    {PROJECTS_DATA.techLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono border border-outline/20 text-secondary bg-surface-container uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-outline/10 flex flex-wrap gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[130px] py-3 px-4 bg-primary text-black font-headline font-bold text-xs uppercase tracking-widest hover:bg-white text-center inline-flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      <span>{PROJECTS_DATA.demoButtonText}</span>
                      <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </a>
                  )}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[130px] py-3 px-4 border border-outline/30 text-white hover:border-primary hover:text-primary font-headline font-bold text-xs uppercase tracking-widest text-center inline-flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      <span>{PROJECTS_DATA.githubButtonText}</span>
                      <span className="material-symbols-outlined text-sm">code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Outro */}
        <div className="mt-20 pt-12 border-t border-outline/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase block mb-2">
              {PROJECTS_DATA.repositoryArchive}
            </span>
            <p className="text-secondary text-sm font-body">Explore more full-stack projects and source code.</p>
          </div>
          <a
            href="https://github.com/Sumyta-Bentey-Habib"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black font-headline font-bold text-xs tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>VIEW GITHUB ARCHIVE</span>
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
