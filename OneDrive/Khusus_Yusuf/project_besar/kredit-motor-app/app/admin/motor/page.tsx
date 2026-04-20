"use client";

import { useEffect, useState } from "react";

type JenisMotor = {
    id: number;
    merk: string;
    jenis: string;
};

type Motor = {
    id: number;
    nama_motor: string;
    merk: string;
    jenis: string;
    harga_jual: number;
    stok: number;
    foto1: string;
    foto2: string;
    foto3: string;
};

export default function MotorPage() {
    const [jenisList, setJenisList] = useState<JenisMotor[]>([]);
    const [motorList, setMotorList] = useState<Motor[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [form, setForm] = useState({
        nama_motor: "",
        id_jenis: "",
        harga_jual: "",
        deskripsi: "",
        warna: "",
        kapasitas_mesin: "",
        tahun_produksi: "",
        stok: "",
    });

    const [foto1, setFoto1] = useState<File | null>(null);
    const [foto2, setFoto2] = useState<File | null>(null);
    const [foto3, setFoto3] = useState<File | null>(null);

    // =====================
    // FETCH MOTOR
    // =====================
    const fetchMotor = async () => {
        const res = await fetch("/api/admin/motor");
        const data = await res.json();
        setMotorList(data);
    };

    useEffect(() => {
        fetchMotor();
    }, []);

    // =====================
    // FETCH JENIS MOTOR
    // =====================
    useEffect(() => {
        fetch("/api/admin/jenis-motor/list")
            .then((res) => res.json())
            .then((data) => setJenisList(data));
    }, []);

    // =====================
    // UPLOAD HELPER
    // =====================
    const uploadFile = async (file: File | null) => {
        if (!file) return "";

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/jenis-motor/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            console.error("Upload gagal");
            return "";
        }

        const data = await res.json();
        return data.url;
    };

    // =====================
    // SUBMIT
    // =====================
    const handleSubmit = async () => {
        const url1 = await uploadFile(foto1);
        const url2 = await uploadFile(foto2);
        const url3 = await uploadFile(foto3);

        const method = isEdit ? "PUT" : "POST";

        await fetch("/api/admin/motor", {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
                id: editId,
                id_jenis: Number(form.id_jenis),
                harga_jual: Number(form.harga_jual),
                stok: Number(form.stok),
                tahun_produksi: Number(form.tahun_produksi),
                foto1: url1,
                foto2: url2,
                foto3: url3,
            }),
        });

        alert(isEdit ? "Berhasil update" : "Berhasil tambah");

        // reset
        setIsEdit(false);
        setEditId(null);
        setForm({
            nama_motor: "",
            id_jenis: "",
            harga_jual: "",
            deskripsi: "",
            warna: "",
            kapasitas_mesin: "",
            tahun_produksi: "",
            stok: "",
        });

        fetchMotor();
    };

    const handleEdit = (item: any) => {
        setIsEdit(true);
        setEditId(item.id);

        setForm({
            nama_motor: item.nama_motor,
            id_jenis: String(item.id_jenis),
            harga_jual: String(item.harga_jual),
            deskripsi: item.deskripsi,
            warna: item.warna,
            kapasitas_mesin: item.kapasitas_mesin,
            tahun_produksi: String(item.tahun_produksi),
            stok: String(item.stok),
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin hapus data ini?")) return;

        await fetch("/api/admin/motor", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        fetchMotor();
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Tambah Motor</h1>

            {/* ================= FORM ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">

                <input
                    placeholder="Nama Motor"
                    value={form.nama_motor}
                    onChange={(e) => setForm({ ...form, nama_motor: e.target.value })}
                    className="border p-2 rounded"
                />

                <select
                    value={form.id_jenis}
                    onChange={(e) => setForm({ ...form, id_jenis: e.target.value })}
                    className="border p-2 rounded"
                >
                    <option value="">Pilih Jenis Motor</option>
                    {jenisList.map((j) => (
                        <option key={j.id} value={j.id}>
                            {j.merk} - {j.jenis}
                        </option>
                    ))}
                </select>

                <input
                    placeholder="Harga Jual"
                    value={form.harga_jual}
                    onChange={(e) => setForm({ ...form, harga_jual: e.target.value })}
                    className="border p-2 rounded"
                />

                <input
                    placeholder="Warna"
                    value={form.warna}
                    onChange={(e) => setForm({ ...form, warna: e.target.value })}
                    className="border p-2 rounded"
                />

                <input
                    placeholder="Kapasitas Mesin"
                    value={form.kapasitas_mesin}
                    onChange={(e) => setForm({ ...form, kapasitas_mesin: e.target.value })}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Tahun Produksi"
                    value={form.tahun_produksi}
                    onChange={(e) => setForm({ ...form, tahun_produksi: e.target.value })}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Stok"
                    value={form.stok}
                    onChange={(e) => setForm({ ...form, stok: e.target.value })}
                    className="border p-2 rounded"
                />

                <textarea
                    placeholder="Deskripsi"
                    value={form.deskripsi}
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                    className="border p-2 rounded col-span-2"
                />

                {/* FOTO */}
                <div>
                    <label>Foto 1</label>
                    <input type="file" onChange={(e) => setFoto1(e.target.files?.[0] || null)} />
                </div>

                <div>
                    <label>Foto 2</label>
                    <input type="file" onChange={(e) => setFoto2(e.target.files?.[0] || null)} />
                </div>

                <div>
                    <label>Foto 3</label>
                    <input type="file" onChange={(e) => setFoto3(e.target.files?.[0] || null)} />
                </div>

                <button
                    onClick={handleSubmit}
                    className="col-span-2 bg-blue-500 text-white p-3 rounded"
                >
                    {isEdit ? "Update Motor" : "Simpan Motor"}
                </button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Nama</th>
                            <th className="p-2">Jenis</th>
                            <th className="p-2">Harga</th>
                            <th className="p-2">Stok</th>
                            <th className="p-2">Foto</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {motorList.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">{item.nama_motor}</td>
                                <td className="p-2">
                                    {item.merk} - {item.jenis}
                                </td>
                                <td className="p-2">
                                    Rp {Number(item.harga_jual).toLocaleString()}
                                </td>
                                <td className="p-2">{item.stok}</td>
                                <td className="p-2 flex gap-1">
                                    <img src={item.foto1} className="w-12 h-8 object-cover rounded" />
                                    <img src={item.foto2} className="w-12 h-8 object-cover rounded" />
                                    <img src={item.foto3} className="w-12 h-8 object-cover rounded" />
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