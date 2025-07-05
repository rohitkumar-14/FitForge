import React, { useEffect, useRef, useState } from 'react';
import { Flame, Zap, Shield, Users, ArrowDown, Menu, X, Play, Pause, Activity, Award, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ThreeScene from './components/ThreeScene';
import LoadingScreen from './components/LoadingScreen';
import FloatingMetrics from './components/FloatingMetrics';
import TrainingPrograms from './components/TrainingPrograms';
import InteractiveElements from './components/InteractiveElements';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeAnimations();
    }
  }, [loading]);

  const initializeAnimations = () => {
    // Hero text reveal animation
    gsap.fromTo('.hero-title span', 
      { y: 120, opacity: 0, rotationX: 90 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.5, 
        stagger: 0.15,
        ease: "back.out(1.7)"
      }
    );

    // Floating elements animation
    gsap.to('.floating-element', {
      y: -30,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: ".mission-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo('.mission-content', 
          { x: -150, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
        );
      }
    });

    ScrollTrigger.create({
      trigger: ".services-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo('.service-card', 
          { y: 80, opacity: 0, rotationY: 45 },
          { y: 0, opacity: 1, rotationY: 0, duration: 1.2, stagger: 0.25, ease: "power3.out" }
        );
      }
    });

    ScrollTrigger.create({
      trigger: ".achievements-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo('.achievement-item', 
          { scale: 0.5, opacity: 0, rotation: 180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.15, ease: "elastic.out(1, 0.5)" }
        );
      }
    });

    // Parallax effects
    gsap.to('.parallax-bg', {
      yPercent: -60,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Section highlighting
    ScrollTrigger.batch(".section", {
      onEnter: (elements) => {
        elements.forEach(element => {
          const id = element.getAttribute('id');
          if (id) setActiveSection(id);
        });
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div ref={containerRef} className="relative">
      <ThreeScene />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-dark py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="exo font-black text-2xl glow-text text-orange-400">
              FIT<span className="text-purple-400">FORGE</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'mission', 'services', 'programs', 'achievements'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'text-orange-400 bg-orange-400/20 shadow-lg'
                      : 'text-gray-300 hover:text-orange-400 hover:bg-white/5'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-orange-400 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden glass-dark border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['hero', 'mission', 'services', 'programs', 'achievements'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === section
                      ? 'text-orange-400 bg-orange-400/20'
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="hero-title text-reveal">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black exo mb-8">
              <span className="inline-block glow-text text-orange-400">FIT</span>
              <span className="inline-block glow-text text-purple-400">FORGE</span>
            </h1>
          </div>
          
          <div className="text-reveal">
            <p className="text-2xl md:text-3xl mb-4 text-gray-200 max-w-3xl mx-auto font-light">
              <span className="inline-block">Forge Your Ultimate</span>
              <span className="inline-block text-orange-400 font-bold"> Warrior Physique</span>
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
              Elite training academy where champions are forged through discipline, innovation, and relentless pursuit of excellence
            </p>
          </div>

          <div className="floating-element">
            <button className="ripple-effect bg-gradient-to-r from-orange-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transition-transform shadow-2xl">
              <span className="flex items-center gap-3">
                <Flame size={24} />
                Begin Your Transformation
              </span>
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Discover Your Potential</span>
          <ArrowDown size={18} />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section section min-h-screen flex items-center py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="mission-content">
              <h2 className="text-5xl md:text-6xl font-black exo mb-8 glow-text text-orange-400">
                Elite Training Philosophy
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                At FitForge, we don't just build bodies - we forge warriors. Our revolutionary training 
                methodology combines ancient discipline with cutting-edge science to unlock your true potential.
              </p>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Every session is designed to push your limits, break barriers, and transform not just your 
                physique, but your entire mindset towards achieving greatness.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-orange-400">
                  <Flame size={24} />
                  <span className="text-lg font-semibold">Warrior Mindset</span>
                </div>
                <div className="flex items-center gap-3 text-purple-400">
                  <Shield size={24} />
                  <span className="text-lg font-semibold">Elite Coaching</span>
                </div>
                <div className="flex items-center gap-3 text-pink-400">
                  <Activity size={24} />
                  <span className="text-lg font-semibold">Peak Performance</span>
                </div>
                <div className="flex items-center gap-3 text-blue-400">
                  <TrendingUp size={24} />
                  <span className="text-lg font-semibold">Continuous Growth</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="warrior-glow w-full h-96 bg-gradient-to-br from-orange-500/30 to-purple-600/30 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-purple-600/20 animate-pulse"></div>
                <div className="text-8xl floating-element z-10">⚔️</div>
                <div className="absolute inset-0 border-4 border-orange-400/30 rounded-full animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black exo mb-8 glow-text text-orange-400">
              Elite Services
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Comprehensive training solutions designed for warriors who demand excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Flame className="w-10 h-10 text-orange-400" />,
                title: "Warrior Conditioning",
                description: "Intense full-body conditioning that builds unbreakable mental and physical strength"
              },
              {
                icon: <Shield className="w-10 h-10 text-purple-400" />,
                title: "Combat Training",
                description: "Martial arts and self-defense techniques integrated with strength and agility training"
              },
              {
                icon: <Activity className="w-10 h-10 text-pink-400" />,
                title: "Performance Analytics",
                description: "Advanced biometric tracking and performance optimization using cutting-edge technology"
              },
              {
                icon: <Users className="w-10 h-10 text-blue-400" />,
                title: "Elite Coaching",
                description: "One-on-one mentorship with world-class trainers and former professional athletes"
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-green-400" />,
                title: "Transformation Programs",
                description: "Comprehensive lifestyle transformation including nutrition, mindset, and recovery protocols"
              },
              {
                icon: <Award className="w-10 h-10 text-yellow-400" />,
                title: "Competition Prep",
                description: "Elite preparation for bodybuilding, powerlifting, and athletic competitions"
              }
            ].map((service, index) => (
              <div key={index} className="service-card interactive-element">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white exo">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section py-20 relative">
        <TrainingPrograms />
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements-section section py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black exo mb-8 glow-text text-orange-400">
              Forge Your Legacy
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Join the ranks of elite warriors who have transformed their lives at FitForge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Warriors Forged", value: "5,000+", color: "text-orange-400" },
              { label: "Transformation Rate", value: "98%", color: "text-purple-400" },
              { label: "Elite Coaches", value: "50+", color: "text-pink-400" },
              { label: "Years of Excellence", value: "15", color: "text-blue-400" }
            ].map((achievement, index) => (
              <div key={index} className="achievement-item text-center">
                <div className={`text-5xl font-black exo mb-3 ${achievement.color}`}>
                  {achievement.value}
                </div>
                <div className="text-gray-300 text-xl font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black exo mb-8 glow-text text-orange-400">
            Ready to Forge Your Destiny?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join the elite ranks of warriors who refuse to settle for ordinary
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="ripple-effect bg-gradient-to-r from-orange-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transition-transform shadow-2xl">
              Start Your Journey
            </button>
            <button className="ripple-effect border-3 border-orange-400 text-orange-400 px-10 py-5 rounded-full text-xl font-bold hover:bg-orange-400 hover:text-black transition-all shadow-2xl">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Interactive Elements */}
      <InteractiveElements />
      
      {/* Floating Metrics */}
      <FloatingMetrics />
    </div>
  );
}

export default App;
