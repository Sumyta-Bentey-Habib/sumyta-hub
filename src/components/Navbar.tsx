import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-8">
      <div className="text-2xl font-black tracking-tighter text-primary font-headline uppercase leading-none">
        S.B.H.
      </div>
      <div className="hidden md:flex gap-10 font-headline font-bold uppercase tracking-tighter">
        <a
          className="text-primary border-b-2 border-primary pb-1 hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] scale-105 active:scale-95"
          href="#work"
        >
          Work
        </a>
        <a
          className="text-secondary hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-95"
          href="#skills"
        >
          Skills
        </a>
        <a
          className="text-secondary hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-95"
          href="#about"
        >
          About
        </a>
        <a
          className="text-secondary hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-95"
          href="#contact"
        >
          Contact
        </a>
      </div>
      <button className="px-6 py-2 bg-primary-dim text-on-primary-fixed font-headline font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-400">
        Connect
      </button>
    </nav>
  );
};

export default Navbar;
