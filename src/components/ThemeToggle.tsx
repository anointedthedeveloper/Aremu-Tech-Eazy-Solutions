import { useTheme } from '../lib/theme'
import { IconMoon, IconSun } from './icons'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-ink-50 text-ink-700 transition-colors hover:bg-violet-100 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/15 dark:hover:text-white ${className}`}
    >
      {isDark ? <IconSun className="h-[18px] w-[18px]" /> : <IconMoon className="h-[18px] w-[18px]" />}
    </button>
  )
}
