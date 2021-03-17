package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Ruang;

import java.util.List;

public interface RuangService {
    Ruang findById(String id);
    Ruang findByName(String name);
    Ruang insert(Ruang ruang);
    Ruang update(Ruang ruang);
    List<Ruang> findAll();
    List<Ruang> searchByName(String name);
    List<Ruang> searchByPrice(int price);
    List<Ruang> searchByType(int type);
    List<Ruang> searchById(String id);
    boolean isExist(Ruang ruang);
    String validation(Ruang ruang);
}
