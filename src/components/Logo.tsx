export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background blob shape */}
      <path
        d="M50 5C72 5 95 18 95 50C95 82 72 95 50 95C28 95 5 82 5 50C5 18 28 5 50 5Z"
        fill="url(#logoGradient)"
      />
      
      {/* Abstract hash/network symbol */}
      <g transform="translate(25, 25)">
        {/* Vertical bars with rounded caps */}
        <rect x="10" y="8" width="8" height="34" fill="#FACC15" rx="4" />
        <rect x="32" y="8" width="8" height="34" fill="#2DD4BF" rx="4" />
        
        {/* Horizontal bars with rounded caps */}
        <rect x="8" y="10" width="34" height="8" fill="#FB923C" rx="4" />
        <rect x="8" y="32" width="34" height="8" fill="#3B82F6" rx="4" />
        
        {/* Center connection point */}
        <circle cx="25" cy="25" r="6" fill="#FFFFFF" />
        <circle cx="25" cy="25" r="3" fill="#8B5CF6" />
      </g>
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
