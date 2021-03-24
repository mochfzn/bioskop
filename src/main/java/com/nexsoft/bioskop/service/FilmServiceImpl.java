package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Film;
import com.nexsoft.bioskop.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service("FilmService")
public class FilmServiceImpl implements FilmService {
    @Autowired
    FilmRepository filmRepository;

    @Override
    public Film insert(Film film) {
        UUID id = UUID.randomUUID();
        film.setId(id.toString());

        synchronized (this)
        {
            filmRepository.insert(film);
        }

        return film;
    }

    @Override
    public Film update(Film film) {
        Film objectFound = filmRepository.findByIdSpecific(film.getId());

        if(objectFound != null)
        {
            synchronized (this)
            {
                filmRepository.update(film);
                return objectFound;
            }
        }
        return null;
    }

    @Override
    public Film getById(String id) {
        return filmRepository.findByIdSpecific(id);
    }

    @Override
    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    @Override
    public List<Film> findAll(int limit, int offset) {
        return filmRepository.findAll(limit, offset);
    }

    @Override
    public List<Film> searchByTitle(String title) {
        return filmRepository.findByTitle(title);
    }

    @Override
    public List<Film> searchByTitle(String title, int limit, int offset) {
        return filmRepository.findByTitle(title, limit, offset);
    }

    @Override
    public List<Film> searchById(String id) {
        return filmRepository.findById(id);
    }

    @Override
    public List<Film> searchById(String id, int limit, int offset) {
        return filmRepository.findById(id, limit, offset);
    }

    @Override
    public List<Film> getFilmIsPlaying() {
        return filmRepository.getFilmIsPlaying();
    }

    @Override
    public boolean isExist(Film film) {
        return filmRepository.findByTitleSpecific(film.getJudul()) != null;
    }

    @Override
    public String validation(Film film) {
        if((film.getJudul() == null) || (film.getJudul() == ""))
        {
            return "Judul film tidak boleh kosong!";
        }

        if(film.getSensor() == 0)
        {
            return "Sensor film tidak boleh kosong!";
        }

        if((film.getBahasa() == null) || (film.getBahasa() == ""))
        {
            return "Bahasa film tidak boleh kosong!";
        }

        if((film.getJudulTambahan() == null) || (film.getJudulTambahan() == ""))
        {
            return "Judul tambahan tidak boleh kosong!";
        }

        if(film.getJudul().length() > 100)
        {
            return "Judul film tidak boleh lebih dari 100 karakter!";
        }

        if(film.getBahasa().length() > 50)
        {
            return "Bahasa film tidak boleh lebih dari 50 karakter!";
        }

        if(film.getJudulTambahan().length() > 50)
        {
            return "Judul tambahan tidak boleh lebih dari 50 karakter!";
        }

        if((film.getProduser() != null) || (film.getProduser() != ""))
        {
            if(film.getProduser().length() > 50)
            {
                return "Produser tidak boleh lebih dari 50 karakter!";
            }
        }

        if((film.getDirektur() != null) || (film.getDirektur() != ""))
        {
            if(film.getDirektur().length() > 50)
            {
                return "Direktur tidak boleh lebih dari 50 karakter!";
            }
        }

        return null;
    }
}
