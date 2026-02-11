import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const languages = await prisma.language.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(languages);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const language = await prisma.language.create({
    data: {
      nameEn: data.nameEn,
      nameDe: data.nameDe,
      levelEn: data.levelEn,
      levelDe: data.levelDe,
      cefrLevel: data.cefrLevel || null,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(language, { status: 201 });
}
