import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Junior Developer',
      company: 'XIIA',
      period: 'March 2026 — PRESENT',
      desc: 'Leading the development of internal SaaS tooling using Next.js 15 and Server Components. Orchestrating complex state management and optimizing client-side performance benchmarks by 40%.',
      active: true,
    },
    {
      title: 'Web Developer Intern',
      company: 'XIIA',
      period: 'Nov 2025 — March 2026',
      desc: 'Contributed to the core UI library migration. Focused on pixel-perfect responsiveness and cross-browser performance testing for high-traffic entry points.',
      active: false,
    },
  ];

  return (
    <section className="py-32 bg-surface-container-low px-6 md:px-12">
      <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-24">
        02. Trajectory
      </h2>
      <div className="relative flex flex-col gap-0 border-l-4 border-primary ml-4 md:ml-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-12 pb-24 group">
            <div
              className={`absolute -left-[14px] top-0 w-6 h-6 transition-all duration-300 ${
                exp.active ? 'bg-primary group-hover:scale-150' : 'bg-surface-variant group-hover:bg-primary'
              }`}
            ></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className={`text-4xl md:text-5xl font-headline font-black uppercase ${!exp.active && 'text-secondary-dim'}`}>
                  {exp.title}
                </h3>
                <p className={`${exp.active ? 'text-primary' : 'text-outline'} font-bold text-xl uppercase tracking-widest mt-2 font-headline`}>
                  {exp.company}
                </p>
              </div>
              <span className={`${exp.active ? 'text-secondary-dim' : 'text-outline'} font-mono text-lg`}>
                {exp.period}
              </span>
            </div>
            <div
              className={`${
                exp.active ? 'bg-surface-container border-primary/20' : 'bg-surface-container-high border-outline/20'
              } p-8 border-l-4`}
            >
              <p className={`${exp.active ? 'text-secondary' : 'text-secondary/60'} text-lg max-w-3xl font-body`}>
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
