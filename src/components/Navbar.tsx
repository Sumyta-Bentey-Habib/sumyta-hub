'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'skills', 'about', 'contact'];
      const scrollY = window.scrollY;
      let current = '';

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          // Trigger when the section is near the top of the viewport
          if (scrollY >= top - window.innerHeight / 3 && scrollY < top + height - window.innerHeight / 3) {
            current = id;
          }
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: 'My Works' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-8 transition-all duration-300">
      <div className="text-2xl font-black tracking-tighter text-primary font-headline uppercase leading-none">
        S.B.H.
      </div>
      <div className="hidden md:flex gap-10 font-headline font-bold uppercase tracking-tighter">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`pb-1 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 ${
              activeSection === item.id
                ? 'text-primary border-b-2 border-primary scale-105'
                : 'text-secondary hover:text-primary hover:scale-110'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <a 
        href="mailto:sumytabenteyhabib@gmail.com"
        className="px-6 py-2 bg-primary-dim text-on-primary-fixed font-headline font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-400 no-underline"
      >
        Connect
      </a>
    </nav>
  );
};

export default Navbar;
