"use client";

import { useEffect, useState } from 'react';

export function WeatherAnimation() {
  const [raindrops, setRaindrops] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generar gotas de lluvia con posiciones y delays aleatorios
    const drops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 rounded-lg overflow-hidden">
      {/* Estrellas/copos de nieve */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* SVG Principal */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo de fondo con pulso */}
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="white"
          opacity="0.2"
          className="animate-pulse-slow"
        />
        
        {/* Sol */}
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: '200px 160px' }}>
          <circle cx="200" cy="160" r="35" fill="white" opacity="0.9" />
          {/* Rayos del sol */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 45;
            const y1 = 160 + Math.sin(angle) * 45;
            const x2 = 200 + Math.cos(angle) * 60;
            const y2 = 160 + Math.sin(angle) * 60;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
            );
          })}
        </g>

        {/* Nube */}
        <g className="animate-float">
          <ellipse cx="200" cy="220" rx="50" ry="30" fill="white" opacity="0.95" />
          <ellipse cx="170" cy="210" rx="35" ry="25" fill="white" opacity="0.95" />
          <ellipse cx="230" cy="210" rx="35" ry="25" fill="white" opacity="0.95" />
          <ellipse cx="200" cy="200" rx="40" ry="28" fill="white" opacity="0.95" />
        </g>

        {/* Rayos */}
        <g className="animate-lightning">
          <path
            d="M 185 240 L 175 260 L 185 260 L 175 280"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 200 245 L 190 265 L 200 265 L 190 285"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 215 240 L 205 260 L 215 260 L 205 280"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Gotas de lluvia animadas */}
        {raindrops.map((drop) => (
          <line
            key={drop.id}
            x1={`${150 + drop.x}%`}
            y1="250"
            x2={`${150 + drop.x}%`}
            y2="260"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-rain"
            style={{ animationDelay: `${drop.delay}s` }}
          />
        ))}
      </svg>

      {/* Texto */}
      <div className="absolute bottom-8 text-center">
        <h3 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
          Global Weather Watch
        </h3>
      </div>

      {/* Brújula */}
      <div className="absolute bottom-6 left-6">
        <svg width="50" height="50" viewBox="0 0 50 50" className="opacity-40">
          <circle cx="25" cy="25" r="23" fill="none" stroke="white" strokeWidth="2" />
          <text x="25" y="10" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N</text>
          <text x="25" y="45" textAnchor="middle" fill="white" fontSize="10">S</text>
          <text x="8" y="28" textAnchor="middle" fill="white" fontSize="10">W</text>
          <text x="42" y="28" textAnchor="middle" fill="white" fontSize="10">E</text>
          <line x1="25" y1="15" x2="25" y2="35" stroke="white" strokeWidth="2" />
          <line x1="15" y1="25" x2="35" y2="25" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* Icono decorativo */}
      <div className="absolute bottom-6 right-6 opacity-30">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            d="M 25 10 Q 35 20 25 30 Q 15 20 25 10 M 25 20 Q 30 25 25 35 Q 20 25 25 20"
            fill="white"
            opacity="0.5"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rain {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }

        @keyframes lightning {
          0%, 45%, 55%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-rain {
          animation: rain 1.5s linear infinite;
        }

        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
