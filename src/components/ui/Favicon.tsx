export function Favicon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      {/* Butterfly Body */}
      <path
        d="M16 16 L16 20"
        stroke="#2d5016"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Upper Wings */}
      <path
        d="M16 16 Q10 12 8 16 Q10 20 16 16"
        stroke="#2d5016"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 16 Q22 12 24 16 Q22 20 16 16"
        stroke="#2d5016"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Lower Wings */}
      <path
        d="M16 16 Q10 18 9 24 Q10 26 16 16"
        stroke="#2d5016"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 16 Q22 18 23 24 Q22 26 16 16"
        stroke="#2d5016"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Decorative curl on lower left wing */}
      <path
        d="M9 24 Q8 25 9 26"
        stroke="#2d5016"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
} 