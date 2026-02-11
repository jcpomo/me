import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const education = await prisma.education.findUnique({ where: { id } });
  if (!education) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(education);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const updated = await prisma.education.update({
    where: { id },
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
      sortOrder: data.sortOrder ?? undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.education.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
