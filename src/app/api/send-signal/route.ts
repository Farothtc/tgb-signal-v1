import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.USERNAME;

  // 1. Check for authorization
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHANNEL_NAME = process.env.CHANNEL_NAME;

  const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const res = await fetch(telegramURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHANNEL_NAME,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Telegram Error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
