import React from 'react';
import { Flame, Shield, Activity, TrendingUp, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900/60 to-black border-t border-orange-400/30">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-purple-600/10"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-4xl font-black exo glow-text text-orange-400 mb-6">
                FIT<span className="text-purple-400">FORGE</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Elite training academy where warriors are forged through discipline, innovation, and relentless pursuit of excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-orange-400">
                <Flame size={18} />
                <span className="text-sm font-medium">Warrior Mindset</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Shield size={18} />
                <span className="text-sm font-medium">Elite Coaching</span>
              </div>
              <div className="flex items-center gap-2 text-pink-400">
                <Activity size={18} />
                <span className="text-sm font-medium">Peak Performance</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <TrendingUp size={18} />
                <span className="text-sm font-medium">Continuous Growth</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, color: 'text-pink-400' },
                { icon: Twitter, color: 'text-blue-400' },
                { icon: Facebook, color: 'text-blue-500' },
                { icon: Youtube, color: 'text-red-400' }
              ].map((social, index) => (
                <button
                  key={index}
                  className={`${social.color} hover:scale-125 transition-transform duration-300 p-3 rounded-full glass-dark hover:bg-white/10`}
                >
                  <social.icon size={22} />
                </button>
              ))}
            </div>
          </div>

          {/* Training Programs */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-8 exo">Training Programs</h4>
            <ul className="space-y-4">
              {[
                'Warrior Elite',
                'Beast Mode',
                'Phoenix Rising',
                'Titan Forge',
                'Combat Training',
                'Elite Coaching'
              ].map((program, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-3 text-lg">
                    <Flame size={14} className="text-orange-400" />
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-8 exo">Academy</h4>
            <ul className="space-y-4">
              {[
                'About FitForge',
                'Our Philosophy',
                'Elite Coaches',
                'Success Stories',
                'Warrior Community',
                'Partnership Program'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-8 exo">Contact</h4>
            
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4 text-gray-300">
                <Mail size={18} className="text-orange-400" />
                <span className="text-lg">forge@fitforge.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Phone size={18} className="text-purple-400" />
                <span className="text-lg">+1 (555) WARRIOR</span>
              </div>
              <div className="flex items-start gap-4 text-gray-300">
                <MapPin size={18} className="text-pink-400 mt-1" />
                <span className="text-lg">789 Elite Blvd<br />Warrior City, WC 12345</span>
              </div>
            </div>

            <div>
              <h5 className="text-xl font-bold text-white mb-4 exo">Support</h5>
              <ul className="space-y-3">
                {[
                  'Training Support',
                  'Membership Info',
                  'Program Guide',
                  'FAQ'
                ].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="glass-dark rounded-3xl p-10 mb-16 border-2 border-orange-400/30">
          <div className="text-center mb-8">
            <h4 className="text-3xl font-black exo text-orange-400 mb-3">Join the Elite</h4>
            <p className="text-gray-300 text-xl">Get exclusive training tips and warrior mindset content</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your warrior email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border-2 border-orange-400/40 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 text-lg"
            />
            <button className="ripple-effect bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform text-lg">
              Join Elite
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-lg">
              © 2025 FitForge Elite Academy. All rights reserved. | Forge your destiny.
            </div>
            
            <div className="flex gap-8 text-lg">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Accessibility'
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-12 right-12 opacity-30">
          <Flame size={28} className="text-orange-400 animate-pulse" />
        </div>
        <div className="absolute bottom-24 left-12 opacity-30">
          <Shield size={24} className="text-purple-400 animate-bounce" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;