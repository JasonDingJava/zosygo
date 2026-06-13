"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const languages: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  zh: { label: "中文", flag: "🇨🇳" },
  ja: { label: "日本語", flag: "🇯🇵" },
  ko: { label: "한국어", flag: "🇰🇷" },
  es: { label: "Español", flag: "🇪🇸" },
  fr: { label: "Français", flag: "🇫🇷" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  pt: { label: "Português", flag: "🇧🇷" },
  ru: { label: "Русский", flag: "🇷🇺" },
  ar: { label: "العربية", flag: "🇸🇦" },
  id: { label: "Bahasa Indonesia", flag: "🇮🇩" },
};

interface LanguageSwitcherProps {
  locale: string;
  className?: string;
}

export default function LanguageSwitcher({ locale, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Replace current locale in path
  const switchTo = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  };

  const current = languages[locale] || languages.en;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 rounded-sm border border-[#b8956a]/15 px-2.5 py-1.5 text-xs font-semibold tracking-wider text-zinc-400 transition-colors hover:border-[#c9a227]/30 hover:text-[#e8d5a3]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch language"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#12121a] py-1 shadow-2xl shadow-black/50"
        >
          {Object.entries(languages).map(([code, lang]) => (
            <li key={code}>
              <Link
                href={switchTo(code)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-white/5 ${
                  code === locale
                    ? "text-white bg-white/5"
                    : "text-zinc-400"
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
                {code === locale && (
                  <svg className="ml-auto h-3.5 w-3.5 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}