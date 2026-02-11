import { useTranslations } from "next-intl";
import type { Certification } from "@prisma/client";
import { localized } from "@/lib/utils";

interface CertificationsSectionProps {
  certifications: Certification[];
  locale: string;
}

export default function CertificationsSection({
  certifications,
  locale,
}: CertificationsSectionProps) {
  const t = useTranslations("sections");

  return (
    <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("certifications")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border"
            >
              <div className="shrink-0 mt-1">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {localized(cert, "name", locale)}
                </p>
                {cert.issuer && (
                  <p className="text-xs text-muted mt-1">{cert.issuer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
