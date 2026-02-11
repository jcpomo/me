import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(experience);
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

  const updated = await prisma.experience.update({
    where: { id },
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
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
