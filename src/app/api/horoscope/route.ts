import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://sukunafuka.app.n8n.cloud/webhook/horoscope",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("n8n ไม่ได้ส่ง JSON กลับมา");
    }

    const result = Array.isArray(data)
      ? data[0]?.result
      : data?.result;

    return NextResponse.json({
      result: result || "ไม่มี result จาก n8n",
    });

  } catch (error: any) {
    return NextResponse.json({
      result: "เกิดข้อผิดพลาด: " + error.message,
    });
  }
}