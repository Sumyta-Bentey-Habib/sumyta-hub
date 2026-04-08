import React from 'react';

const Projects = () => {
  return (
    <section className="py-40 bg-surface-container-lowest" id="work">
      <div className="px-6 md:px-12 mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 text-white">
        <h2 className="text-6xl sm:text-7xl md:text-9xl lg:text-[14rem] font-headline font-black tracking-tighter leading-[0.85] text-primary uppercase hover:text-white transition-colors duration-500 cursor-default break-words max-w-full">
          Selected<br />Cases
        </h2>
        <p className="max-w-sm text-secondary uppercase tracking-widest text-right font-headline text-xs md:text-base">03. ARCHIVE — 2025/2026</p>
      </div>

      <div className="flex flex-col gap-32">
        {/* Featured Project: Quadra (Group) */}
        <div className="group relative overflow-hidden bg-surface-container w-full h-[819px] flex flex-col justify-end p-6 md:p-24 hover:scale-[1.01] transition-transform duration-1000">
          <img
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
            alt="Quadra Social Media Platform interface"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgfgH26KGWetiguqmMF27CcsqRSNoFn0nkZ8UZWsOL6tBs37L7F-0vfUPdAKb3ZXbeFHM49orQDRpIO_UzGb1lCUzgK8EudKjCrh9vCp6FwsSoSSu46JfKhU7eZwusOkOniIObJadhl5MDHgCTU39YpI724wg3NAJmV3LFTX0x8bZhoIrZldEnBwe1LPYDc9LXANJUVJSZQPh_jhCIuVlhY2Bi1KfxqCi1OGWPQ6TjHXvx3JN-wuz1KCSEoBgAqEyVH_gBCXhTH10"
          />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase mb-4 block font-headline">
                Featured Group Case
              </span>
              <h3 className="text-7xl md:text-[10rem] font-headline font-black uppercase tracking-tighter mb-8 text-white">
                Quadra
              </h3>
              <p className="text-xl text-secondary-dim leading-relaxed font-body">
                A modern, full-stack social media application providing a comprehensive social networking experience with real-time messaging, post interactions, and notifications.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary-fixed transition-all duration-500 scale-125"
                href="https://quadra-blush.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-4xl">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Grid Projects */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Espresso-Emporium */}
          <div className="group hover:scale-[1.02] transition-transform duration-500">
            <div className="aspect-square bg-surface-container mb-12 overflow-hidden relative">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt="luxury coffee branding and e-commerce interface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_kwXDfSc15iqfMZMP808pX3AEifnKHxQO5SVK7oZbzJq2ogLPOnDfwjpJdgvq2p5kDiD9Uv0nbcBiC2_7jNE65BwxJhVDvyXqmNwKhBgrl_gVWJqjjNtKKvudNRapo5B2St_Sb4mt4Hwsge4Ol_kNNDYYTjsCoppYlIiN3IGP4_c5zcjgmNBx6Qs4D1Kic2dDWrFr7XrcBn22tMXySEdhLY9uJN1HkYsNDXZSzyrAfwXHB8h0XydAx9EDS9Wk-76B4povsJo0UQg"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                <a
                  href="https://espresso-emporium-8d4f7.web.app/"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
            <h4 className="text-4xl font-headline font-black uppercase mb-4 text-white">Espresso</h4>
            <p className="text-secondary/60 uppercase tracking-widest text-sm mb-6 font-headline">
              React • Firebase • Tailwind CSS • Socket.io
            </p>
            <p className="text-secondary max-w-md font-body">
              A premium coffee platform where lovers browse and review, while sellers showcase their offerings.
            </p>
          </div>

          {/* Studify */}
          <div className="group md:mt-24 hover:scale-[1.02] transition-transform duration-500">
            <div className="aspect-square bg-surface-container mb-12 overflow-hidden relative">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt="modern education platform interface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6q5XBpTAbv_8ZU8HKN_Fb7RqFgHBv3AjLzFKjOmWrl5DoLeBAjbyelUd_KTNumbJiwVOy_IMgNbMQjKqZ8dculb04vRxf6nxQe5KTbU83_j6znzhyyuEKJUZqOkkyElCnVnGztlZrkyixfKKaD1wKqEEngqmbb5e0cA4WwYG5_KpMsNC5cj3EV7XIQHNUXv-5uvSyw9MeUCQ90IwSY8R633m3hkBcaX1Al1ErLXMQ0zpXEW4osSrpcHX8RFMOS7q7Om2ERVMBTKE"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                <a
                  href="https://studify-749d1.web.app/"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/Sumyta-Bentey-Habib/Studify"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
            <h4 className="text-4xl font-headline font-black uppercase mb-4 text-white">Studify</h4>
            <p className="text-secondary/60 uppercase tracking-widest text-sm mb-6 font-headline">
              React • Firebase • JWT • Tailwind • DaisyUI
            </p>
            <p className="text-secondary max-w-md font-body">
              A modern, role-based educational platform for seamless learning management.
            </p>
          </div>

          {/* GoAthlete */}
          <div className="group lg:-mt-24 hover:scale-[1.02] transition-transform duration-500">
            <div className="aspect-square bg-surface-container mb-12 overflow-hidden relative">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt="GoAthlete sports event platform"
                src="/images/goathlete.png"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                <a
                  href="https://goathlete.web.app/"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/Sumyta-Bentey-Habib/GoAthlete-"
                  target="_blank"
                  className="px-6 py-2 bg-black text-white font-headline font-bold uppercase text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
            <h4 className="text-4xl font-headline font-black uppercase mb-4 text-white">GoAthlete</h4>
            <p className="text-secondary/60 uppercase tracking-widest text-sm mb-6 font-headline">
              React • Firebase • React Router • DaisyUI
            </p>
            <p className="text-secondary max-w-md font-body">
              Empowering athletes to explore, create, and manage events with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
