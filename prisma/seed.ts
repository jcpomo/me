import { PrismaClient } from "../src/generated/prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.$transaction([
    prisma.skill.deleteMany(),
    prisma.skillCategory.deleteMany(),
    prisma.certification.deleteMany(),
    prisma.language.deleteMany(),
    prisma.education.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // ─── Admin User ─────────────────────────────────────────
  const hashedPassword = await bcryptjs.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );

  await prisma.user.create({
    data: {
      name: "José Carlos Pomo González",
      email: process.env.ADMIN_EMAIL || "jcpomog@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("✓ Admin user created");

  // ─── Profile ────────────────────────────────────────────
  await prisma.profile.create({
    data: {
      firstName: "José Carlos",
      lastName: "Pomo González",
      titleEn: "Full Stack Web Developer",
      titleDe: "Full Stack Webentwickler",
      email: "jcpomog@gmail.com",
      phone: "+4917666059721",
      location: "München, Deutschland",
      summaryEn:
        "Experienced full-stack web developer with extensive experience in the design and implementation of modern web applications, specializing in PHP, MySQL, JavaScript, HTML, CSS, and frameworks such as Laravel, React, Angular, and Vue.js. Long-standing experience with CMS systems, Docker, GitHub, AI agents for business process automation, as well as in the development of RESTful APIs. Committed, team-oriented, and solution-focused work style with a strong emphasis on communication and continuous improvement.",
      summaryDe:
        "Erfahrener Full-Stack-Webentwickler mit umfassender Erfahrung in der Konzeption und Realisierung moderner Webanwendungen, spezialisiert in PHP, MySQL, JavaScript, HTML, CSS und Frameworks wie Laravel, React, Angular und Vue.js. Langjährige Erfahrung mit CMS-Systemen, Docker, GitHub, KI-Agenten zur Automatisierung von Geschäftsprozessen sowie in der Entwicklung von RESTful-APIs. Engagierte, teamorientierte und lösungsorientierte Arbeitsweise mit starkem Fokus auf Kommunikation und kontinuierliche Verbesserung.",
      photoUrl: "/images/profile.png",
      linkedinUrl: "https://www.linkedin.com/in/jose-pomo/",
    },
  });
  console.log("✓ Profile created");

  // ─── Experience ─────────────────────────────────────────
  const experiences = [
    {
      companyName: "DFGE",
      positionEn: "Full Stack Developer",
      positionDe: "Full-stack Developer",
      locationEn: "Munich, Germany",
      locationDe: "München, Deutschland",
      startDate: new Date("2022-12-01"),
      endDate: new Date("2025-10-31"),
      isCurrent: false,
      descriptionEn:
        "Developed and implemented internal web applications using Laravel and React, achieving a 30% increase in operational efficiency and significantly streamlining processes.",
      descriptionDe:
        "Entwicklung interner Webanwendungen zur Optimierung der Betriebsprozesse unter Verwendung von Laravel und React.",
      sortOrder: 0,
    },
    {
      companyName: "cibercuba.com",
      positionEn: "Web Manager",
      positionDe: "Web Manager",
      locationEn: "Valencia, Spain",
      locationDe: "Valencia, Spanien",
      startDate: new Date("2015-03-01"),
      endDate: new Date("2022-11-30"),
      isCurrent: false,
      descriptionEn:
        "Spearheaded website administration for a Cuban news portal, driving engagement to over 14 million monthly visitors through strategic content management and optimization initiatives.",
      descriptionDe:
        "Website-Administrator eines kubanischen Nachrichtenportals mit über 14 Millionen Besuchern pro Monat.",
      sortOrder: 1,
    },
    {
      companyName: "Freelance",
      positionEn: "Full Stack Web Developer",
      positionDe: "FullStack Web Developer",
      locationEn: "Spain",
      locationDe: "Spanien",
      startDate: new Date("2012-06-01"),
      endDate: new Date("2015-12-31"),
      isCurrent: false,
      descriptionEn:
        "Development of dynamic and customized websites using various technologies and CMS.",
      descriptionDe:
        "Entwicklung dynamischer und maßgeschneiderter Websites mit verschiedenen Technologien und CMS.",
      sortOrder: 2,
    },
    {
      companyName: "Fakultät für Geologie, Universität Pinar del Río",
      positionEn: "Geology Teacher",
      positionDe: "Geologielehrer",
      locationEn: "Cuba",
      locationDe: "Kuba",
      startDate: new Date("2005-09-01"),
      endDate: new Date("2010-07-31"),
      isCurrent: false,
      descriptionEn:
        "Teaching and network administration at the Faculty of Geology, including maintenance of the official website.",
      descriptionDe:
        "Lehrtätigkeit und Netzwerkadministration an der Fakultät für Geologie, inklusive Pflege der offiziellen Website.",
      sortOrder: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("✓ Experiences created");

  // ─── Education ──────────────────────────────────────────
  const educations = [
    {
      institutionEn: "University of Granada",
      institutionDe: "Universität Granada",
      degreeEn: "European Master's in Geology",
      degreeDe: "Europäischer Master in Geologie",
      fieldOfStudyEn: "Geology",
      fieldOfStudyDe: "Geologie",
      locationEn: "Granada, Spain",
      locationDe: "Granada, Spanien",
      startDate: new Date("2010-09-01"),
      endDate: new Date("2012-06-30"),
      descriptionEn:
        "Member of the research project IGCP 546 – Subduction Zones of the Caribbean. Development of a web application for geological data in the cloud. Started self-study in PHP, JavaScript, and MySQL.",
      descriptionDe:
        "Mitglied des Forschungsprojekts IGCP 546 – Subduktionszonen der Karibik. Entwicklung einer Webanwendung für geologische Daten in der Cloud. Beginn des Selbststudiums in PHP, JavaScript und MySQL.",
      sortOrder: 0,
    },
    {
      institutionEn: "University of Pinar del Río",
      institutionDe: "Universität Pinar del Río",
      degreeEn: "Geological Engineer",
      degreeDe: "Geologe Ingenieur",
      fieldOfStudyEn: "Applied Geosciences",
      fieldOfStudyDe: "Angewandte Geowissenschaften",
      locationEn: "Pinar del Río, Cuba",
      locationDe: "Pinar del Río, Kuba",
      startDate: new Date("2000-09-01"),
      endDate: new Date("2005-07-31"),
      descriptionEn:
        "Solid scientific and technical training in the field of applied geosciences.",
      descriptionDe:
        "Fundierte wissenschaftliche und technische Ausbildung im Bereich der angewandten Geowissenschaften.",
      sortOrder: 1,
    },
  ];

  for (const edu of educations) {
    await prisma.education.create({ data: edu });
  }
  console.log("✓ Education created");

  // ─── Skill Categories & Skills ──────────────────────────
  const skillCategories = [
    {
      nameEn: "Frontend",
      nameDe: "Frontend",
      sortOrder: 0,
      skills: ["JavaScript", "React", "Angular", "Vue.js", "Bootstrap", "CSS3"],
    },
    {
      nameEn: "Backend",
      nameDe: "Backend",
      sortOrder: 1,
      skills: ["PHP", "Laravel", "RESTful APIs"],
    },
    {
      nameEn: "CMS",
      nameDe: "CMS",
      sortOrder: 2,
      skills: ["WordPress", "PrestaShop", "Drupal"],
    },
    {
      nameEn: "DevOps",
      nameDe: "DevOps",
      sortOrder: 3,
      skills: ["Docker", "GitHub"],
    },
    {
      nameEn: "Design",
      nameDe: "Design",
      sortOrder: 4,
      skills: ["Adobe Photoshop", "Adobe Premiere"],
    },
    {
      nameEn: "Other",
      nameDe: "Sonstiges",
      sortOrder: 5,
      skills: ["AI Agent Integrations", "Workflow Automation with n8n"],
    },
  ];

  for (const cat of skillCategories) {
    const { skills, ...catData } = cat;
    const category = await prisma.skillCategory.create({ data: catData });
    for (let i = 0; i < skills.length; i++) {
      await prisma.skill.create({
        data: {
          name: skills[i],
          categoryId: category.id,
          sortOrder: i,
          proficiency: 80,
        },
      });
    }
  }
  console.log("✓ Skills created");

  // ─── Languages ──────────────────────────────────────────
  const languages = [
    {
      nameEn: "German",
      nameDe: "Deutsch",
      levelEn: "Native",
      levelDe: "Muttersprache",
      cefrLevel: "C2",
      sortOrder: 0,
    },
    {
      nameEn: "Spanish",
      nameDe: "Spanisch",
      levelEn: "Native",
      levelDe: "Muttersprache",
      cefrLevel: "C2",
      sortOrder: 1,
    },
    {
      nameEn: "English",
      nameDe: "Englisch",
      levelEn: "Advanced",
      levelDe: "Fortgeschritten",
      cefrLevel: "C1",
      sortOrder: 2,
    },
  ];

  for (const lang of languages) {
    await prisma.language.create({ data: lang });
  }
  console.log("✓ Languages created");

  // ─── Certifications ─────────────────────────────────────
  const certifications = [
    {
      nameEn: "Master in TypeScript, Modern JavaScript, ES2025, HTML5 APIs",
      nameDe: "Master in TypeScript, Modern JavaScript, ES2025, HTML5 APIs",
      sortOrder: 0,
    },
    {
      nameEn: "Bootstrap from Zero to Expert",
      nameDe: "Bootstrap von Null bis zum Experten",
      sortOrder: 1,
    },
    {
      nameEn: "All about PHP and MySQL, from Basics to Expert Level",
      nameDe:
        "Alles über PHP und MySQL, von den Grundlagen bis zum Expertenniveau",
      sortOrder: 2,
    },
    {
      nameEn: "Complete Web Development with HTML5, CSS3, JS AJAX PHP and MySQL",
      nameDe:
        "Komplette Webentwicklung mit HTML5, CSS3, JS AJAX PHP und MySQL",
      sortOrder: 3,
    },
    {
      nameEn: "Professional Development of WordPress Themes and Plugins",
      nameDe: "Professionelle Entwicklung von WordPress-Themes und Plugins",
      sortOrder: 4,
    },
    {
      nameEn: "Master in Laravel from Zero to Expert",
      nameDe: "Master in Laravel von Null bis zum Experten",
      sortOrder: 5,
    },
    {
      nameEn: "Laravel 9 – Create Applications and Websites with PHP 8 and MVC",
      nameDe:
        "Laravel 9 – Erstellen Sie Anwendungen und Websites mit PHP 8 und MVC",
      sortOrder: 6,
    },
    {
      nameEn: "Tailwind CSS Course – From Zero to Pro",
      nameDe: "Tailwind CSS-Kurs – Von Null zum Profi",
      sortOrder: 7,
    },
    {
      nameEn: "CRUD Laravel 8, Angular 11, React 17 Hooks, Bootstrap 5 2021",
      nameDe: "CRUD Laravel 8, Angular 11, React 17 Hooks, Bootstrap 5 2021",
      sortOrder: 8,
    },
    {
      nameEn: "GIT+GitHub: A Complete Version Control System from Scratch",
      nameDe:
        "GIT+GitHub: Ein komplettes Versionskontrollsystem von Grund auf",
      sortOrder: 9,
    },
    {
      nameEn: "Integral DevOps Docker, Kubernetes, Jenkins, GitFlow CI CD",
      nameDe: "DevOps Integral Docker, Kubernetes, Jenkins, GitFlow CI CD",
      sortOrder: 10,
    },
    {
      nameEn: "Learn Docker from Scratch to Expert: with Compose and Swarm",
      nameDe:
        "Lernen Sie Docker von Grund auf bis zum Experten: mit Compose und Swarm",
      sortOrder: 11,
    },
    {
      nameEn:
        "React for Advanced: Fullstack Next.js, Apollo, MongoDB, and GraphQL",
      nameDe:
        "React für Fortgeschrittene: Fullstack Next.js, Apollo, MongoDB und GraphQL",
      sortOrder: 12,
    },
    {
      nameEn: "React: Real-time Applications with Socket.io",
      nameDe: "React: Echtzeitanwendungen mit Socket-io",
      sortOrder: 13,
    },
    {
      nameEn: "React: From Zero to Expert – Edition 2025",
      nameDe: "React: Von Null zum Experten – Ausgabe 2025",
      sortOrder: 14,
    },
    {
      nameEn: "React PRO: Take Your Foundations to the Next Level",
      nameDe: "React PRO: Bringen Sie Ihre Grundlagen auf die nächste Stufe",
      sortOrder: 15,
    },
    {
      nameEn: "Next.js: The React Framework for Production",
      nameDe: "Next.js: Das React-Framework für die Produktion",
      sortOrder: 16,
    },
    {
      nameEn: "Master TailwindCSS – From Zero to Expert [real projects]",
      nameDe:
        "Beherrsche TailwindCSS – Von Null zum Experten [reale Projekte]",
      sortOrder: 17,
    },
    {
      nameEn: "Course n8n. Creating Professional AI Agents",
      nameDe: "Kurs n8n. Erstellung professioneller KI-Agenten",
      sortOrder: 18,
    },
    {
      nameEn: "Course: Programming from Scratch with Artificial Intelligence",
      nameDe:
        "Kurs: Programmieren von Grund auf mit künstlicher Intelligenz",
      sortOrder: 19,
    },
  ];

  for (const cert of certifications) {
    await prisma.certification.create({ data: cert });
  }
  console.log("✓ Certifications created");

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
