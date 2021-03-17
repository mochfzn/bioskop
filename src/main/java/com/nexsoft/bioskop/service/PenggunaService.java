package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Pengguna;

import java.util.List;

public interface PenggunaService {
    Pengguna checkUsername(String username);
    boolean checkPassword(Pengguna pengguna);
    boolean login(Pengguna pengguna);
    Pengguna registration(Pengguna pengguna);
    Pengguna savePassword(Pengguna pengguna);
    Pengguna update(Pengguna pengguna);
    Pengguna findById(String id);
    List<Pengguna> findAll();
    List<Pengguna> searchByName(String name);
    List<Pengguna> searchByTelephone(String telephone);
    List<Pengguna> searchByUsername(String username);
    String validation(Pengguna pengguna);
    String validationPassword(String password);
}
