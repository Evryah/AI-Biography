import React from 'react';

interface BrandLogoProps {
  variant?: 'hero' | 'mobile';
  className?: string;
}

export default function BrandLogo({ variant = 'hero', className = '' }: BrandLogoProps) {
  const isHero = variant === 'hero';

  // Base colors for SVG
  const navyColor = isHero ? '#ffffff' : '#0A1128';
  const goldColor = '#C5A880';

  // Setup exact dandelion points and angles
  const cx = 55;
  const cy = 48;
  const seedAngles = [
    -180, -165, -150, -135, -120, -105, -90, -75, -60,
    180, 165, 150, 135, 120, 105, 90, 75, 60,
    -172, -157, -142, -127, -112, -97, -82,
    172, 157, 142, 127, 112, 97, 82,
    -150, -130, -110, -90, 150, 130, 110, 90
  ];

  const blowingSeeds = [
    { startX: 74, startY: 38, endX: 84, endY: 28, scale: 0.9, angle: -45 },
    { startX: 86, startY: 44, endX: 96, endY: 34, scale: 0.8, angle: -42 },
    { startX: 88, startY: 26, endX: 98, endY: 16, scale: 0.95, angle: -50 },
    { startX: 98, startY: 36, endX: 108, endY: 26, scale: 0.85, angle: -40 },
    { startX: 106, startY: 18, endX: 116, endY: 8, scale: 1.0, angle: -48 },
    { startX: 112, startY: 32, endX: 122, endY: 22, scale: 0.75, angle: -45 },
  ];

  const goldStars = [
    { x: 125, y: 12, size: 5 }, // Preeminent goal star
    { x: 110, y: 20, size: 2 },
    { x: 102, y: 9, size: 1.8 },
    { x: 94, y: 26, size: 1.5 },
    { x: 84, y: 15, size: 1.6 },
    { x: 74, y: 32, size: 1.4 },
  ];

  const corePetals = [
    { r: 2.2, a: -150 }, { r: 2.5, a: -120 }, { r: 2.4, a: -90 },
    { r: 2.2, a: -60 }, { r: 2.5, a: 150 }, { r: 2.4, a: 120 },
    { r: 2.3, a: 90 }, { r: 2.2, a: 60 }
  ];

  if (isHero) {
    // Elegant left hero banner display
    return (
      <div className={`flex flex-col items-start gap-4 select-none ${className}`}>
        {/* Dynamic Vector Brand Icon with Dandelion and flying star seeds */}
        <div className="flex gap-3 items-center">
          <svg
            viewBox="0 0 140 100"
            fill="none"
            className="w-[62px] h-[45px] text-white"
          >
            {/* Stem */}
            <path
              d="M 55 48 Q 50 78 44 100"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center receptacle */}
            <circle cx={cx} cy={cy} r="3.2" fill={goldColor} />
            <circle cx={cx} cy={cy} r="1.5" fill={isHero ? '#1C2541' : '#ffffff'} />

            {/* Receptacle petal accents */}
            {corePetals.map((p, i) => {
              const rad = (p.a * Math.PI) / 180;
              const px = cx + p.r * Math.cos(rad);
              const py = cy + p.r * Math.sin(rad);
              return (
                <ellipse
                  key={` petal-hero-${i}`}
                  cx={px}
                  cy={py}
                  rx="0.9"
                  ry="1.8"
                  transform={`rotate(${p.a + 90}, ${px}, ${py})`}
                  fill={goldColor}
                />
              );
            })}

            {/* Main Seed Head and radiating seed strokes */}
            {seedAngles.map((angle, index) => {
              const rad = (angle * Math.PI) / 180;
              const length = 16 + (index % 3) * 2;
              const endX = cx + length * Math.cos(rad);
              const endY = cy + length * Math.sin(rad);

              return (
                <g key={`seed-hero-${index}`}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={endX}
                    y2={endY}
                    stroke="currentColor"
                    strokeWidth="0.55"
                  />
                  <circle
                    cx={cx + 3 * Math.cos(rad)}
                    cy={cy + 3 * Math.sin(rad)}
                    r="0.8"
                    fill={goldColor}
                  />
                  <path
                    d={`M ${endX - 3.5 * Math.sin(rad)} ${endY + 3.5 * Math.cos(rad)} 
                        Q ${endX} ${endY} 
                        ${endX + 3.5 * Math.sin(rad)} ${endY - 3.5 * Math.cos(rad)}`}
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <path
                    d={`M ${endX - 2.5 * Math.cos(rad + 0.4)} ${endY - 2.5 * Math.sin(rad + 0.4)} 
                        L ${endX} ${endY} 
                        L ${endX - 2.5 * Math.cos(rad - 0.4)} ${endY - 2.5 * Math.sin(rad - 0.4)}`}
                    stroke="currentColor"
                    strokeWidth="0.4"
                  />
                </g>
              );
            })}

            {/* Flying seeds drifting to upper right */}
            {blowingSeeds.map((seed, index) => {
              const rad = (seed.angle * Math.PI) / 180;
              const { startX, startY, endX, endY } = seed;

              return (
                <g key={`blowing-hero-${index}`}>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <circle cx={startX} cy={startY} r="0.7" fill={goldColor} />
                  <path
                    d={`M ${endX - (3 * seed.scale) * Math.sin(rad)} ${endY + (3 * seed.scale) * Math.cos(rad)} 
                        Q ${endX} ${endY} 
                        ${endX + (3 * seed.scale) * Math.sin(rad)} ${endY - (3 * seed.scale) * Math.cos(rad)}`}
                    stroke="currentColor"
                    strokeWidth="0.45"
                  />
                  <path
                    d={`M ${endX - (2.5 * seed.scale) * Math.cos(rad + 0.4)} ${endY - (2.5 * seed.scale) * Math.sin(rad + 0.4)} 
                        L ${endX} ${endY} 
                        L ${endX - (2.5 * seed.scale) * Math.cos(rad - 0.4)} ${endY - (2.5 * seed.scale) * Math.sin(rad - 0.4)}`}
                    stroke="currentColor"
                    strokeWidth="0.4"
                  />
                </g>
              );
            })}

            {/* Stars rendering */}
            {goldStars.map((star, index) => {
              const points = [];
              const outerRadius = star.size;
              const innerRadius = star.size / 2.3;
              for (let i = 0; i < 10; i++) {
                const angle = (i * Math.PI) / 5 - Math.PI / 2;
                const r = i % 2 === 0 ? outerRadius : innerRadius;
                points.push(`${star.x + r * Math.cos(angle)},${star.y + r * Math.sin(angle)}`);
              }
              return (
                <polygon
                  key={`star-hero-${index}`}
                  points={points.join(" ")}
                  fill={goldColor}
                />
              );
            })}
          </svg>

          {/* Core Wordmark and Subtitle in perfect alignment */}
          <div className="flex flex-col items-start justify-center translate-y-0.5">
            <h1 className="font-cinzel text-base font-bold tracking-[0.3em] text-white leading-none">
              XINGHUOJI
            </h1>
            
            {/* Elegant horizontal line with centered four-pointed star */}
            <div className="w-full flex items-center gap-1.5 py-1">
              <span className="flex-1 h-[1px] bg-legacy-gold/30" />
              <div className="w-2 h-2 relative flex items-center justify-center">
                {/* 4-pointed CSS/SVG star */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-legacy-gold fill-current">
                  <path d="M 50 0 L 58 42 L 100 50 L 58 58 L 50 100 L 42 58 L 0 50 L 42 42 Z" />
                </svg>
              </div>
              <span className="flex-1 h-[1px] bg-legacy-gold/30" />
            </div>

            <p className="font-cinzel text-xs tracking-[0.2em] block text-legacy-gold font-light mt-0.5 uppercase leading-none">
              AI BIOGRAPHY & LEGACY
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Elegant Mobile / Dark mode variant logo
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="flex gap-2 items-center">
        <svg
          viewBox="0 0 140 100"
          fill="none"
          className="w-[62px] h-[45px] text-legacy-navy"
        >
          {/* Stem */}
          <path
            d="M 55 48 Q 50 78 44 100"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="3.2" fill={goldColor} />
          <circle cx={cx} cy={cy} r="1.5" fill="#ffffff" />

          {/* Receptacle petal accents */}
          {corePetals.map((p, i) => {
            const rad = (p.a * Math.PI) / 180;
            const px = cx + p.r * Math.cos(rad);
            const py = cy + p.r * Math.sin(rad);
            return (
              <ellipse
                key={`petal-mobile-${i}`}
                cx={px}
                cy={py}
                rx="0.9"
                ry="1.8"
                transform={`rotate(${p.a + 90}, ${px}, ${py})`}
                fill={goldColor}
              />
            );
          })}

          {/* Main Seed Head */}
          {seedAngles.map((angle, index) => {
            const rad = (angle * Math.PI) / 180;
            const length = 16 + (index % 3) * 2;
            const endX = cx + length * Math.cos(rad);
            const endY = cy + length * Math.sin(rad);

            return (
              <g key={`seed-mobile-${index}`}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={endX}
                  y2={endY}
                  stroke="currentColor"
                  strokeWidth="0.6"
                />
                <circle
                  cx={cx + 3 * Math.cos(rad)}
                  cy={cy + 3 * Math.sin(rad)}
                  r="0.8"
                  fill={goldColor}
                />
                <path
                  d={`M ${endX - 3.5 * Math.sin(rad)} ${endY + 3.5 * Math.cos(rad)} 
                      Q ${endX} ${endY} 
                      ${endX + 3.5 * Math.sin(rad)} ${endY - 3.5 * Math.cos(rad)}`}
                  stroke="currentColor"
                  strokeWidth="0.55"
                />
              </g>
            );
          })}

          {/* Flying seeds */}
          {blowingSeeds.map((seed, index) => {
            const rad = (seed.angle * Math.PI) / 180;
            const { startX, startY, endX, endY } = seed;

            return (
              <g key={`blowing-mobile-${index}`}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="currentColor"
                  strokeWidth="0.65"
                />
                <circle cx={startX} cy={startY} r="0.7" fill={goldColor} />
              </g>
            );
          })}

          {/* Stars */}
          {goldStars.map((star, index) => {
            const points = [];
            const outerRadius = star.size;
            const innerRadius = star.size / 2.3;
            for (let i = 0; i < 10; i++) {
              const angle = (i * Math.PI) / 5 - Math.PI / 2;
              const r = i % 2 === 0 ? outerRadius : innerRadius;
              points.push(`${star.x + r * Math.cos(angle)},${star.y + r * Math.sin(angle)}`);
            }
            return (
              <polygon
                key={`star-mobile-${index}`}
                points={points.join(" ")}
                fill={goldColor}
              />
            );
          })}
        </svg>

        {/* Text brand */}
        <div className="flex flex-col items-start translate-y-0.5">
          <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-legacy-navy leading-none">
            XINGHUOJI
          </span>
          <span className="text-[6.5px] tracking-[0.15em] block text-legacy-gold font-bold uppercase mt-1 leading-none">
            AI BIOGRAPHY & LEGACY
          </span>
        </div>
      </div>
    </div>
  );
}
