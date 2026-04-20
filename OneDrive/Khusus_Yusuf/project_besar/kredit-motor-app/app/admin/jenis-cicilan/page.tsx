"use client";

import { useEffect, useState } from "react";

type Cicilan = {
  id: number;
  lama_cicilan: number;
  margin_kredit: number;
};

export default function JenisCicilanPage() {
  const [data, setData] = useState<Cicilan[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    lama_cicilan: "",
    margin_kredit: "",
  });

  // ================= FETCH
  const fetchData = async () => {
    const res = await fetch("/api/admin/jenis-cicilan");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SUBMIT
  const handleSubmit = async () => {
    const method = isEdit ? "PUT" : "POST";

    await fetch("/api/admin/jenis-cicilan", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        lama_cicilan: Number(form.lama_cicilan),
        margin_kredit: Number(form.margin_kredit),
      }),
    });

    alert(isEdit ? "Berhasil update" : "Berhasil tambah");

    setForm({
      lama_cicilan: "",
      margin_kredit: "",
    });

    setIsEdit(false);
    setEditId(null);

    fetchData();
  };

  // ================= EDIT
  const handleEdit = (item: Cicilan) => {
    setIsEdit(true);
    setEditId(item.id);

    setForm({
      lama_cicilan: String(item.lama_cicilan),
      margin_kredit: String(item.margin_kredit),
    });
  };

  // ================= DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;

    await fetch("/api/admin/jenis-cicilan", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jenis Cicilan</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Lama Cicilan (bulan)"
          value={form.lama_cicilan}
          onChange={(e) => setForm({ ...form, lama_cicilan: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Margin Kredit (%)"
          value={form.margin_kredit}
          onChange={(e) => setForm({ ...form, margin_kredit: e.target.value })}
          className="border p-2 rounded"
        />

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
              <th className="p-2">Lama Cicilan</th>
              <th className="p-2">Margin (%)</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.lama_cicilan} bulan</td>
                <td className="p-2">{item.margin_kredit}%</td>

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