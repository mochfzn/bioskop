package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Jadwal;

import java.time.LocalDate;
import java.util.List;

public interface JadwalRepository {
    List<Jadwal> findAll();
    List<Jadwal> findAll(int limit, int offset);
    List<Jadwal> findByTanggal(LocalDate tanggal);
    List<Jadwal> findByTanggal(LocalDate tanggal, int limit, int offset);
    List<Jadwal> findByRuang(String ruang);
    List<Jadwal> findByRuang(String ruang, int limit, int offset);
    List<Jadwal> findByFilm(String judul);
    List<Jadwal> findByFilm(String judul, int limit, int offset);
    List<Jadwal> findByFilmForCustomer(String idFilm);
    Jadwal findByIdSpecific(String id);
    Jadwal findByDateTimeAndRoom(Jadwal jadwal);
    List<Jadwal> findByDateTimeAndFilm(Jadwal jadwal);
    int insert(Jadwal jadwal);
    int update(Jadwal jadwal);
    int delete(String id);
}
