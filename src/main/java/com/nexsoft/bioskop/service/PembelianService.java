package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Jadwal;
import com.nexsoft.bioskop.model.Pembelian;

import java.time.LocalDate;
import java.util.List;

public interface PembelianService {
    // Simpan transaksi
    Pembelian insert(Pembelian pembelian);

    // mencari pembelian/transaksi
    List<Pembelian> findAll();
    List<Pembelian> findBySchedule(String idJadwal);
    List<Pembelian> findByUser(String idPelanggan);

    // Validasi
    String validation(Pembelian pembelian);

    // pencarian untuk laporan penjualan tiket yang digunakan oleh admin
    List<Pembelian> searchByCustomer(String name);
    List<Pembelian> searchById(String id);
    List<Pembelian> searchByFilm(String film);
    List<Pembelian> searchByRoom(String room);
    List<Pembelian> searchByDate(LocalDate date);

    // pencarian untuk riwayat pembelian oleh pembeli
    List<Pembelian> searchById(String id, String idCustomer);
    List<Pembelian> searchByFilm(String id, String idCustomer);
    List<Pembelian> searchByDate(LocalDate date, String idCustomer);
}
