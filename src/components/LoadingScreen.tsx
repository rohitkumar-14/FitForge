import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.fromTo(progressRef.current, 
      { width: '0%' },
      { width: '100%', duration: 3, ease: "power2.out" }
    );

    // Animate text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      0.8
    );

    // Pulse animation for the logo
    gsap.to('.loading-logo', {
      scale: 1.15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Floating particles
    gsap.to('.loading-particle', {
      y: -30,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.4
    });

    // Exit animation
    const exitTl = gsap.timeline({ delay: 3.2 });
    exitTl.to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.out"
    });
    exitTl.to(loaderRef.current, {
      display: 'none',
      duration: 0
    });

  }, []);

  return (
    <div ref={loaderRef} className="loading-screen">
      <div className="text-center">
        {/* Logo */}
        <div className="loading-logo mb-10">
          <h1 className="text-7xl md:text-8xl font-black exo glow-text text-orange-400">
            FIT<span className="text-purple-400">FORGE</span>
          </h1>
        </div>

        {/* Loading text */}
        <div ref={textRef} className="mb-10">
          <p className="text-2xl text-gray-300 font-medium">Forging your warrior transformation...</p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto mb-10 overflow-hidden border border-orange-400/30">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-orange-500 to-purple-600 rounded-full"
          ></div>
        </div>

        {/* Floating particles */}
        <div className="flex justify-center space-x-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="loading-particle w-3 h-3 bg-orange-400 rounded-full"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;