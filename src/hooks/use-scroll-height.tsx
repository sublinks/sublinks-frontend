import { useEffect, useState } from 'react';

const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [lastScrollHeight, setLastScrollHeight] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [wentUp, setWentUp] = useState(true);

  function handleScroll() {
    setWentUp(window.scrollY <= lastScrollHeight);
    setScrollPercentage(window.scrollY / document.body.scrollHeight);
    setLastScrollHeight(scrollHeight);
    setScrollHeight(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return {
    scrollHeight,
    lastScrollHeight,
    scrollPercentage,
    wentUp
  };
};

export default useScrollHeight;
