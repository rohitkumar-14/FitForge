import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EquipmentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const equipment = [
    {
      name: "Quantum Treadmill",
      color: "#ff6b9d",
      description: "AI-powered running surface that adapts to your gait and provides real-time biomechanical feedback.",
      benefits: ["Injury Prevention", "Gait Analysis", "Performance Optimization"],
      emoji: "🏃‍♂️",
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Neural Weights",
      color: "#4ecdc4",
      description: "Smart dumbbells with electromagnetic resistance that adjusts automatically to your strength curve.",
      benefits: ["Perfect Resistance", "Form Correction", "Progress Tracking"],
      emoji: "🏋️‍♂️",
      image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Holographic Trainer",
      color: "#ffd93d",
      description: "3D holographic personal trainer that provides immersive workout guidance and motivation.",
      benefits: ["24/7 Coaching", "Personalized Programs", "Motivation Boost"],
      emoji: "🤖",
      image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Recovery Pod",
      color: "#8b5cf6",
      description: "Advanced recovery chamber with cryotherapy, compression, and biometric monitoring.",
      benefits: ["Faster Recovery", "Injury Prevention", "Performance Enhancement"],
      emoji: "❄️",
      image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    // Animate tab change
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    // Animate tab selection
    gsap.to(`.tab-${index}`, {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold orbitron mb-6 glow-text text-cyan-400">
          Equipment Arsenal
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Experience our cutting-edge fitness technology designed to maximize your potential
        </p>
      </div>

      {/* Equipment Tabs */}
      <div ref={tabsRef} className="flex flex-wrap justify-center gap-4 mb-12">
        {equipment.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`tab-${index} flavor-tab px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === index
                ? 'active scale-105 shadow-lg'
                : 'glass text-gray-300 hover:text-white hover:scale-105'
            }`}
            style={{
              backgroundColor: activeTab === index ? item.color : 'transparent',
              borderColor: item.color,
              borderWidth: '2px'
            }}
          >
            <span className="mr-2">{item.emoji}</span>
            {item.name}
          </button>
        ))}
      </div>

      {/* Equipment Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold orbitron mb-4 glow-text" 
                  style={{ color: equipment[activeTab].color }}>
                {equipment[activeTab].name}
              </h3>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {equipment[activeTab].description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-white mb-3">Key Features:</h4>
                {equipment[activeTab].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 rounded-full" 
                         style={{ backgroundColor: equipment[activeTab].color }}></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-3xl relative overflow-hidden shadow-2xl"
                   style={{ backgroundColor: `${equipment[activeTab].color}20` }}>
                {/* Background gradient overlay */}
                <div className="absolute inset-0 rounded-3xl"
                     style={{ 
                       background: `radial-gradient(circle at 30% 30%, ${equipment[activeTab].color}40, transparent 70%)`,
                       animation: 'pulse 3s infinite'
                     }}>
                </div>
                
                {/* Equipment image */}
                <img 
                  src={equipment[activeTab].image}
                  alt={equipment[activeTab].name}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-90"
                  style={{ mixBlendMode: 'overlay' }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Color overlay for better blending */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{ backgroundColor: equipment[activeTab].color }}
                ></div>
                
                {/* Emoji overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-90 drop-shadow-2xl filter"
                       style={{ 
                         filter: `drop-shadow(0 0 20px ${equipment[activeTab].color})`,
                         textShadow: `0 0 30px ${equipment[activeTab].color}`
                       }}>
                    {equipment[activeTab].emoji}
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: equipment[activeTab].color,
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="ripple px-8 py-4 rounded-full font-semibold text-black transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ backgroundColor: equipment[activeTab].color }}>
              Try {equipment[activeTab].name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentShowcase;