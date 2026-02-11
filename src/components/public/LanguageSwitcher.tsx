"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: "en" | "de") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          locale === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => switchLocale("de")}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          locale === "de"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        DE
      </button>
    </div>
  );
}
