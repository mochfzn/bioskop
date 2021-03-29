package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Pembelian;

import java.time.LocalDate;
import java.util.List;

public interface PembelianRepository {
    // Fungsi operasi
    int insert(Pembelian pembelian);
    int update(Pembelian pembelian);
    int delete(String id);

    // Pencarian berdasarkan nilai yang pasti
    Pembelian findByIdSpecific(String id);

    // Pencarian
    List<Pembelian> findAll();
    List<Pembelian> findAll(int limit, int offset);
    List<Pembelian> findById(String id);
    List<Pembelian> findById(String id, int limit, int offset);
    List<Pembelian> findByCustomer(String name);
    List<Pembelian> findByCustomer(String name, int limit, int offset);
    List<Pembelian> findByDate(LocalDate date);
    List<Pembelian> findByDate(LocalDate date, int limit, int offset);
    List<Pembelian> findByFilm(String film);
    List<Pembelian> findByFilm(String film, int limit, int offset);
    List<Pembelian> findByRuangan(String ruangan);
    List<Pembelian> findByJadwal(String idJadwal);
    List<Pembelian> findByUser(String idPelanggan);
    List<Pembelian> findByUser(String idPelanggan, int limit, int offset);

    // Pencarian untuk pelanggan/customer
    List<Pembelian> findById(String id, String idCustomer);
    List<Pembelian> findById(String id, String idCustomer, int limit, int offset);
    List<Pembelian> findByDate(LocalDate date, String idCustomer);
    List<Pembelian> findByDate(LocalDate date, String idCustomer, int limit, int offset);
    List<Pembelian> findByFilm(String film, String idCustomer);
    List<Pembelian> findByFilm(String film, String idCustomer, int limit, int offset);
}
