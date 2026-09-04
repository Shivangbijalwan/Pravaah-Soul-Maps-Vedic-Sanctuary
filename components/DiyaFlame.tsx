"use client";

import React from "react";

interface DiyaFlameProps {
  size?: "sm" | "md" | "lg" | "hero";
  showBase?: boolean;
  showHalo?: boolean;
  className?: string;
  label?: string;
}

export function DiyaFlame({
  size = "md",
  showBase = true,
  showHalo = true,
  className = "",
  label,
}: DiyaFlameProps) {
  const sizeMap = {
    sm: { container: "w-10 h-10", flameWidth: 20, flameHeight: 28, baseWidth: 32 },
    md: { container: "w-20 h-20", flameWidth: 36, flameHeight: 52, baseWidth: 56 },
    lg: { container: "w-36 h-36", flameWidth: 54, flameHeight: 80, baseWidth: 84 },
    hero: { container: "w-56 h-56 sm:w-64 sm:h-64", flameWidth: 70, flameHeight: 110, baseWidth: 110 },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Outer ambient radiant glow */}
      {showHalo && (
        <div
          className={`absolute rounded-full pointer-events-none ${
            size === "hero"
              ? "w-80 h-80 sm:w-96 sm:h-96 -top-12 opacity-90"
              : "w-full h-full inset-0 opacity-70"
          } diya-halo blur-2xl animate-flame-aura`}
        />
      )}

      {/* Stone / Altar Medallion for Hero */}
      {size === "hero" ? (
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#1C1917]/90 border border-[#292524] shadow-[0_0_50px_rgba(249,115,22,0.22)] flex flex-col items-center justify-center overflow-hidden">
          {/* Inner stone texture radial highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.25)_0%,rgba(234,179,8,0.1)_35%,transparent_70%)]" />

          {/* Diya SVG Assembly */}
          <div className="relative z-10 flex flex-col items-center pt-2">
            <svg
              width="100"
              height="115"
              viewBox="0 0 100 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <defs>
                {/* Flame Gradient */}
                <radialGradient id="heroFlameGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="28%" stopColor="#FEF08A" />
                  <stop offset="65%" stopColor="#F59E0B" />
                  <stop offset="92%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="innerCoreGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FEF08A" />
                  <stop offset="85%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                {/* Diya Base Bronze / Terracotta Gradient */}
                <linearGradient id="diyaDishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#573826" />
                  <stop offset="35%" stopColor="#7C4626" />
                  <stop offset="70%" stopColor="#4A2A1A" />
                  <stop offset="100%" stopColor="#2E1810" />
                </linearGradient>

                <linearGradient id="diyaRimHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#78350F" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#78350F" stopOpacity="0.4" />
                </linearGradient>

                <filter id="flameBlur" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Flame Outer Halo */}
              <circle cx="50" cy="42" r="28" fill="url(#heroFlameGlow)" opacity="0.35" className="animate-flame-aura" />

              {/* Living Flame / Jyoti */}
              <g className="animate-flame origin-bottom">
                {/* Outer Flame Contour */}
                <path
                  d="M50 8C48 22 34 36 34 52C34 65 41 73 50 73C59 73 66 65 66 52C66 36 52 22 50 8Z"
                  fill="url(#heroFlameGlow)"
                  filter="url(#flameBlur)"
                />

                {/* Inner Core Flame */}
                <path
                  d="M50 18C49 27 40 37 40 49C40 58 45 64 50 64C55 64 60 58 60 49C60 37 51 27 50 18Z"
                  fill="url(#innerCoreGradient)"
                />

                {/* Hot White Heart Tip */}
                <path
                  d="M50 26C49.5 32 44 39 44 47C44 52 47 56 50 56C53 56 56 52 56 47C56 39 50.5 32 50 26Z"
                  fill="#FFFFFF"
                  opacity="0.9"
                />
              </g>

              {/* Diya Clay / Brass Lamp Dish */}
              {showBase && (
                <g>
                  {/* Dish Body */}
                  <path
                    d="M18 70C24 86 76 86 82 70C74 74 62 76 50 76C38 76 26 74 18 70Z"
                    fill="url(#diyaDishGradient)"
                    stroke="#854D0E"
                    strokeWidth="0.75"
                  />
                  {/* Dish Lip / Rim */}
                  <ellipse cx="50" cy="70" rx="32" ry="5.5" fill="#3D2115" stroke="url(#diyaRimHighlight)" strokeWidth="1.2" />
                  {/* Oil pool reflection */}
                  <ellipse cx="50" cy="70.5" rx="22" ry="3.2" fill="#B45309" opacity="0.6" />
                  {/* Wick mount */}
                  <ellipse cx="50" cy="70.2" rx="4" ry="1.8" fill="#1C1917" />
                </g>
              )}
            </svg>

            {/* Label below flame inside circle */}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-semibold text-[#FACC15]/90 uppercase">
              <span className="text-[#F97316]">✦</span>
              <span>{label || "INNER LIGHT"}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Compact / Standard Diya icon */
        <div className={`relative ${currentSize.container} flex items-center justify-center`}>
          <svg
            width={currentSize.flameWidth}
            height={currentSize.flameHeight}
            viewBox="0 0 40 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id={`smFlame-${size}`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="40%" stopColor="#FACC15" />
                <stop offset="80%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>

            {/* Flame */}
            <g className="animate-flame">
              <path
                d="M20 4C19 12 11 20 11 29C11 36 15 41 20 41C25 41 29 36 29 29C29 20 21 12 20 4Z"
                fill={`url(#smFlame-${size})`}
              />
              <path
                d="M20 12C19.5 17 15 22 15 28C15 32 17.5 35 20 35C22.5 35 25 32 25 28C25 22 20.5 17 20 12Z"
                fill="#FFFFFF"
                opacity="0.8"
              />
            </g>

            {/* Small Diya base */}
            {showBase && (
              <g>
                <path
                  d="M6 39C10 48 30 48 34 39C30 41 25 42 20 42C15 42 10 41 6 39Z"
                  fill="#7C4626"
                />
                <ellipse cx="20" cy="39" rx="14" ry="2.8" fill="#4A2A1A" stroke="#B45309" strokeWidth="0.8" />
              </g>
            )}
          </svg>
        </div>
      )}
    </div>
  );
}

export default DiyaFlame;

