package com.nexsoft.bioskop.controller;

import com.nexsoft.bioskop.model.Jadwal;
import com.nexsoft.bioskop.service.JadwalService;
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
public class JadwalController {
    public static final Logger logger = LoggerFactory.getLogger(JadwalController.class);

    @Autowired
    JadwalService jadwalService;

    @GetMapping("/jadwal/")
    public ResponseEntity<List<Jadwal>> getAll()
    {
        List<Jadwal> list = jadwalService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/limit/{limit}/offset/{offset}")
    public ResponseEntity<List<Jadwal>> getAll(@PathVariable int limit, @PathVariable int offset)
    {
        List<Jadwal> list = jadwalService.findAll(limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/jadwal/")
    public ResponseEntity<?> create(@RequestBody Jadwal jadwal)
    {
        String message;

        logger.info("Creating jadwal : {}", jadwal);

        message = jadwalService.validation(jadwal);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        message = jadwalService.validationAvaliabilityOfSpace(jadwal);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Jadwal jadwalNew = jadwalService.insert(jadwal);
            return new ResponseEntity<>(jadwalNew, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/jadwal/tanggal/{tanggal}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal)
    {
        List<Jadwal> list;
        list = jadwalService.searchByDate(tanggal);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/tanggal/{tanggal}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal, @PathVariable int limit, @PathVariable int offset)
    {
        List<Jadwal> list;
        list = jadwalService.searchByDate(tanggal, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/ruang/{ruang}")
    public ResponseEntity<?> searchByRoom(@PathVariable String ruang)
    {
        List<Jadwal> list;
        list = jadwalService.searchByRoom(ruang);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/ruang/{ruang}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByRoom(@PathVariable String ruang, @PathVariable int limit, @PathVariable int offset)
    {
        List<Jadwal> list;
        list = jadwalService.searchByRoom(ruang, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/film/{judul}")
    public ResponseEntity<?> searchByFilm(@PathVariable String judul)
    {
        List<Jadwal> list;
        list = jadwalService.searchByFilm(judul);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/film/{judul}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByFilm(@PathVariable String judul, @PathVariable int limit, @PathVariable int offset)
    {
        List<Jadwal> list;
        list = jadwalService.searchByFilm(judul, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/jadwal/find/film/{idFilm}")
    public ResponseEntity<?> findByFilmForCustomer(@PathVariable String idFilm)
    {
        List<Jadwal> list;
        list = jadwalService.findByFilmForCustomer(idFilm);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
