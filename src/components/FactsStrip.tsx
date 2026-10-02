const FACTS = [
  { title: 'CAC registered', text: 'Operating since October 2023' },
  { title: 'Based in Abuja', text: 'Nationwide coverage' },
  { title: '8 ICT services', text: 'Under one roof' },
  { title: 'On-site & remote', text: 'Support wherever you are' },
]

export default function FactsStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-ink-100 bg-white dark:border-white/10 dark:bg-ink-900/60">
      <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {FACTS.map((f) => (
          <div key={f.title} className="py-5 pr-4 lg:border-r lg:border-ink-100 lg:px-6 lg:first:pl-0 lg:last:border-0 dark:lg:border-white/10">
            <dt className="font-display text-[16px] font-semibold text-ink-950 dark:text-white">{f.title}</dt>
            <dd className="mt-0.5 text-[13.5px] text-ink-500 dark:text-ink-300">{f.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
