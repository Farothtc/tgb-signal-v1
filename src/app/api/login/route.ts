import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const validUsername = process.env.USERNAME_CRED;
  const validPassword = process.env.PASSWORD_CRED;

  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
