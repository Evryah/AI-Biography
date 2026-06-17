import React from 'react';

interface BrandLogoProps {
  variant?: 'hero' | 'mobile';
  className?: string;
}

export default function BrandLogo({ variant = 'hero', className = '' }: BrandLogoProps) {
  const isHero = variant === 'hero';

  // Base colors mapped to the dark/light panels
  const textColor = isHero ? '#ffffff' : '#0A1128';
  const stemColor = isHero ? 'rgba(255, 255, 255, 0.85)' : '#0A1128';
  const goldColor = '#C5A880';

  // Center of the main dandelion head
  const cx = 85;
  const cy = 95;

  // Generate dense dandelion seeds on left half of the sphere
  const radiatingSeeds = [];
  // -235 to 55 degrees leaves a beautifully natural opening on the upper right side for blowing seeds to detach
  for (let angleDeg = -235; angleDeg <= 55; angleDeg += 8) {
    const rad = (angleDeg * Math.PI) / 180;
    // Vary length slightly for organic feathering
    const length = 32 + Math.sin(angleDeg * 5) * 2;
    const endX = cx + length * Math.cos(rad);
    const endY = cy + length * Math.sin(rad);
    
    // Some seeds on the blowing edge are gold, the rest use the base stem color
    const isGoldSeed = angleDeg > 15 && angleDeg < 50;
    radiatingSeeds.push({
      x2: endX,
      y2: endY,
      rad,
      color: isGoldSeed ? goldColor : stemColor,
    });
  }

  // Exact coordinates for drifting/blowing seeds arching to the upper right
  const blowingSeeds = [
    { x1: 125, y1: 85, x2: 155, y2: 60, color: stemColor },
    { x1: 145, y1: 100, x2: 180, y2: 75, color: goldColor },
    { x1: 185, y1: 72, x2: 220, y2: 48, color: stemColor },
    { x1: 235, y1: 58, x2: 270, y2: 34, color: stemColor },
    { x1: 275, y1: 76, x2: 310, y2: 52, color: goldColor },
    { x1: 315, y1: 62, x2: 350, y2: 38, color: stemColor },
    { x1: 365, y1: 80, x2: 400, y2: 56, color: stemColor },
    { x1: 410, y1: 90, x2: 445, y2: 66, color: goldColor },
  ];

  // Scattering of minor luxury gold stars and dust sparkles
  const fourPointStars = [
    { x: 250, y: 65, w: 5, h: 8 },
    { x: 370, y: 50, w: 6, h: 9 },
    { x: 415, y: 60, w: 4, h: 7 },
    { x: 340, y: 78, w: 4, h: 6 },
  ];

  const goldDots = [
    { x: 195, y: 80, r: 1.2 },
    { x: 225, y: 48, r: 0.9 },
    { x: 290, y: 42, r: 1.4 },
    { x: 330, y: 63, r: 1.1 },
    { x: 385, y: 40, r: 0.8 },
    { x: 430, y: 46, r: 1.2 },
    { x: 460, y: 68, r: 1.0 },
  ];

  // Helper to render high-fidelity 4-pointed stars with curved inner corners
  const renderFourPointStar = (x: number, y: number, w: number, h: number, color: string) => {
    return (
      <path
        d={`M ${x} ${y - h} 
            Q ${x} ${y} ${x + w} ${y} 
            Q ${x} ${y} ${x} ${y + h} 
            Q ${x} ${y} ${x - w} ${y} 
            Q ${x} ${y} ${x} ${y - h}`}
        fill={color}
      />
    );
  };

  // Helper to render a 5-pointed star
  const renderFivePointStar = (centerX: number, centerY: number, outerR: number, innerR: number, color: string) => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      points.push(`${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`);
    }
    return <polygon points={points.join(' ')} fill={color} />;
  };

  // Render wind parachute fluff for dandelion seed tip
  const renderParachute = (endX: number, endY: number, rad: number, color: string) => {
    return (
      <g>
        <line
          x1={endX}
          y1={endY}
          x2={endX - 3.2 * Math.cos(rad + 0.35)}
          y2={endY - 3.2 * Math.sin(rad + 0.35)}
          stroke={color}
          strokeWidth="0.45"
        />
        <line
          x1={endX}
          y1={endY}
          x2={endX - 3.6 * Math.cos(rad)}
          y2={endY - 3.6 * Math.sin(rad)}
          stroke={color}
          strokeWidth="0.45"
        />
        <line
          x1={endX}
          y1={endY}
          x2={endX - 3.2 * Math.cos(rad - 0.35)}
          y2={endY - 3.2 * Math.sin(rad - 0.35)}
          stroke={color}
          strokeWidth="0.45"
        />
      </g>
    );
  };

  // SVG Size matching for Left Hero Banner vs Header Form Box
  const svgClasses = isHero 
    ? "w-full max-w-[340px] md:max-w-[420px] h-auto text-white" 
    : "w-full max-w-[210px] sm:max-w-[240px] h-auto text-legacy-navy";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 520 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClasses}
      >
        {/* Curved stem of main dandelion */}
        <path
          d="M 85 95 Q 73 145 75 185"
          stroke={stemColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Dense head radiating seeds */}
        {radiatingSeeds.map((seed, index) => (
          <g key={`head-seed-${index}`}>
            <line
              x1={cx}
              y1={cy}
              x2={seed.x2}
              y2={seed.y2}
              stroke={seed.color}
              strokeWidth="0.55"
            />
            {/* Seed base kernel dot */}
            <circle
              cx={cx + 3.5 * Math.cos(seed.rad)}
              cy={cy + 3.5 * Math.sin(seed.rad)}
              r="0.65"
              fill={seed.color === goldColor ? goldColor : stemColor}
            />
            {/* Parachute tick hairs at tip */}
            {renderParachute(seed.x2, seed.y2, seed.rad, seed.color)}
          </g>
        ))}

        {/* Center receptacle hub */}
        <circle cx={cx} cy={cy} r="4.8" fill={goldColor} />
        <circle cx={cx} cy={cy} r="2.2" fill={isHero ? '#1C2541' : '#ffffff'} />

        {/* Blowing seeds drifting away */}
        {blowingSeeds.map((seed, index) => {
          const dx = seed.x2 - seed.x1;
          const dy = seed.y2 - seed.y1;
          const rad = Math.atan2(dy, dx);
          return (
            <g key={`blown-seed-${index}`}>
              <line
                x1={seed.x1}
                y1={seed.y1}
                x2={seed.x2}
                y2={seed.y2}
                stroke={seed.color}
                strokeWidth="0.65"
              />
              <circle cx={seed.x1} cy={seed.y1} r="0.7" fill={seed.color} />
              {renderParachute(seed.x2, seed.y2, rad, seed.color)}
            </g>
          );
        })}

        {/* Minor sky stars & sparkles */}
        {fourPointStars.map((star, index) => (
          <React.Fragment key={`sky-star-${index}`}>
            {renderFourPointStar(star.x, star.y, star.w, star.h, goldColor)}
          </React.Fragment>
        ))}

        {goldDots.map((dot, index) => (
          <circle key={`sky-dot-${index}`} cx={dot.x} cy={dot.y} r={dot.r} fill={goldColor} />
        ))}

        {/* Preeminent Star (5-pointed) */}
        {renderFivePointStar(455, 45, 6.5, 2.8, goldColor)}

        {/* WORDMARK "XINGHUOJI" */}
        <text
          x="160"
          y="140"
          fontFamily="'Cinzel', serif"
          fontWeight="700"
          fontSize="41"
          fill={textColor}
          style={{ letterSpacing: '0.23em' }}
        >
          XINGHUOJI
        </text>

        {/* Split separator horizontal lines */}
        <line x1="160" y1="160" x2="312" y2="160" stroke={goldColor} strokeWidth="0.8" opacity="0.6" />
        {renderFourPointStar(328, 160, 4.5, 6, goldColor)}
        <line x1="344" y1="160" x2="480" y2="160" stroke={goldColor} strokeWidth="0.8" opacity="0.6" />

        {/* SUBTITLE */}
        <text
          x="160"
          y="182"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="10.8"
          fill={isHero ? 'rgba(255, 255, 255, 0.72)' : 'rgba(10, 17, 40, 0.72)'}
          style={{ letterSpacing: '0.21em' }}
        >
          AI BIOGRAPHY & DIGITAL LEGACY PLATFORM
        </text>
      </svg>
    </div>
  );
}
