import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ===== GET
export async function GET() {
  const [rows] = await db.query("SELECT * FROM asuransi ORDER BY id DESC");
  return NextResponse.json(rows);
}

// ===== POST
export async function POST(req: Request) {
  const {
    nama_asuransi,
    nama_perusahaan_linux,
    margin_asuransi,
    no_rekening,
    url_logo,
  } = await req.json();

  await db.query(
    `INSERT INTO asuransi 
    (nama_asuransi, nama_perusahaan_linux, margin_asuransi, no_rekening, url_logo) 
    VALUES (?, ?, ?, ?, ?)`,
    [
      nama_asuransi,
      nama_perusahaan_linux,
      margin_asuransi,
      no_rekening,
      url_logo,
    ]
  );

  return NextResponse.json({ message: "Berhasil tambah" });
}

// ===== PUT
export async function PUT(req: Request) {
  const {
    id,
    nama_asuransi,
    nama_perusahaan_linux,
    margin_asuransi,
    no_rekening,
    url_logo,
  } = await req.json();

  await db.query(
    `UPDATE asuransi SET 
      nama_asuransi=?,
      nama_perusahaan_linux=?,
      margin_asuransi=?,
      no_rekening=?,
      url_logo=? 
    WHERE id=?`,
    [
      nama_asuransi,
      nama_perusahaan_linux,
      margin_asuransi,
      no_rekening,
      url_logo,
      id,
    ]
  );

  return NextResponse.json({ message: "Berhasil update" });
}

// ===== DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.query("DELETE FROM asuransi WHERE id=?", [id]);

  return NextResponse.json({ message: "Berhasil hapus" });
}