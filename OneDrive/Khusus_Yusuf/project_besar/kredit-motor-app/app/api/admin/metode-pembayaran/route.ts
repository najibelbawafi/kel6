import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ================= GET
export async function GET() {
  const [rows] = await db.query("SELECT * FROM metode_pembayaran ORDER BY id DESC");
  return NextResponse.json(rows);
}

// ================= POST
export async function POST(req: Request) {
  const { metode_pembayaran, tempat_bayar, no_rekening, url_logo } = await req.json();

  await db.query(
    "INSERT INTO metode_pembayaran (metode_pembayaran, tempat_bayar, no_rekening, url_logo) VALUES (?, ?, ?, ?)",
    [metode_pembayaran, tempat_bayar, no_rekening, url_logo]
  );

  return NextResponse.json({ message: "Berhasil tambah" });
}

// ================= PUT
export async function PUT(req: Request) {
  const { id, metode_pembayaran, tempat_bayar, no_rekening, url_logo } = await req.json();

  await db.query(
    `UPDATE metode_pembayaran 
     SET metode_pembayaran=?, tempat_bayar=?, no_rekening=?, url_logo=? 
     WHERE id=?`,
    [metode_pembayaran, tempat_bayar, no_rekening, url_logo, id]
  );

  return NextResponse.json({ message: "Berhasil update" });
}

// ================= DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.query("DELETE FROM metode_pembayaran WHERE id=?", [id]);

  return NextResponse.json({ message: "Berhasil hapus" });
}