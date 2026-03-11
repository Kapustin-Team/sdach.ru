'use client'

export default function GradientBackground({ variant = 'hero' }) {
  const circles = variant === 'hero'
    ? [
        { size: 400, color: '#4a5ac1', top: '10%', left: '20%', duration: '18s', delay: '0s' },
        { size: 300, color: '#07124b', top: '40%', left: '60%', duration: '22s', delay: '-5s' },
        { size: 350, color: '#1a2a6c', top: '60%', left: '10%', duration: '20s', delay: '-10s' },
      ]
    : [
        { size: 350, color: '#4a5ac1', top: '20%', left: '70%', duration: '20s', delay: '0s' },
        { size: 300, color: '#07124b', top: '50%', left: '30%', duration: '25s', delay: '-8s' },
      ]

  return (
    <div className="gradient-bg" aria-hidden="true">
      {circles.map((c, i) => (
        <div
          key={i}
          className="gradient-circle"
          style={{
            width: c.size,
            height: c.size,
            background: c.color,
            top: c.top,
            left: c.left,
            animationDuration: c.duration,
            animationDelay: c.delay,
          }}
        />
      ))}
    </div>
  )
}
