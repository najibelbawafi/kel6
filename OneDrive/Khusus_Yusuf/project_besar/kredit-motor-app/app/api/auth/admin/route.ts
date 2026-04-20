import { db } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { AdminUser } from "@/types/user";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body as {
    username: string;
    password: string;
  };

  const [rows] = await db.query<(AdminUser & RowDataPacket)[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
  }

  const user = rows[0];

  if (user.password !== password) {
    return NextResponse.json({ message: "Password salah" }, { status: 401 });
  }

  const token = generateToken({
    id: user.id_user,
    role: user.role,
  });

  return NextResponse.json({ token, user });
}