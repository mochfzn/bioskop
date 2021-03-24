package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Pengguna;

import java.util.List;

public interface PenggunaRepository {
    List<Pengguna> findAll();
    List<Pengguna> findAll(int limit, int offset);
    List<Pengguna> findByName(String name);
    List<Pengguna> findByName(String name, int limit, int offset);
    List<Pengguna> findByTelephone(String telephone);
    List<Pengguna> findByTelephone(String telephone, int limit, int offset);
    List<Pengguna> findByUsername(String username);
    List<Pengguna> findByUsername(String username, int limit, int offset);
    Pengguna findByIdSpecific(String id);
    Pengguna findByUsernameSpecific(String username);
    Pengguna login(String username);
    int insert(Pengguna pengguna);
    int update(Pengguna pengguna);
    int delete(String id);
    int insertPassword(Pengguna pengguna);
    String getPassword(Pengguna pengguna);
}
