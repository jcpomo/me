import { useTranslations } from "next-intl";
import type { Education } from "@prisma/client";
import { localized, formatDateRange } from "@/lib/utils";

interface EducationSectionProps {
  education: Education[];
  locale: string;
}

export default function EducationSection({
  education,
  locale,
}: EducationSectionProps) {
  const t = useTranslations("sections");

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("education")}
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-primary" />
              <div className="bg-white rounded-lg p-6 border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {localized(edu, "degree", locale)}
                  </h3>
                  <span className="text-sm text-muted">
                    {formatDateRange(edu.startDate, edu.endDate, locale)}
                  </span>
                </div>
                <p className="text-primary font-medium mb-1">
                  {localized(edu, "institution", locale)}
                </p>
                <p className="text-sm text-muted mb-3">
                  {localized(edu, "location", locale)}
                </p>
                {(edu.descriptionEn || edu.descriptionDe) && (
                  <p className="text-muted leading-relaxed">
                    {localized(edu, "description", locale)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
