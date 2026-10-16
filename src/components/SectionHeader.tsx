type SectionHeaderProps = {
  label: string
  title: string
  intro?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({ label, title, intro, tone = 'light', className = '' }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${className}`.trim()}>
      <p className="section-label">{label}</p>
      <h2 className={`section-title${tone === 'dark' ? ' text-brand-white' : ''}`}>{title}</h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-8 sm:text-lg ${
            tone === 'dark' ? 'text-brand-beige/85' : 'text-brand-gray'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
