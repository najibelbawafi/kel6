import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await db.query("SELECT id, merk, jenis FROM jenis_motor");
  return NextResponse.json(rows);
}