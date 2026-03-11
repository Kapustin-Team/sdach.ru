'use client'

export default function Marquee() {
  const items = ['ШОУФОРМАТ', 'ПОДКАСТЫ', 'СПЕЦПРОЕКТЫ', 'ПРОДАКШН', 'РЕАЛИТИ', 'ИНТЕРВЬЮ']
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {repeated.map((item, i) => (
          <span className="marquee__text" key={i}>
            <span className="marquee__separator">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
