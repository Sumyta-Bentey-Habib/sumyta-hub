'use client';

import { useState, useCallback } from 'react';
import { HERO_DATA } from '@/utils/constants';

export function useHeroInteractions(onAnnouncementChange: (text: string) => void) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  const handleLocationTrigger = useCallback(
    (locId: string) => {
      const loc = HERO_DATA.locations.find((l) => l.id === locId);
      if (!loc) return;

      if (loc.actionType === 'reveal') {
        setActiveModal(loc.id);
        onAnnouncementChange(HERO_DATA.announcementWorkstation);
      } else if (loc.actionType === 'ending') {
        setActiveModal('ending');
        onAnnouncementChange(HERO_DATA.announcementEnding);
      } else if (loc.actionType === 'link' && 'href' in loc && loc.href) {
        window.open(loc.href, '_blank', 'noopener,noreferrer');
        onAnnouncementChange(HERO_DATA.announcementNavigated);
      } else if (loc.actionType === 'portal') {
        setIsWarping(true);
        onAnnouncementChange(HERO_DATA.announcementWarp);
        setTimeout(() => {
          const target = document.getElementById('work');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          setIsWarping(false);
        }, 350);
      }
    },
    [onAnnouncementChange]
  );

  const handleNavigateWork = useCallback(() => {
    setActiveModal(null);
    setIsWarping(true);
    onAnnouncementChange(HERO_DATA.announcementWarp);
    setTimeout(() => {
      const target = document.getElementById('work');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsWarping(false);
    }, 350);
  }, [onAnnouncementChange]);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return {
    activeModal,
    isWarping,
    handleLocationTrigger,
    handleNavigateWork,
    handleCloseModal,
  };
}
