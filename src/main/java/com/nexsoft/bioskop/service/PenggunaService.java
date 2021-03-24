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
    List<Pengguna> findAll(int limit, int offset);
    List<Pengguna> searchByName(String name);
    List<Pengguna> searchByName(String name, int limit, int offset);
    List<Pengguna> searchByTelephone(String telephone);
    List<Pengguna> searchByTelephone(String telephone, int limit, int offset);
    List<Pengguna> searchByUsername(String username);
    List<Pengguna> searchByUsername(String username, int limit, int offset);
    String validation(Pengguna pengguna);
    String validationPassword(String password);
}
