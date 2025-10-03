
import React from 'react';

const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 01.707.293l2 2a1 1 0 11-1.414 1.414l-2-2A1 1 0 0110 18zm-4.707-3.293a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0zM15 12a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M4 5a2 2 0 100 4 2 2 0 000-4zM2 5a4 4 0 118 0 4 4 0 01-8 0z" />
  </svg>
);

export default FireIcon;
