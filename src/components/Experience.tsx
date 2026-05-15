import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Junior Developer',
      company: 'XIIA',
      period: 'March 2026 — PRESENT',
      desc: 'Leading full-stack development cycles from conceptualization to deployment. Specialized in building intuitive learning management systems and event platforms with a focus on seamless user experience and robust backend architecture.',
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
    <section className="py-40 bg-[#050505] px-6 md:px-12 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-32 drop-shadow-[0_0_10px_rgba(255,90,120,0.8)]">
          02. Trajectory
        </h2>
        
        <div className="flex flex-col gap-32">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-12 md:gap-24 items-start group">
              {/* Sticky Date Column */}
              <div className="md:w-1/3 md:sticky md:top-40 shrink-0 mt-2">
                <span className={`${exp.active ? 'text-primary drop-shadow-[0_0_10px_rgba(255,90,120,0.5)]' : 'text-white/40'} font-mono text-xl tracking-wider transition-colors duration-500`}>
                  {exp.period}
                </span>
                <div className={`mt-8 h-px w-full max-w-[100px] transition-all duration-700 ${exp.active ? 'bg-primary scale-x-100' : 'bg-white/20 scale-x-50 group-hover:scale-x-100 group-hover:bg-white/50'} origin-left`}></div>
              </div>
              
              {/* Content Column */}
              <div className="md:w-2/3">
                <div className={`p-10 md:p-16 rounded-3xl ${exp.active ? 'bg-white/[0.04] border-primary/20 shadow-[0_0_40px_rgba(255,90,120,0.05)]' : 'bg-white/[0.01] border-white/[0.05]'} border backdrop-blur-xl transition-all duration-700 group-hover:bg-white/[0.03] group-hover:border-white/10 group-hover:-translate-y-2`}>
                  <h3 className={`text-4xl md:text-5xl font-headline font-black uppercase mb-4 ${exp.active ? 'text-white' : 'text-white/70'} group-hover:text-white transition-colors duration-500`}>
                    {exp.title}
                  </h3>
                  <p className="text-primary font-bold text-xl uppercase tracking-widest mb-10 font-headline">
                    {exp.company}
                  </p>
                  <p className={`${exp.active ? 'text-secondary/90' : 'text-secondary/60'} text-lg leading-relaxed font-body group-hover:text-secondary/90 transition-colors duration-500`}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
