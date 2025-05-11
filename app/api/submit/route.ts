import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, age, gender, about, hobbies } = body;

    if (!name || !age || !gender || !about) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newResponse = await prisma.response.create({
      data: {
        name,
        age: Number(age),
        gender,
        about,
        hobbies: Array.isArray(hobbies) ? hobbies : [],
      },
    });

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
