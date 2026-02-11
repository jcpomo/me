import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

  const updated = await prisma.certification.update({
    where: { id },
    data: {
      nameEn: data.nameEn,
      nameDe: data.nameDe,
      issuer: data.issuer || null,
      issueDate: data.issueDate ? new Date(data.issueDate) : null,
      credentialUrl: data.credentialUrl || null,
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
  await prisma.certification.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
