package com.nexsoft.bioskop.controller;

import com.nexsoft.bioskop.model.Ruang;
import com.nexsoft.bioskop.service.RuangService;
import com.nexsoft.bioskop.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bioskop")
public class RuangController {
    public static final Logger logger = LoggerFactory.getLogger(RuangController.class);

    @Autowired
    RuangService ruangService;

    @GetMapping("/ruang/")
    public ResponseEntity<?> getAll()
    {
        List<Ruang> list = ruangService.findAll();

        if(list.isEmpty())
        {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> getAll(@PathVariable int limit, @PathVariable int offset)
    {
        List<Ruang> list = ruangService.findAll(limit, offset);

        if(list.isEmpty())
        {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/ruang/")
    public ResponseEntity<?> create(@RequestBody Ruang ruang)
    {
        logger.info("Creating room : {}", ruang);

        String message = ruangService.validation(ruang);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        if(ruangService.isExist(ruang))
        {
            return new ResponseEntity<>(new CustomErrorType("Nama ruang sudah tersedia!"), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Ruang ruangNew = ruangService.insert(ruang);
            return new ResponseEntity<>(ruangNew, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/ruang/")
    public ResponseEntity<?> update(@RequestBody Ruang ruang)
    {
        logger.info("Updating ruang with id {}", ruang.getId());

        String message = ruangService.validation(ruang);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Ruang objectFound = ruangService.update(ruang);

            if(objectFound == null)
            {
                logger.error("Unable to update. Ruang with id {} not found.", ruang.getId());
                return new ResponseEntity<>(new CustomErrorType("Unable to update. Ruang with id " + ruang.getId() + " not found."), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(ruang, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/ruang/id/{id}")
    public ResponseEntity<?> searchById(@PathVariable String id)
    {
        List<Ruang> list;
        list = ruangService.searchById(id);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/id/{id}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchById(@PathVariable String id, @PathVariable int limit, @PathVariable int offset)
    {
        List<Ruang> list;
        list = ruangService.searchById(id, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/nama/{nama}")
    public ResponseEntity<?> searchByName(@PathVariable String nama)
    {
        List<Ruang> list;
        list = ruangService.searchByName(nama);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/nama/{nama}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByName(@PathVariable String nama, @PathVariable int limit, @PathVariable int offset)
    {
        List<Ruang> list;
        list = ruangService.searchByName(nama, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/harga/{harga}")
    public ResponseEntity<?> searchByPrice(@PathVariable int harga)
    {
        List<Ruang> list;
        list = ruangService.searchByPrice(harga);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ruang/harga/{harga}/limit/{limit}/offset/{offset}")
    public ResponseEntity<?> searchByPrice(@PathVariable int harga, @PathVariable int limit, @PathVariable int offset)
    {
        List<Ruang> list;
        list = ruangService.searchByPrice(harga, limit, offset);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
