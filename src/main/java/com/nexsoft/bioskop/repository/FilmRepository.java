package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Film;

import java.util.List;

public interface FilmRepository {
    List<Film> findAll();
    List<Film> findByTitle(String title);
    List<Film> findById(String id);
    List<Film> getFilmIsPlaying();
    Film findByIdSpecific(String id);
    Film findByTitleSpecific(String title);
    int insert(Film film);
    int update(Film film);
    int delete(String id);
}
