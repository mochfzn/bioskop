package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Film;

import java.util.List;

public interface FilmService {
    Film insert(Film film);
    Film update(Film film);
    Film getById(String id);
    List<Film> findAll();
    List<Film> findAll(int limit, int offset);
    List<Film> searchByTitle(String title);
    List<Film> searchByTitle(String title, int limit, int offset);
    List<Film> searchById(String id);
    List<Film> searchById(String id, int limit, int offset);
    List<Film> getFilmIsPlaying();
    boolean isExist(Film film);
    String validation(Film film);
}
