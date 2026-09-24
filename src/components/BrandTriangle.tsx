interface BrandTriangleProps {
  className?: string
  gradientId: string
  strokeWidth?: number
  opacity?: number
}

export default function BrandTriangle({
  className = '',
  gradientId,
  strokeWidth = 2,
  opacity = 1,
}: BrandTriangleProps) {
  return (
    <svg viewBox="0 0 200 180" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a7fdb" />
          <stop offset="55%" stopColor="#c04aa8" />
          <stop offset="100%" stopColor="#ee8620" />
        </linearGradient>
      </defs>
      <path
        d="M100 8 L188 168 L12 168 Z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        opacity={opacity}
      />
    </svg>
  )
}
