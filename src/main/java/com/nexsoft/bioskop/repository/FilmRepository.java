package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Film;

import java.util.List;

public interface FilmRepository {
    List<Film> findAll();
    List<Film> findAll(int limit, int offset);
    List<Film> findByTitle(String title);
    List<Film> findByTitle(String title, int limit, int offset);
    List<Film> findById(String id);
    List<Film> findById(String id, int limit, int offset);
    List<Film> getFilmIsPlaying();
    Film findByIdSpecific(String id);
    Film findByTitleSpecific(String title);
    int insert(Film film);
    int update(Film film);
    int delete(String id);
}
