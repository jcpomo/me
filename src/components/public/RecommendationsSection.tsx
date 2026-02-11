import { useTranslations } from "next-intl";

export default function RecommendationsSection() {
  const t = useTranslations("sections");
  const tCommon = useTranslations("recommendations");

  return (
    <section
      id="recommendations"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {t("recommendations")}
        </h2>

        <div className="bg-card rounded-lg shadow-md p-6 md:p-8 border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {tCommon("title")}
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                {tCommon("description")}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{tCommon("format")}</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href="/documents/250819_RecommendationLetter_POMO-sig-all.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {tCommon("downloadButton")}
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted italic">
              {tCommon("note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
