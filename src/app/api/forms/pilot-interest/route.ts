import { NextResponse } from "next/server";

type PilotInterestPayload = {
  name?: string;
  email?: string;
  communityIntent?: string;
  botField?: string;
};

const FORM_ID = process.env.NETLIFY_FORM_ID;
const AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN;

export async function POST(request: Request) {
  if (!FORM_ID || !AUTH_TOKEN) {
    console.error(
      "Missing NETLIFY_FORM_ID or NETLIFY_AUTH_TOKEN. Configure both in Netlify environment variables."
    );
    return NextResponse.json(
      { error: "Form is not configured. Please try again later." },
      { status: 500 }
    );
  }

  let payload: PilotInterestPayload;
  try {
    payload = (await request.json()) as PilotInterestPayload;
  } catch (error) {
    console.error("Invalid JSON payload:", error);
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (payload.botField) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const submission = new URLSearchParams();
  if (payload.name) submission.append("name", payload.name);
  if (payload.email) submission.append("email", payload.email);
  if (payload.communityIntent)
    submission.append("communityIntent", payload.communityIntent);

  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: submission.toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Netlify form submission error:", errorText);
      return NextResponse.json(
        { error: "Netlify submission failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected Netlify submission error:", error);
    return NextResponse.json(
      { error: "Unable to submit form." },
      { status: 500 }
    );
  }
}
