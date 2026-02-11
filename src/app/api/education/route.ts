import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const education = await prisma.education.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(education);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const education = await prisma.education.create({
    data: {
      institutionEn: data.institutionEn,
      institutionDe: data.institutionDe,
      degreeEn: data.degreeEn,
      degreeDe: data.degreeDe,
      fieldOfStudyEn: data.fieldOfStudyEn,
      fieldOfStudyDe: data.fieldOfStudyDe,
      locationEn: data.locationEn,
      locationDe: data.locationDe,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      descriptionEn: data.descriptionEn || null,
      descriptionDe: data.descriptionDe || null,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(education, { status: 201 });
}
