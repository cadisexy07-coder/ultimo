
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
    {/* Globe Grid */}
    <g strokeWidth="2">
      <circle cx="50" cy="50" r="40" />
      <path d="M50 10 C35 10 20 28 20 50 C20 72 35 90 50 90" />
      <path d="M50 10 C65 10 80 28 80 50 C80 72 65 90 50 90" />
      <path d="M14 50 H 86" />
      <path d="M22 30 H 78" />
      <path d="M22 70 H 78" />
    </g>

    {/* Swoosh - Red/Orange - Trajectory */}
    <path
      d="M 15 75 Q 50 95 90 20"
      stroke="#EA580C" 
      strokeWidth="4"
      fill="none"
    />

    {/* Plane */}
    <path
      d="M 88 22 L 86 12 L 92 14 L 95 24 L 98 26 L 94 28 L 88 26 Z"
      fill="currentColor"
      stroke="none"
      transform="rotate(-15 90 20)"
    />
  </svg>
);

export default VictoriaLogo;
