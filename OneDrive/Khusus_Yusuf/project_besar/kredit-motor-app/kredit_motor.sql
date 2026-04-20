-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 20, 2026 at 08:15 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kredit_motor`
--

-- --------------------------------------------------------

--
-- Table structure for table `angsuran`
--

CREATE TABLE `angsuran` (
  `id` bigint NOT NULL,
  `id_kredit` bigint DEFAULT NULL,
  `angsuran_ke` int DEFAULT NULL,
  `tgl_bayar` date DEFAULT NULL,
  `total_bayar` double DEFAULT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asuransi`
--

CREATE TABLE `asuransi` (
  `id` bigint NOT NULL,
  `nama_asuransi` varchar(50) DEFAULT NULL,
  `nama_perusahaan_linux` varchar(100) DEFAULT NULL,
  `margin_asuransi` decimal(8,2) DEFAULT NULL,
  `no_rekening` varchar(50) DEFAULT NULL,
  `url_logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_cicilan`
--

CREATE TABLE `jenis_cicilan` (
  `id` bigint NOT NULL,
  `lama_cicilan` int DEFAULT NULL,
  `margin_kredit` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_motor`
--

CREATE TABLE `jenis_motor` (
  `id` bigint NOT NULL,
  `merk` varchar(100) DEFAULT NULL,
  `jenis` enum('Bebek','Skuter','Dual Sport','Naked Sport','Sport Bike','Retro','Cruiser','Sport Touring','Dirt Bike','Motocross','Scrambler','ATV','Motor Adventure','Lainnya') DEFAULT NULL,
  `deskripsi_jenis` text,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kredit`
--

CREATE TABLE `kredit` (
  `id` bigint NOT NULL,
  `id_pengajuan` bigint DEFAULT NULL,
  `id_metode_pembayaran` bigint DEFAULT NULL,
  `tgl_mulai_kredit` date DEFAULT NULL,
  `tgl_selesai_kredit` date DEFAULT NULL,
  `sisa_kredit` double DEFAULT NULL,
  `status_kredit` enum('Dicicil','Macet','Lunas') DEFAULT NULL,
  `keterangan_status_kredit` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `metode_pembayaran`
--

CREATE TABLE `metode_pembayaran` (
  `id` bigint NOT NULL,
  `metode_pembayaran` varchar(30) DEFAULT NULL,
  `tempat_bayar` varchar(50) DEFAULT NULL,
  `no_rekening` varchar(50) DEFAULT NULL,
  `url_logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `motor`
--

CREATE TABLE `motor` (
  `id` bigint NOT NULL,
  `nama_motor` varchar(100) DEFAULT NULL,
  `id_jenis` bigint DEFAULT NULL,
  `harga_jual` int DEFAULT NULL,
  `deskripsi` text,
  `warna` varchar(50) DEFAULT NULL,
  `kapasitas_mesin` varchar(20) DEFAULT NULL,
  `tahun_produksi` year DEFAULT NULL,
  `foto1` varchar(255) DEFAULT NULL,
  `foto2` varchar(255) DEFAULT NULL,
  `foto3` varchar(255) DEFAULT NULL,
  `stok` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` bigint NOT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_telp` varchar(15) DEFAULT NULL,
  `katakunci` varchar(255) DEFAULT NULL,
  `alamat1` varchar(255) DEFAULT NULL,
  `kota1` varchar(255) DEFAULT NULL,
  `provinsi1` varchar(255) DEFAULT NULL,
  `kodepos1` varchar(10) DEFAULT NULL,
  `alamat2` varchar(255) DEFAULT NULL,
  `kota2` varchar(255) DEFAULT NULL,
  `provinsi2` varchar(255) DEFAULT NULL,
  `kodepos2` varchar(10) DEFAULT NULL,
  `alamat3` varchar(255) DEFAULT NULL,
  `kota3` varchar(255) DEFAULT NULL,
  `provinsi3` varchar(255) DEFAULT NULL,
  `kodepos3` varchar(10) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_kredit`
--

CREATE TABLE `pengajuan_kredit` (
  `id` bigint NOT NULL,
  `tgl_pengajuan` date DEFAULT NULL,
  `id_pelanggan` bigint DEFAULT NULL,
  `id_motor` bigint DEFAULT NULL,
  `harga_cash` int DEFAULT NULL,
  `harga_kredit` int DEFAULT NULL,
  `dp` int DEFAULT NULL,
  `id_jenis_cicilan` bigint DEFAULT NULL,
  `id_asuransi` bigint DEFAULT NULL,
  `cicilan_perbulan` double DEFAULT NULL,
  `biaya_asuransi_perbulan` double DEFAULT NULL,
  `url_kk` varchar(255) DEFAULT NULL,
  `url_ktp` varchar(255) DEFAULT NULL,
  `url_npwp` varchar(255) DEFAULT NULL,
  `url_slip_gaji` varchar(255) DEFAULT NULL,
  `url_foto` varchar(255) DEFAULT NULL,
  `status_pengajuan` enum('Menunggu Konfirmasi','Diproses','Dibatalkan Pembeli','Dibatalkan Penjual','Bermasalah','Diterima') DEFAULT NULL,
  `keterangan_status_pengajuan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengiriman`
--

CREATE TABLE `pengiriman` (
  `id` bigint NOT NULL,
  `id_kredit` bigint DEFAULT NULL,
  `no_invoice` varchar(100) DEFAULT NULL,
  `tgl_kirim` date DEFAULT NULL,
  `tgl_tiba` date DEFAULT NULL,
  `status_kirim` varchar(50) DEFAULT NULL,
  `nama_kurir` varchar(100) DEFAULT NULL,
  `telpon_kurir` varchar(20) DEFAULT NULL,
  `bukti_foto` varchar(255) DEFAULT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role` enum('admin','marketing','ceo') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `angsuran`
--
ALTER TABLE `angsuran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kredit` (`id_kredit`);

--
-- Indexes for table `asuransi`
--
ALTER TABLE `asuransi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_cicilan`
--
ALTER TABLE `jenis_cicilan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_motor`
--
ALTER TABLE `jenis_motor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kredit`
--
ALTER TABLE `kredit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pengajuan` (`id_pengajuan`),
  ADD KEY `id_metode_pembayaran` (`id_metode_pembayaran`);

--
-- Indexes for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengajuan_kredit`
--
ALTER TABLE `pengajuan_kredit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pelanggan` (`id_pelanggan`),
  ADD KEY `id_motor` (`id_motor`),
  ADD KEY `id_jenis_cicilan` (`id_jenis_cicilan`),
  ADD KEY `id_asuransi` (`id_asuransi`);

--
-- Indexes for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kredit` (`id_kredit`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `angsuran`
--
ALTER TABLE `angsuran`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asuransi`
--
ALTER TABLE `asuransi`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_cicilan`
--
ALTER TABLE `jenis_cicilan`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_motor`
--
ALTER TABLE `jenis_motor`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kredit`
--
ALTER TABLE `kredit`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `motor`
--
ALTER TABLE `motor`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengajuan_kredit`
--
ALTER TABLE `pengajuan_kredit`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengiriman`
--
ALTER TABLE `pengiriman`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `angsuran`
--
ALTER TABLE `angsuran`
  ADD CONSTRAINT `angsuran_ibfk_1` FOREIGN KEY (`id_kredit`) REFERENCES `kredit` (`id`);

--
-- Constraints for table `kredit`
--
ALTER TABLE `kredit`
  ADD CONSTRAINT `kredit_ibfk_1` FOREIGN KEY (`id_pengajuan`) REFERENCES `pengajuan_kredit` (`id`),
  ADD CONSTRAINT `kredit_ibfk_2` FOREIGN KEY (`id_metode_pembayaran`) REFERENCES `metode_pembayaran` (`id`);

--
-- Constraints for table `motor`
--
ALTER TABLE `motor`
  ADD CONSTRAINT `motor_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_motor` (`id`);

--
-- Constraints for table `pengajuan_kredit`
--
ALTER TABLE `pengajuan_kredit`
  ADD CONSTRAINT `pengajuan_kredit_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id`),
  ADD CONSTRAINT `pengajuan_kredit_ibfk_2` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id`),
  ADD CONSTRAINT `pengajuan_kredit_ibfk_3` FOREIGN KEY (`id_jenis_cicilan`) REFERENCES `jenis_cicilan` (`id`),
  ADD CONSTRAINT `pengajuan_kredit_ibfk_4` FOREIGN KEY (`id_asuransi`) REFERENCES `asuransi` (`id`);

--
-- Constraints for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD CONSTRAINT `pengiriman_ibfk_1` FOREIGN KEY (`id_kredit`) REFERENCES `kredit` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
