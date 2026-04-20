import { RowDataPacket } from "mysql2";

export interface Pelanggan extends RowDataPacket {
  id_pelanggan: number;
  email: string;
  nama_pelanggan: string;
}

export interface Pengajuan extends RowDataPacket {
  id_pengajuan: number;
  id_pelanggan: number;
  status: string;
}

export interface Kredit extends RowDataPacket {
  id_kredit: number;
  id_pelanggan: number;
  sisa_kredit: number;
  status: string;
}

export interface Angsuran extends RowDataPacket {
  id_angsuran: number;
  id_kredit: number;
  jumlah_bayar: number;
  tanggal_bayar: string;
}

export interface Pengiriman extends RowDataPacket {
  id_pengiriman: number;
  id_kredit: number;
  status: string;
}

export interface DashboardResponse {
  user: Pelanggan;
  pengajuan: Pengajuan[];
  kredit: Kredit[];
  angsuran: Angsuran[];
  pengiriman: Pengiriman[];
}