"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const cards = [
        {
            title: "Jenis Motor",
            desc: "Kelola data jenis motor",
            path: "/admin/jenis-motor",
        },
        {
            title: "Motor",
            desc: "Kelola data motor",
            path: "/admin/motor",
        },
        {
            title: "Metode Pembayaran",
            desc: "Kelola metode pembayaran",
            path: "/admin/metode-pembayaran",
        },
        {
            title: "Jenis Cicilan",
            desc: "Kelola lama cicilan & margin",
            path: "/admin/jenis-cicilan",
        },
        {
            title: "Asuransi",
            desc: "Kelola data asuransi",
            path: "/admin/asuransi",
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        onClick={() => router.push(card.path)}
                        className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition"
                    >
                        <h2 className="text-lg font-semibold">{card.title}</h2>
                        <p className="text-gray-500 text-sm">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}