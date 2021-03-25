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
    List<Pembelian> findAll(int limit, int offset);
    List<Pembelian> findBySchedule(String idJadwal);
    List<Pembelian> findByUser(String idPelanggan);
    List<Pembelian> findByUser(String idPelanggan, int limit, int offset);

    // Validasi
    String validation(Pembelian pembelian);

    // pencarian untuk laporan penjualan tiket yang digunakan oleh admin
    List<Pembelian> searchByCustomer(String name);
    List<Pembelian> searchByCustomer(String name, int limit, int offset);
    List<Pembelian> searchById(String id);
    List<Pembelian> searchById(String id, int limit, int offset);
    List<Pembelian> searchByFilm(String film);
    List<Pembelian> searchByFilm(String film, int limit, int offset);
    List<Pembelian> searchByRoom(String room);
    List<Pembelian> searchByDate(LocalDate date);
    List<Pembelian> searchByDate(LocalDate date, int limit, int offset);

    // pencarian untuk riwayat pembelian oleh pembeli
    List<Pembelian> searchById(String id, String idCustomer);
    List<Pembelian> searchById(String id, String idCustomer, int limit, int offset);
    List<Pembelian> searchByFilm(String id, String idCustomer);
    List<Pembelian> searchByFilm(String id, String idCustomer, int limit, int offset);
    List<Pembelian> searchByDate(LocalDate date, String idCustomer);
    List<Pembelian> searchByDate(LocalDate date, String idCustomer, int limit, int offset);
}
