package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Ruang;

import java.util.List;

public interface RuangService {
    Ruang findById(String id);
    Ruang findByName(String name);
    Ruang insert(Ruang ruang);
    Ruang update(Ruang ruang);
    List<Ruang> findAll();
    List<Ruang> findAll(int limit, int offset);
    List<Ruang> searchByName(String name);
    List<Ruang> searchByName(String name, int limit, int offset);
    List<Ruang> searchByPrice(int price);
    List<Ruang> searchByPrice(int price, int limit, int offset);
    List<Ruang> searchByType(int type);
    List<Ruang> searchById(String id);
    List<Ruang> searchById(String id, int limit, int offset);
    boolean isExist(Ruang ruang);
    String validation(Ruang ruang);
}
