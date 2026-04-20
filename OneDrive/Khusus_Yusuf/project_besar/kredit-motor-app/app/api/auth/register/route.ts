    import { db } from "@/lib/db";
    import { NextResponse } from "next/server";
    import { RegisterBody } from "@/types/auth";
    import { Pelanggan } from "@/types/user";

    export async function POST(req: Request) {
    try {
        const body: RegisterBody = await req.json();
        const { email, password, nama_pelanggan } = body;

        if (!email || !password) {
        return NextResponse.json(
            { message: "Email dan password wajib" },
            { status: 400 }
        );
        }

        const [existing] = await db.query<Pelanggan[]>(
        "SELECT * FROM pelanggan WHERE no_telp = ?",
        [email]
        );

        if (existing.length > 0) {
        return NextResponse.json(
            { message: "User sudah terdaftar" },
            { status: 400 }
        );
        }

        await db.query(
        "INSERT INTO pelanggan (email, katakunci, nama_pelanggan) VALUES (?, ?, ?)",
        [email, password, nama_pelanggan ?? ""]
        );

        return NextResponse.json({ message: "Register berhasil" });

    } catch (error: unknown) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
        {
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
    }
    }