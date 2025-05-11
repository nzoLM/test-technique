'use server';

export async function answersSubmit(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      about: formData.get("about"),
      hobbies: formData.getAll("hobbies"), // getAll si plusieurs inputs du même nom
    };
    console.log(data);
    let baseUrl;
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_BASE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    } else {
      baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    }
    
    const res = await fetch(`${baseUrl}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data),
      cache: 'no-store'
    })
    const responseData = await res.json();
    if (!res.ok) {
      return {
        error: responseData.error || "Failed to submit the form.",
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

