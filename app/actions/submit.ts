'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function answersSubmit(formData: FormData) {
  "use server";
  try {
    const name = formData.get("name");
    const age = formData.get("age");
    const gender = formData.get("gender");
    const about = formData.get("about");
    const hobbies = formData.getAll("hobbies") as string[];

    console.log({ name, age, gender, about, hobbies });

    await prisma.response.create({
      data: {
        name: name as string,
        age: Number(age),
        gender: gender as string,
        about: about as string,
        hobbies,
      },
    });

    revalidatePath("/test-technique");
    redirect("/test-technique");
  } catch (err) {
    console.error("❌ Submit error:", err);
    throw err;
  }
}

