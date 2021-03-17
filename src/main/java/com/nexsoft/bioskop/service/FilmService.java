package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Film;

import java.util.List;

public interface FilmService {
    Film insert(Film film);
    Film update(Film film);
    Film getById(String id);
    List<Film> findAll();
    List<Film> searchByTitle(String title);
    List<Film> searchById(String id);
    List<Film> getFilmIsPlaying();
    boolean isExist(Film film);
    String validation(Film film);
}
