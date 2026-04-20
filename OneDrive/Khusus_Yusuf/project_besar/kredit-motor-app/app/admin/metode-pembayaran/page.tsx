"use client";

import { useEffect, useState } from "react";

type Metode = {
  id: number;
  metode_pembayaran: string;
  tempat_bayar: string;
  no_rekening: string;
  url_logo: string;
};

export default function MetodePage() {
  const [data, setData] = useState<Metode[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    metode_pembayaran: "",
    tempat_bayar: "",
    no_rekening: "",
    url_logo: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ================= FETCH
  const fetchData = async () => {
    const res = await fetch("/api/admin/metode-pembayaran");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= UPLOAD
  const uploadFile = async () => {
    if (!file) return form.url_logo;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/jenis-motor/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.url;
  };

  // ================= SUBMIT
  const handleSubmit = async () => {
    const logo = await uploadFile();

    const method = isEdit ? "PUT" : "POST";

    await fetch("/api/admin/metode-pembayaran", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        id: editId,
        url_logo: logo,
      }),
    });

    alert(isEdit ? "Berhasil update" : "Berhasil tambah");

    setForm({
      metode_pembayaran: "",
      tempat_bayar: "",
      no_rekening: "",
      url_logo: "",
    });

    setFile(null);
    setPreview(null);
    setIsEdit(false);
    setEditId(null);

    fetchData();
  };

  // ================= EDIT
  const handleEdit = (item: Metode) => {
    setIsEdit(true);
    setEditId(item.id);

    setForm({
      metode_pembayaran: item.metode_pembayaran,
      tempat_bayar: item.tempat_bayar,
      no_rekening: item.no_rekening,
      url_logo: item.url_logo,
    });

    setPreview(item.url_logo);
  };

  // ================= DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;

    await fetch("/api/admin/metode-pembayaran", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Metode Pembayaran</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          placeholder="Metode (Transfer, E-Wallet, dll)"
          value={form.metode_pembayaran}
          onChange={(e) => setForm({ ...form, metode_pembayaran: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Tempat Bayar (BCA, Dana, dll)"
          value={form.tempat_bayar}
          onChange={(e) => setForm({ ...form, tempat_bayar: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="No Rekening"
          value={form.no_rekening}
          onChange={(e) => setForm({ ...form, no_rekening: e.target.value })}
          className="border p-2 rounded"
        />

        <div>
          <input
            type="file"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);

              if (f) {
                setPreview(URL.createObjectURL(f));
              }
            }}
          />

          {preview && (
            <img src={preview} className="w-24 h-16 object-contain mt-2" />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="col-span-2 bg-blue-500 text-white p-3 rounded"
        >
          {isEdit ? "Update" : "Tambah"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Metode</th>
              <th className="p-2">Tempat</th>
              <th className="p-2">Rekening</th>
              <th className="p-2">Logo</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.metode_pembayaran}</td>
                <td className="p-2">{item.tempat_bayar}</td>
                <td className="p-2">{item.no_rekening}</td>
                <td className="p-2">
                  <img src={item.url_logo} className="w-16 h-10 object-contain" />
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