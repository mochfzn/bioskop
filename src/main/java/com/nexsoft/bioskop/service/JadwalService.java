package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Jadwal;

import java.time.LocalDate;
import java.util.List;

public interface JadwalService {
    Jadwal insert(Jadwal jadwal);
    List<Jadwal> findAll();
    List<Jadwal> searchByDate(LocalDate tanggal);
    List<Jadwal> searchByRoom(String ruang);
    List<Jadwal> searchByFilm(String title);
    List<Jadwal> findByFilmForCustomer(String idFilm);
    String validation(Jadwal jadwal);
    String validationAvaliabilityOfSpace(Jadwal jadwal);
}
