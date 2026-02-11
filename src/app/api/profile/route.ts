import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      titleEn: data.titleEn,
      titleDe: data.titleDe,
      email: data.email,
      phone: data.phone,
      location: data.location,
      summaryEn: data.summaryEn,
      summaryDe: data.summaryDe,
      linkedinUrl: data.linkedinUrl,
      githubUrl: data.githubUrl,
      websiteUrl: data.websiteUrl,
    },
  });

  return NextResponse.json(updated);
}
