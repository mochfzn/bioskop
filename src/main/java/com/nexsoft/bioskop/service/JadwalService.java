package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Jadwal;

import java.time.LocalDate;
import java.util.List;

public interface JadwalService {
    Jadwal insert(Jadwal jadwal);
    List<Jadwal> findAll();
    List<Jadwal> findAll(int limit, int offset);
    List<Jadwal> searchByDate(LocalDate tanggal);
    List<Jadwal> searchByDate(LocalDate tanggal, int limit, int offset);
    List<Jadwal> searchByRoom(String ruang);
    List<Jadwal> searchByRoom(String ruang, int limit, int offset);
    List<Jadwal> searchByFilm(String title);
    List<Jadwal> searchByFilm(String title, int limit, int offset);
    List<Jadwal> findByFilmForCustomer(String idFilm);
    String validation(Jadwal jadwal);
    String validationAvaliabilityOfSpace(Jadwal jadwal);
}
