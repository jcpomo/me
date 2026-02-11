import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Profile } from "@prisma/client";
import { localized } from "@/lib/utils";

interface HeroSectionProps {
  profile: Profile;
  locale: string;
}

export default function HeroSection({ profile, locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="shrink-0">
          <Image
            src={profile.photoUrl || "/images/profile.png"}
            alt={`${profile.firstName} ${profile.lastName}`}
            width={200}
            height={200}
            priority
            className="rounded-full object-cover w-40 h-40 md:w-52 md:h-52 border-4 border-border shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-muted text-lg mb-1">{t("greeting")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-4">
            {localized(profile, "title", locale)}
          </p>
          <p className="text-muted mb-6">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              {t("contactMe")}
            </a>
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded-lg hover:bg-card transition-colors font-medium text-foreground"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
