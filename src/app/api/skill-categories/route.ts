import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    include: { skills: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const category = await prisma.skillCategory.create({
    data: {
      nameEn: data.nameEn,
      nameDe: data.nameDe,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
