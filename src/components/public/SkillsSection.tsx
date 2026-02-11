import { useTranslations } from "next-intl";
import type { SkillCategory, Skill } from "@/generated/prisma/client";
import { localized } from "@/lib/utils";

type CategoryWithSkills = SkillCategory & { skills: Skill[] };

interface SkillsSectionProps {
  categories: CategoryWithSkills[];
  locale: string;
}

export default function SkillsSection({
  categories,
  locale,
}: SkillsSectionProps) {
  const t = useTranslations("sections");

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("skills")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-card rounded-lg p-6 border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {localized(cat, "name", locale)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
