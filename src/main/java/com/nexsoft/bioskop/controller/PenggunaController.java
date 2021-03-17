package com.nexsoft.bioskop.controller;

import com.nexsoft.bioskop.model.Pengguna;
import com.nexsoft.bioskop.service.PenggunaService;
import com.nexsoft.bioskop.util.CustomErrorType;
import com.nexsoft.bioskop.util.CustomSuccessType;
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
public class PenggunaController {
    public static final Logger logger = LoggerFactory.getLogger(PenggunaController.class);

    @Autowired
    PenggunaService penggunaService;

    @GetMapping("/pengguna/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable("username") String username)
    {
        logger.info("Fetching user with username {}", username);
        Pengguna pengguna = penggunaService.checkUsername(username);

        if(pengguna == null)
        {
            logger.error("User with username {} not found", username);
            return new ResponseEntity<>(new CustomErrorType("User with username " + username + " not found"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pengguna, HttpStatus.OK);
    }

    @PostMapping("/pengguna/check-password/")
    public ResponseEntity<?> checkPassword(@RequestBody Pengguna pengguna)
    {
        logger.info("Fetching password with id {}", pengguna.getId());
        boolean hasil = penggunaService.checkPassword(pengguna);

        if(hasil == true)
        {
            return new ResponseEntity<>(new CustomSuccessType("true"), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(new CustomSuccessType("false"), HttpStatus.OK);
        }
    }

    @PostMapping("/pengguna/")
    public ResponseEntity<?> registration(@RequestBody Pengguna pengguna)
    {
        logger.info("Creating user : {}", pengguna);

        String message = penggunaService.validation(pengguna);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Pengguna penggunaNew = penggunaService.registration(pengguna);
            return new ResponseEntity<>(penggunaNew, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pengguna/")
    public ResponseEntity<?> getAll()
    {
        List<Pengguna> list = penggunaService.findAll();

        if(list.isEmpty())
        {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/pengguna/save-password/")
    public ResponseEntity<?> savePassword(@RequestBody Pengguna pengguna)
    {
        String message = penggunaService.validationPassword(pengguna.getPassword());
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        penggunaService.savePassword(pengguna);
        return new ResponseEntity<>(new CustomSuccessType("Berhasil menyimpan kata sandi."), HttpStatus.OK);
    }

    @PostMapping("/pengguna/login/")
    public ResponseEntity<?> login(@RequestBody Pengguna pengguna)
    {
        logger.info("Checking authentication user {}", pengguna.getUsername());
        boolean hasil = penggunaService.login(pengguna);

        if(hasil == true)
        {
            return new ResponseEntity<>(new CustomSuccessType("true"), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(new CustomSuccessType("false"), HttpStatus.OK);
        }
    }

    @PutMapping("/pengguna/")
    public ResponseEntity<?> updateUser(@RequestBody Pengguna pengguna)
    {
        logger.info("Updating pengguna with id {}", pengguna.getId());

        String message = penggunaService.validation(pengguna);
        if(message != null)
        {
            return new ResponseEntity<>(new CustomErrorType(message), HttpStatus.NOT_ACCEPTABLE);
        }

        try
        {
            Pengguna objectFound = penggunaService.update(pengguna);

            if(objectFound == null)
            {
                logger.error("Unable to update. Pengguna with id {} not found.", pengguna.getId());
                return new ResponseEntity<>(new CustomErrorType("Unable to update. Pengguna with id " + pengguna.getId() + " not found."), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pengguna, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new CustomErrorType(e.getCause().getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pengguna/nama/{nama}")
    public ResponseEntity<?> searchByName(@PathVariable String nama)
    {
        List<Pengguna> list;
        list = penggunaService.searchByName(nama);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pengguna/username/{username}")
    public ResponseEntity<?> searchByUsername(@PathVariable String username)
    {
        List<Pengguna> list;
        list = penggunaService.searchByUsername(username);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/pengguna/telepon/{telepon}")
    public ResponseEntity<?> searchByTelephone(@PathVariable String telepon)
    {
        List<Pengguna> list;
        list = penggunaService.searchByTelephone(telepon);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
