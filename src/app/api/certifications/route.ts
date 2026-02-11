import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const certifications = await prisma.certification.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(certifications);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const certification = await prisma.certification.create({
    data: {
      nameEn: data.nameEn,
      nameDe: data.nameDe,
      issuer: data.issuer || null,
      issueDate: data.issueDate ? new Date(data.issueDate) : null,
      credentialUrl: data.credentialUrl || null,
      descriptionEn: data.descriptionEn || null,
      descriptionDe: data.descriptionDe || null,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(certification, { status: 201 });
}
