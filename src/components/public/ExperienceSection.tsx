import { useTranslations } from "next-intl";
import type { Experience } from "@/generated/prisma/client";
import { localized, formatDateRange } from "@/lib/utils";

interface ExperienceSectionProps {
  experiences: Experience[];
  locale: string;
}

export default function ExperienceSection({
  experiences,
  locale,
}: ExperienceSectionProps) {
  const t = useTranslations("sections");

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("experience")}
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-primary" />
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {localized(exp, "position", locale)}
                  </h3>
                  <span className="text-sm text-muted">
                    {formatDateRange(exp.startDate, exp.endDate, locale)}
                  </span>
                </div>
                <p className="text-primary font-medium mb-1">
                  {exp.companyName}
                </p>
                <p className="text-sm text-muted mb-3">
                  {localized(exp, "location", locale)}
                </p>
                <p className="text-muted leading-relaxed">
                  {localized(exp, "description", locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
