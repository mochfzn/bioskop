package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Ruang;

import java.util.List;

public interface RuangRepository {
    List<Ruang> findAll();
    List<Ruang> findAll(int limit, int offset);
    List<Ruang> findByName(String name);
    List<Ruang> findByName(String name, int limit, int offset);
    List<Ruang> findByPrice(int price);
    List<Ruang> findByPrice(int price, int limit, int offset);
    List<Ruang> findByType(int type);
    List<Ruang> findById(String id);
    List<Ruang> findById(String id, int limit, int offset);
    Ruang findByIdSpecific(String id);
    Ruang findByNameSpecific(String nama);
    int insert(Ruang ruang);
    int update(Ruang ruang);
    int delete(String id);
}
