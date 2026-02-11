import { useTranslations } from "next-intl";
import type { Profile } from "@/generated/prisma/client";
import { localized } from "@/lib/utils";

interface AboutSectionProps {
  profile: Profile;
  locale: string;
}

export default function AboutSection({ profile, locale }: AboutSectionProps) {
  const t = useTranslations("sections");

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">{t("about")}</h2>
        <p className="text-lg text-muted leading-relaxed max-w-3xl">
          {localized(profile, "summary", locale)}
        </p>
      </div>
    </section>
  );
}
