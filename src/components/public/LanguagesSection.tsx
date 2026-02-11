import { useTranslations } from "next-intl";
import type { Language } from "@prisma/client";
import { localized } from "@/lib/utils";

interface LanguagesSectionProps {
  languages: Language[];
  locale: string;
}

export default function LanguagesSection({
  languages,
  locale,
}: LanguagesSectionProps) {
  const t = useTranslations("sections");

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("languages")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="bg-white rounded-lg p-6 border border-border text-center"
            >
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {localized(lang, "name", locale)}
              </h3>
              <p className="text-muted">
                {localized(lang, "level", locale)}
              </p>
              {lang.cefrLevel && (
                <span className="inline-block mt-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                  {lang.cefrLevel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
