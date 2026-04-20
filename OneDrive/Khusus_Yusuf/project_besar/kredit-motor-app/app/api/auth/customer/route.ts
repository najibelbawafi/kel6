import { db } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { Pelanggan } from "@/types/user";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // =========================
    // 1. CEK USERS (PASSWORD)
    // =========================
    const [users] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      const user = users[0];

      if (user.password !== password) {
        return NextResponse.json(
          { message: "Password salah" },
          { status: 401 }
        );
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return NextResponse.json({
        token,
        role: user.role,
      });
    }

    // =========================
    // 2. CEK PELANGGAN (KATAKUNCI)
    // =========================
    const [customers] = await db.query<(Pelanggan & RowDataPacket)[]>(
      "SELECT * FROM pelanggan WHERE email = ?",
      [email]
    );

    if (customers.length > 0) {
      const customer = customers[0];

      // 🔥 beda di sini
      if (customer.katakunci !== password) {
        return NextResponse.json(
          { message: "Katakunci salah" },
          { status: 401 }
        );
      }

      const token = generateToken({
        id: customer.id,
        email: customer.email,
        role: "customer",
      });

      return NextResponse.json({
        token,
        role: "customer",
      });
    }

    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}