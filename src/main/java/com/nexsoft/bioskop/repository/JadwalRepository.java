package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Jadwal;

import java.time.LocalDate;
import java.util.List;

public interface JadwalRepository {
    List<Jadwal> findAll();
    List<Jadwal> findByTanggal(LocalDate tanggal);
    List<Jadwal> findByRuang(String ruang);
    List<Jadwal> findByFilm(String judul);
    List<Jadwal> findByFilmForCustomer(String idFilm);
    Jadwal findByIdSpecific(String id);
    Jadwal findByDateTimeAndRoom(Jadwal jadwal);
    List<Jadwal> findByDateTimeAndFilm(Jadwal jadwal);
    int insert(Jadwal jadwal);
    int update(Jadwal jadwal);
    int delete(String id);
}
