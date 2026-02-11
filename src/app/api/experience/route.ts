import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const experience = await prisma.experience.create({
    data: {
      companyName: data.companyName,
      positionEn: data.positionEn,
      positionDe: data.positionDe,
      locationEn: data.locationEn,
      locationDe: data.locationDe,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      isCurrent: data.isCurrent || false,
      descriptionEn: data.descriptionEn,
      descriptionDe: data.descriptionDe,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(experience, { status: 201 });
}
