import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";

const sections = [
  { key: "profile", count: "1 record" },
  { key: "experience", count: "4 entries" },
  { key: "education", count: "2 entries" },
  { key: "skills", count: "6 categories" },
  { key: "languages", count: "3 entries" },
  { key: "certifications", count: "20 entries" },
];

export default async function AdminDashboard() {
  const locale = await getLocale();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={`/${locale}/admin/${section.key}`}
            className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground capitalize mb-1">
              {section.key}
            </h3>
            <p className="text-sm text-muted">{section.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
