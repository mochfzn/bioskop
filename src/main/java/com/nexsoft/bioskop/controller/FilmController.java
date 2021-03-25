package com.nexsoft.bioskop.controller;

import com.nexsoft.bioskop.model.Film;
import com.nexsoft.bioskop.service.FilmService;
import com.nexsoft.bioskop.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bioskop")
public class FilmController {
    public static final Logger logger = LoggerFactory.getLogger(FilmController.class);

    @Autowired
    FilmService filmService;

    @GetMapping("/film/")
    public ResponseEntity<List<Film>> getAll()
    {
        List<Film> list = filmService.findAll();

        if(list == null)
        {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/limit/{limit}/offset/{offset}")
    public ResponseEntity<List<Film>> getAll(@PathVariable int limit, @PathVariable int offset)
    {
        List<Film> list = filmService.findAll(limit, offset);

        if(list == null)
        {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/film/")
    public ResponseEntity<?> create(@RequestBody Film film)
    {
        logger.info("Creating film : {}", film);

        String message = filmService.validation(film);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        if(filmService.isExist(film))
        {
            return new ResponseEntity<>(new CustomErrorType("Judul sudah tersedia!"), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Film filmNew = filmService.insert(film);
            return new ResponseEntity<>(filmNew, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/film")
    public ResponseEntity<?> update(@RequestBody Film film)
    {
        logger.info("Updating film with id {}", film.getId());

        try
        {
            Film objectFound = filmService.update(film);

            if(objectFound == null)
            {
                logger.error("Unable to update. Film with id {} not found.", film.getId());
                return new ResponseEntity<>(new CustomErrorType("Unable to update. Film with id " + film.getId() + " not found."), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(film, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/film/id/{id}")
    public ResponseEntity<?> searchById(@PathVariable String id)
    {
        List<Film> list;
        list = filmService.searchById(id);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/id/{id}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchById(@PathVariable String id, @PathVariable int limit, @PathVariable int offset)
    {
        List<Film> list;
        list = filmService.searchById(id, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/judul/{judul}")
    public ResponseEntity<?> searchByTitle(@PathVariable String judul)
    {
        List<Film> list;
        list = filmService.searchByTitle(judul);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/judul/{judul}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByTitle(@PathVariable String judul, @PathVariable int limit, @PathVariable int offset)
    {
        List<Film> list;
        list = filmService.searchByTitle(judul, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/playing/")
    public ResponseEntity<?> playing()
    {
        List<Film> list = filmService.getFilmIsPlaying();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/playing/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> playing(@PathVariable int limit, @PathVariable int offset)
    {
        List<Film> list = filmService.getFilmIsPlaying(limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/playing/tanggal/{tanggal}")
    public ResponseEntity<?> playing(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal)
    {
        List<Film> list = filmService.getFilmIsPlaying(tanggal);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/playing/tanggal/{tanggal}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> playing(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal, @PathVariable int limit, @PathVariable int offset)
    {
        List<Film> list = filmService.getFilmIsPlaying(tanggal, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/film/find/id/{id}")
    public ResponseEntity<?> findById(@PathVariable String id)
    {
        Film film = filmService.getById(id);

        if(film == null)
        {
            return new ResponseEntity<>(new CustomErrorType("Film is not found!"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(film, HttpStatus.OK);
    }
}
