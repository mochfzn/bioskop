package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Pembelian;

import java.util.Date;
import java.util.List;

public interface PembelianRepository {
    List<Pembelian> findAll();
    List<Pembelian> findByPurchasingDate(Date date);
    List<Pembelian> findByFilm(String film);
    List<Pembelian> findByRuangan(String ruangan);
    Pembelian findByIdSpecific(String id);
    int insert(Pembelian pembelian);
    int update(Pembelian pembelian);
    int delete(String id);
}
