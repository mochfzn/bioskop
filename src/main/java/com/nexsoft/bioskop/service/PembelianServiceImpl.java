package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Pembelian;
import com.nexsoft.bioskop.repository.PembelianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service("PembelianService")
public class PembelianServiceImpl implements PembelianService {
    @Autowired
    PembelianRepository pembelianRepository;

    @Override
    public Pembelian insert(Pembelian pembelian) {
        UUID id = UUID.randomUUID();
        pembelian.setId(id.toString());

        synchronized (this)
        {
            pembelianRepository.insert(pembelian);
        }

        return pembelian;
    }

    @Override
    public List<Pembelian> findAll() {
        List<Pembelian> list = pembelianRepository.findAll();
        return list;
    }

    @Override
    public List<Pembelian> findAll(int limit, int offset) {
        return pembelianRepository.findAll(limit, offset);
    }

    @Override
    public List<Pembelian> findBySchedule(String idJadwal) {
        return pembelianRepository.findByJadwal(idJadwal);
    }

    @Override
    public List<Pembelian> findByUser(String idPelanggan) {
        return pembelianRepository.findByUser(idPelanggan);
    }

    @Override
    public List<Pembelian> findByUser(String idPelanggan, int limit, int offset) {
        return pembelianRepository.findByUser(idPelanggan, limit, offset);
    }

    @Override
    public List<Pembelian> searchById(String id) {
        return pembelianRepository.findById(id);
    }

    @Override
    public List<Pembelian> searchById(String id, int limit, int offset) {
        return pembelianRepository.findById(id, limit, offset);
    }

    @Override
    public List<Pembelian> searchByCustomer(String name) {
        return pembelianRepository.findByCustomer(name);
    }

    @Override
    public List<Pembelian> searchByCustomer(String name, int limit, int offset) {
        return pembelianRepository.findByCustomer(name, limit, offset);
    }

    @Override
    public List<Pembelian> searchByFilm(String film) {
        return pembelianRepository.findByFilm(film);
    }

    @Override
    public List<Pembelian> searchByFilm(String film, int limit, int offset) {
        return pembelianRepository.findByFilm(film, limit, offset);
    }

    @Override
    public List<Pembelian> searchByRoom(String room) {
        return null;
    }

    @Override
    public List<Pembelian> searchByDate(LocalDate date) {
        return pembelianRepository.findByDate(date);
    }

    @Override
    public List<Pembelian> searchByDate(LocalDate date, int limit, int offset) {
        return pembelianRepository.findByDate(date, limit, offset);
    }

    @Override
    public List<Pembelian> searchById(String id, String idCustomer) {
        return pembelianRepository.findById(id, idCustomer);
    }

    @Override
    public List<Pembelian> searchById(String id, String idCustomer, int limit, int offset) {
        return pembelianRepository.findById(id, idCustomer, limit, offset);
    }

    @Override
    public List<Pembelian> searchByFilm(String id, String idCustomer) {
        return pembelianRepository.findByFilm(id, idCustomer);
    }

    @Override
    public List<Pembelian> searchByFilm(String id, String idCustomer, int limit, int offset) {
        return pembelianRepository.findByFilm(id, idCustomer, limit, offset);
    }

    @Override
    public List<Pembelian> searchByDate(LocalDate date, String idCustomer) {
        return pembelianRepository.findByDate(date, idCustomer);
    }

    @Override
    public List<Pembelian> searchByDate(LocalDate date, String idCustomer, int limit, int offset) {
        return pembelianRepository.findByDate(date, idCustomer, limit, offset);
    }

    @Override
    public String validation(Pembelian pembelian) {
        return null;
    }
}
