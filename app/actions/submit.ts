'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function answersSubmit(formData: FormData) {
  "use server";
  try {
    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      about: formData.get("about"),
      hobbies: formData.getAll("hobbies"), // getAll si plusieurs inputs du même nom
    };
    console.log(data);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;
    const res = await fetch(`${baseUrl}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data),
    })
    const responseData = await res.json();
    if (!res.ok) {
      return {
        error: responseData.error || "Échec de l'envoi du formulaire",
        status: res.status
      };
    }
    return {
      data: responseData,
      status: res.status,
      success: true
    }
  } catch (err) {
    console.error("❌ Submit error:", err);
    return {
      error: err,
      status: 500
    };
  }
}

