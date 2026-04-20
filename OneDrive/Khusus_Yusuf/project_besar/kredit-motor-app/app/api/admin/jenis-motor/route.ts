import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ======================
// GET ALL
// ======================
export async function GET() {
  const [rows] = await db.query("SELECT * FROM jenis_motor ORDER BY id DESC");
  return NextResponse.json(rows);
}

// ======================
// CREATE
// ======================


export async function POST(req: Request) {
  const { merk, jenis, deskripsi_jenis, image_url } = await req.json();

  await db.query(
    "INSERT INTO jenis_motor (merk, jenis, deskripsi_jenis, image_url) VALUES (?, ?, ?, ?)",
    [merk, jenis, deskripsi_jenis, image_url]
  );

  return NextResponse.json({ message: "Berhasil tambah" });
}

// ======================
// UPDATE
// ======================
export async function PUT(req: Request) {
  const { id, merk, jenis, deskripsi_jenis, image_url } = await req.json();

  await db.query(
    "UPDATE jenis_motor SET merk=?, jenis=?, deskripsi_jenis=?, image_url=? WHERE id=?",
    [merk, jenis, deskripsi_jenis, image_url, id]
  );

  return NextResponse.json({ message: "Berhasil update" });
}

// ======================
// DELETE
// ======================
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.query("DELETE FROM jenis_motor WHERE id=?", [id]);

  return NextResponse.json({ message: "Berhasil hapus" });
}