import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

const FloatingMetrics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.7, y: 80, rotation: 10 },
        { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }, [isVisible]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (panelRef.current) {
      setIsDragging(true);
      const rect = panelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.7,
        y: 80,
        rotation: -10,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => setIsVisible(false)
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className="floating-metrics"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-orange-400 exo">Live Metrics</h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Power Output</span>
          <span className="text-sm font-bold text-orange-400">850W</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Heart Rate</span>
          <span className="text-sm font-bold text-purple-400">165 BPM</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Calories Burned</span>
          <span className="text-sm font-bold text-pink-400">420</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Training Zone</span>
          <span className="text-sm font-bold text-blue-400">Beast Mode</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Session Time</span>
          <span className="text-sm font-bold text-green-400">52 min</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-orange-400/30">
        <div className="text-xs text-gray-400 text-center">
          Drag to reposition • Real-time data
        </div>
      </div>
    </div>
  );
};

export default FloatingMetrics;