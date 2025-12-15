
import React from 'react';

const HotelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22h20" />
    <path d="M3 11v9h5v-5h6v5h5v-9L12 3 3 11z" />
    <path d="M12 9v4" />
    <path d="M9 17h6" />
  </svg>
);

export default HotelIcon;
