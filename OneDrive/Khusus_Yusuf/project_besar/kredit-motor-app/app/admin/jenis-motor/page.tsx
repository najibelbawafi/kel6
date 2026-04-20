"use client";

import { useEffect, useState } from "react";


type JenisMotor = {
    id: number;
    merk: string;
    jenis: string;
    deskripsi_jenis: string;
    image_url: string;
};

export default function JenisMotorPage() {
    const [data, setData] = useState<JenisMotor[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [form, setForm] = useState<JenisMotor>({
        id: 0,
        merk: "",
        jenis: "Bebek",
        deskripsi_jenis: "",
        image_url: "",
    });

    const [isEdit, setIsEdit] = useState(false);

    const fetchData = async () => {
        const res = await fetch("/api/admin/jenis-motor");
        const result = await res.json();
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        let imageUrl = form.image_url;

        // 🔥 upload file kalau ada
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/admin/jenis-motor/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();
            imageUrl = uploadData.url;
        }

        const method = isEdit ? "PUT" : "POST";

        await fetch("/api/admin/jenis-motor", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                image_url: imageUrl,
            }),
        });

        setForm({
            id: 0,
            merk: "",
            jenis: "Bebek",
            deskripsi_jenis: "",
            image_url: "",
        });

        setFile(null);
        setIsEdit(false);
        fetchData();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin hapus?")) return;

        await fetch("/api/admin/jenis-motor", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        fetchData();
    };

    const handleEdit = (item: JenisMotor) => {
        setForm(item);
        setIsEdit(true);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Jenis Motor</h1>

            {/* FORM */}
            <div className="bg-white p-4 rounded-xl shadow space-y-3">
                <input
                    placeholder="Merk"
                    value={form.merk}
                    onChange={(e) => setForm({ ...form, merk: e.target.value })}
                    className="border p-2 w-full rounded"
                />

                <select
                    value={form.jenis}
                    onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                    className="border p-2 w-full rounded"
                >
                    <option>Bebek</option>
                    <option>Skuter</option>
                    <option>Dual Sport</option>
                    <option>Naked Sport</option>
                    <option>Sport Bike</option>
                    <option>Retro</option>
                    <option>Cruiser</option>
                    <option>Sport Touring</option>
                    <option>Dirt Bike</option>
                    <option>Motocross</option>
                    <option>Scrambler</option>
                    <option>ATV</option>
                    <option>Motor Adventure</option>
                    <option>Lainnya</option>
                </select>

                <textarea
                    placeholder="Deskripsi"
                    value={form.deskripsi_jenis}
                    onChange={(e) =>
                        setForm({ ...form, deskripsi_jenis: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                />

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border p-2 w-full"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isEdit ? "Update" : "Tambah"}
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Merk</th>
                            <th className="p-2">Jenis</th>
                            <th className="p-2">Deskripsi</th>
                            <th className="p-2">Gambar</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">{item.merk}</td>
                                <td className="p-2">{item.jenis}</td>
                                <td className="p-2">{item.deskripsi_jenis}</td>
                                <td className="p-2">
                                    <img
                                        src={item.image_url}
                                        className="w-16 h-10 object-cover rounded"
                                    />
                                </td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-400 px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}