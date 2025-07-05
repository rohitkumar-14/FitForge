import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flame, Shield, Activity, TrendingUp, Award, Zap } from 'lucide-react';

const InteractiveElements: React.FC = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation for interactive elements
    gsap.to('.floating-icon', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.4
    });

    // Rotate animation
    gsap.to('.rotating-icon', {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    // Pulse animation
    gsap.to('.pulsing-icon', {
      scale: 1.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Sparkle animation
    gsap.to('.sparkle-icon', {
      scale: 1.2,
      rotation: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div ref={elementsRef} className="fixed inset-0 pointer-events-none z-10">
      {/* Top Left */}
      <div className="absolute top-24 left-12 floating-icon">
        <Flame size={28} className="text-orange-400 opacity-60" />
      </div>

      {/* Top Right */}
      <div className="absolute top-36 right-20 rotating-icon">
        <Shield size={24} className="text-purple-400 opacity-50" />
      </div>

      {/* Middle Left */}
      <div className="absolute top-1/2 left-24 pulsing-icon">
        <Activity size={22} className="text-pink-400 opacity-40" />
      </div>

      {/* Middle Right */}
      <div className="absolute top-1/3 right-12 sparkle-icon">
        <TrendingUp size={20} className="text-blue-400 opacity-50" />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-48 left-10 floating-icon">
        <Award size={26} className="text-yellow-400 opacity-30" />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-36 right-16 rotating-icon">
        <Zap size={22} className="text-green-400 opacity-40" />
      </div>

      {/* Additional scattered elements */}
      <div className="absolute top-1/4 left-1/3 pulsing-icon">
        <div className="w-3 h-3 bg-orange-400 rounded-full opacity-50"></div>
      </div>

      <div className="absolute top-3/4 right-1/3 floating-icon">
        <div className="w-4 h-4 bg-purple-400 rounded-full opacity-30"></div>
      </div>

      <div className="absolute top-1/2 left-3/4 sparkle-icon">
        <div className="w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
      </div>

      <div className="absolute bottom-1/3 left-1/4 rotating-icon">
        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-40"></div>
      </div>

      <div className="absolute top-2/3 right-1/4 floating-icon">
        <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default InteractiveElements;