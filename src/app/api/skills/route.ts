import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const skills = await prisma.skill.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const skill = await prisma.skill.create({
    data: {
      name: data.name,
      proficiency: data.proficiency || 0,
      categoryId: data.categoryId,
      sortOrder: data.sortOrder || 0,
    },
  });

  return NextResponse.json(skill, { status: 201 });
}
