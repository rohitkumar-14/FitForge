import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TrainingPrograms: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      name: "Warrior Elite",
      color: "#ff6b35",
      description: "Ultimate warrior transformation program combining strength, endurance, and mental fortitude training.",
      benefits: ["Full Body Transformation", "Mental Toughness", "Elite Performance"],
      emoji: "⚔️",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Beast Mode",
      color: "#8b5cf6",
      description: "High-intensity strength and muscle building program designed for maximum power and size gains.",
      benefits: ["Massive Strength Gains", "Muscle Hypertrophy", "Power Development"],
      emoji: "🦍",
      image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Phoenix Rising",
      color: "#f59e0b",
      description: "Complete body transformation and fat loss program that rebuilds you from the ground up.",
      benefits: ["Fat Loss", "Body Recomposition", "Metabolic Boost"],
      emoji: "🔥",
      image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Titan Forge",
      color: "#06b6d4",
      description: "Advanced powerlifting and strength sport preparation for competitive athletes.",
      benefits: ["Competition Prep", "Max Strength", "Technical Mastery"],
      emoji: "🏆",
      image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    // Animate tab change
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    // Animate tab selection
    gsap.to(`.program-tab-${index}`, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-black exo mb-8 glow-text text-orange-400">
          Elite Programs
        </h2>
        <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
          Choose your path to greatness with our specialized training programs
        </p>
      </div>

      {/* Program Tabs */}
      <div ref={tabsRef} className="flex flex-wrap justify-center gap-6 mb-16">
        {programs.map((program, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`program-tab-${index} program-tab px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              activeTab === index
                ? 'active scale-110 shadow-2xl'
                : 'glass-dark text-gray-300 hover:text-white hover:scale-105'
            }`}
            style={{
              backgroundColor: activeTab === index ? program.color : 'transparent',
              borderColor: program.color,
              borderWidth: '3px',
              color: activeTab === index ? '#000' : undefined
            }}
          >
            <span className="mr-3 text-2xl">{program.emoji}</span>
            {program.name}
          </button>
        ))}
      </div>

      {/* Program Content */}
      <div ref={contentRef} className="max-w-5xl mx-auto">
        <div className="glass-dark rounded-3xl p-10 md:p-16 border-2" 
             style={{ borderColor: programs[activeTab].color }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-black exo mb-6 glow-text" 
                  style={{ color: programs[activeTab].color }}>
                {programs[activeTab].name}
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {programs[activeTab].description}
              </p>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white mb-4 exo">Program Benefits:</h4>
                {programs[activeTab].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-3 h-3 rounded-full" 
                         style={{ backgroundColor: programs[activeTab].color }}></div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-96 h-96 mx-auto rounded-3xl relative overflow-hidden shadow-2xl"
                   style={{ backgroundColor: `${programs[activeTab].color}30` }}>
                {/* Background gradient overlay */}
                <div className="absolute inset-0 rounded-3xl"
                     style={{ 
                       background: `radial-gradient(circle at 40% 40%, ${programs[activeTab].color}50, transparent 70%)`,
                       animation: 'pulse 4s infinite'
                     }}>
                </div>
                
                {/* Program image */}
                <img 
                  src={programs[activeTab].image}
                  alt={programs[activeTab].name}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"
                  style={{ mixBlendMode: 'overlay' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Color overlay for better blending */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-40"
                  style={{ backgroundColor: programs[activeTab].color }}
                ></div>
                
                {/* Emoji overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl opacity-90 drop-shadow-2xl filter"
                       style={{ 
                         filter: `drop-shadow(0 0 30px ${programs[activeTab].color})`,
                         textShadow: `0 0 40px ${programs[activeTab].color}`
                       }}>
                    {programs[activeTab].emoji}
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl border-4 animate-pulse"
                     style={{ borderColor: programs[activeTab].color }}></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: programs[activeTab].color,
                        left: `${15 + i * 12}%`,
                        top: `${25 + (i % 4) * 20}%`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: '3s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="ripple-effect px-12 py-5 rounded-full font-bold text-xl text-black transition-all duration-300 hover:scale-110 shadow-2xl"
                    style={{ backgroundColor: programs[activeTab].color }}>
              Join {programs[activeTab].name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPrograms;