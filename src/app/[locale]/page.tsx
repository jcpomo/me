import { prisma } from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import ExperienceSection from "@/components/public/ExperienceSection";
import EducationSection from "@/components/public/EducationSection";
import SkillsSection from "@/components/public/SkillsSection";
import LanguagesSection from "@/components/public/LanguagesSection";
import CertificationsSection from "@/components/public/CertificationsSection";
import RecommendationsSection from "@/components/public/RecommendationsSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";

// Datos estructurados JSON-LD para SEO
function getStructuredData(profile: any, locale: string) {
  const isGerman = locale === "de";
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "José Carlos Pomo González",
    alternateName: ["José Carlos Pomo", "Pomo González", "JCP"],
    jobTitle: isGerman ? "Full Stack Webentwickler" : "Full Stack Web Developer",
    description: isGerman
      ? profile.summaryDe
      : profile.summaryEn,
    url: "https://www.jcpomo.com",
    image: "https://www.jcpomo.com/images/profile.png",
    email: profile.email,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "München",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    sameAs: [
      profile.linkedinUrl,
      profile.githubUrl,
      profile.websiteUrl,
    ].filter(Boolean),
    knowsAbout: [
      "PHP",
      "Laravel",
      "React",
      "Angular",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "Docker",
      "MySQL",
      "Web Development",
      "Full Stack Development",
      "RESTful APIs",
      "WordPress",
      "DevOps",
    ],
    worksFor: {
      "@type": "Organization",
      name: "DFGE",
      url: "https://dfge.de",
    },
  };
}

export default async function CVPage() {
  const locale = await getLocale();

  const [profile, experiences, education, skillCategories, languages, certifications] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skillCategory.findMany({
        include: { skills: { orderBy: { sortOrder: "asc" } } },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.language.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-lg">
          No profile data found. Please run the seed script.
        </p>
      </div>
    );
  }

  const structuredData = getStructuredData(profile, locale);

  return (
    <>
      {/* Datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Navbar />
      <main>
        <HeroSection profile={profile} locale={locale} />
        <AboutSection profile={profile} locale={locale} />
        <ExperienceSection experiences={experiences} locale={locale} />
        <EducationSection education={education} locale={locale} />
        <SkillsSection categories={skillCategories} locale={locale} />
        <LanguagesSection languages={languages} locale={locale} />
        <CertificationsSection certifications={certifications} locale={locale} />
        <RecommendationsSection />
        <ContactSection profile={profile} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
