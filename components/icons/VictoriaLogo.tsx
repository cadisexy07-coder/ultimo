
import React from 'react';

const VictoriaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Globe Grid - White (inherited from currentColor) */}
    <g strokeWidth="4">
      <circle cx="50" cy="50" r="42" />
      <path d="M50 8 C30 8 12 30 12 50 C12 70 30 92 50 92" />
      <path d="M50 8 C70 8 88 30 88 50 C88 70 70 92 50 92" />
      <path d="M8 50 L92 50" />
      <path d="M18 25 L82 25" />
      <path d="M18 75 L82 75" />
    </g>

    {/* Swoosh - Flight Path */}
    <path
      d="M10 75 Q 45 95 70 60 T 95 15"
      strokeWidth="6"
      className="text-amber-500" 
      stroke="currentColor" // Uses current color (white) as requested, or can be overridden
    />

    {/* Plane Icon */}
    <path
      d="M85 25 L 90 10 L 96 12 L 92 30 L 85 35 L 82 42 L 78 40 L 80 32 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export default VictoriaLogo;
