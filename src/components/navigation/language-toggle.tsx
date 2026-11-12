'use client';

/**
 * PT | EN pill toggle — sits next to the theme toggle in the header.
 * Same visual language as the rest of the header controls: Fira Code,
 * neutral surfaces, #8A00C4 accent for the active segment.
 */

import { useLanguage } from '@/lib/i18n/language-context';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="PT / EN — alternar idioma"
      title="PT / EN"
      className="flex items-center gap-0.5 h-8 px-0.5 rounded-full border transition-all duration-300 dark:bg-white/5 bg-black/5 dark:border-neutral-800 border-neutral-200 dark:hover:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 dark:hover:shadow-[0_0_12px_rgba(195,228,29,0.2)]"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
          locale === 'pt'
            ? 'bg-[#8A00C4] text-black'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-[#8A00C4]'
        }`}
      >
        PT
      </span>
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
          locale === 'en'
            ? 'bg-[#8A00C4] text-black'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-[#8A00C4]'
        }`}
      >
        EN
      </span>
    </button>
  );
}
