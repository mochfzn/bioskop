package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Film;

import java.time.LocalDate;
import java.util.List;

public interface FilmRepository {
    List<Film> findAll();
    List<Film> findAll(int limit, int offset);
    List<Film> findByTitle(String title);
    List<Film> findByTitle(String title, int limit, int offset);
    List<Film> findById(String id);
    List<Film> findById(String id, int limit, int offset);
    List<Film> getFilmIsPlaying();
    List<Film> getFilmIsPlaying(int limit, int offset);
    List<Film> getFilmIsPlaying(LocalDate tanggal);
    List<Film> getFilmIsPlaying(LocalDate tanggal, int limit, int offset);
    Film findByIdSpecific(String id);
    Film findByTitleSpecific(String title);
    int insert(Film film);
    int update(Film film);
    int delete(String id);
}
