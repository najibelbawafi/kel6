import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ===== GET
export async function GET() {
  const [rows] = await db.query(
    "SELECT * FROM jenis_cicilan ORDER BY id DESC"
  );
  return NextResponse.json(rows);
}

// ===== POST
export async function POST(req: Request) {
  const { lama_cicilan, margin_kredit } = await req.json();

  await db.query(
    "INSERT INTO jenis_cicilan (lama_cicilan, margin_kredit) VALUES (?, ?)",
    [lama_cicilan, margin_kredit]
  );

  return NextResponse.json({ message: "Berhasil tambah" });
}

// ===== PUT
export async function PUT(req: Request) {
  const { id, lama_cicilan, margin_kredit } = await req.json();

  await db.query(
    "UPDATE jenis_cicilan SET lama_cicilan=?, margin_kredit=? WHERE id=?",
    [lama_cicilan, margin_kredit, id]
  );

  return NextResponse.json({ message: "Berhasil update" });
}

// ===== DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.query("DELETE FROM jenis_cicilan WHERE id=?", [id]);

  return NextResponse.json({ message: "Berhasil hapus" });
}