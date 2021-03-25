package com.nexsoft.bioskop.controller;

import com.nexsoft.bioskop.model.Pembelian;
import com.nexsoft.bioskop.service.PembelianService;
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
public class PembelianController {
    public static final Logger logger = LoggerFactory.getLogger(PembelianController.class);

    @Autowired
    PembelianService pembelianService;

    @PostMapping("/pembelian/")
    public ResponseEntity<?> create(@RequestBody Pembelian pembelian)
    {
        logger.info("Creating purchasing : {}", pembelian);
        try
        {
            Pembelian pembelianNew = pembelianService.insert(pembelian);
            return new ResponseEntity<>(pembelianNew, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pembelian/")
    public ResponseEntity<?> getAll()
    {
        List<Pembelian> list = pembelianService.findAll();
        if(list == null)
        {
            return new ResponseEntity<>(list, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> getAll(@PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.findAll(limit, offset);
        if(list == null)
        {
            return new ResponseEntity<>(list, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/jadwal/{idJadwal}")
    public ResponseEntity<?> getBySchedule(@PathVariable String idJadwal)
    {
        List<Pembelian> list = pembelianService.findBySchedule(idJadwal);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/pengguna/{idPengguna}")
    public ResponseEntity<?> getByUser(@PathVariable String idPengguna)
    {
        List<Pembelian> list = pembelianService.findByUser(idPengguna);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/pengguna/{idPengguna}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> getByUser(@PathVariable String idPengguna, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.findByUser(idPengguna, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/id/{id}")
    public ResponseEntity<?> searchById(@PathVariable String id)
    {
        List<Pembelian> list = pembelianService.searchById(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/id/{id}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchById(@PathVariable String id, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchById(id, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/id/{id}/customer/{idPembeli}")
    public ResponseEntity<?> searchById(@PathVariable String id, @PathVariable String idPembeli)
    {
        List<Pembelian> list = pembelianService.searchById(id, idPembeli);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/id/{id}/customer/{idPembeli}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchById(@PathVariable String id, @PathVariable String idPembeli, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchById(id, idPembeli, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/pembeli/{nama}")
    public ResponseEntity<?> searchByCustomer(@PathVariable String nama)
    {
        List<Pembelian> list = pembelianService.searchByCustomer(nama);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/pembeli/{nama}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByCustomer(@PathVariable String nama, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchByCustomer(nama, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/film/{film}")
    public ResponseEntity<?> searchByFilm(@PathVariable String film)
    {
        List<Pembelian> list = pembelianService.searchByFilm(film);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/film/{film}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByFilm(@PathVariable String film, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchByFilm(film, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/film/{film}/customer/{idPembeli}")
    public ResponseEntity<?> searchByFilm(@PathVariable String film, @PathVariable String idPembeli)
    {
        List<Pembelian> list = pembelianService.searchByFilm(film, idPembeli);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/film/{film}/customer/{idPembeli}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByFilm(@PathVariable String film, @PathVariable String idPembeli, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchByFilm(film, idPembeli, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/tanggal/{tanggal}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal)
    {
        List<Pembelian> list = pembelianService.searchByDate(tanggal);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/tanggal/{tanggal}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchByDate(tanggal, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/tanggal/{tanggal}/customer/{idPembeli}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal, @PathVariable String idPembeli)
    {
        List<Pembelian> list = pembelianService.searchByDate(tanggal, idPembeli);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pembelian/tanggal/{tanggal}/customer/{idPembeli}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByDate(@PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate tanggal, @PathVariable String idPembeli, @PathVariable int limit, @PathVariable int offset)
    {
        List<Pembelian> list = pembelianService.searchByDate(tanggal, idPembeli, limit, offset);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
