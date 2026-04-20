"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Jenis Motor", path: "/admin/jenis-motor" },
    { name: "Motor", path: "/admin/motor" },
    { name: "Metode Pembayaran", path: "/admin/metode-pembayaran" },
    { name: "Jenis Cicilan", path: "/admin/jenis-cicilan" },
    { name: "Asuransi", path: "/admin/asuransi" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
        <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`p-2 rounded-lg cursor-pointer ${
                  pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}