import { RowDataPacket } from "mysql2";

export interface Pelanggan {
  id_pelanggan: number;
  no_hp: string;
  katakunci: string;
  nama?: string;
}

export interface AdminUser {
  id_user: number;
  username: string;
  password: string;
  role: "admin" | "marketing" | "ceo";
}

export interface Pelanggan extends RowDataPacket {
  id_pelanggan: number;
  email: string;
  katakunci: string;
  nama_pelanggan?: string;
}