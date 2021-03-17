package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Ruang;

import java.util.List;

public interface RuangRepository {
    List<Ruang> findAll();
    List<Ruang> findByName(String name);
    List<Ruang> findByPrice(int price);
    List<Ruang> findByType(int type);
    List<Ruang> findById(String id);
    Ruang findByIdSpecific(String id);
    Ruang findByNameSpecific(String nama);
    int insert(Ruang ruang);
    int update(Ruang ruang);
    int delete(String id);
}
