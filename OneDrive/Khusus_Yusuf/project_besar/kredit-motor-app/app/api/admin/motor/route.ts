import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ================= GET
export async function GET() {
  const [rows] = await db.query(`
    SELECT m.*, j.merk, j.jenis
    FROM motor m
    LEFT JOIN jenis_motor j ON m.id_jenis = j.id
    ORDER BY m.id DESC
  `);

  return NextResponse.json(rows);
}

// ================= POST
export async function POST(req: Request) {
  const body = await req.json();

  await db.query(
    `INSERT INTO motor 
    (nama_motor, id_jenis, harga_jual, deskripsi, warna, kapasitas_mesin, tahun_produksi, foto1, foto2, foto3, stok) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      body.nama_motor,
      body.id_jenis,
      body.harga_jual,
      body.deskripsi,
      body.warna,
      body.kapasitas_mesin,
      body.tahun_produksi,
      body.foto1,
      body.foto2,
      body.foto3,
      body.stok,
    ]
  );

  return NextResponse.json({ message: "Berhasil tambah" });
}

// ================= UPDATE
export async function PUT(req: Request) {
  const body = await req.json();

  await db.query(
    `UPDATE motor SET
      nama_motor=?,
      id_jenis=?,
      harga_jual=?,
      deskripsi=?,
      warna=?,
      kapasitas_mesin=?,
      tahun_produksi=?,
      foto1=?,
      foto2=?,
      foto3=?,
      stok=?
    WHERE id=?`,
    [
      body.nama_motor,
      body.id_jenis,
      body.harga_jual,
      body.deskripsi,
      body.warna,
      body.kapasitas_mesin,
      body.tahun_produksi,
      body.foto1,
      body.foto2,
      body.foto3,
      body.stok,
      body.id,
    ]
  );

  return NextResponse.json({ message: "Berhasil update" });
}

// ================= DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.query("DELETE FROM motor WHERE id=?", [id]);

  return NextResponse.json({ message: "Berhasil hapus" });
}