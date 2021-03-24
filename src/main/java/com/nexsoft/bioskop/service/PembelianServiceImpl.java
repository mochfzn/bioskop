package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Jadwal;
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
        System.out.println(list.get(0).getId());
        return list;
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
    public List<Pembelian> searchById(String id) {
        return pembelianRepository.findById(id);
    }

    @Override
    public List<Pembelian> searchByCustomer(String name) {
        return pembelianRepository.findByCustomer(name);
    }

    @Override
    public List<Pembelian> searchByFilm(String film) {
        return pembelianRepository.findByFilm(film);
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
    public List<Pembelian> searchById(String id, String idCustomer) {
        return pembelianRepository.findById(id, idCustomer);
    }

    @Override
    public List<Pembelian> searchByFilm(String id, String idCustomer) {
        return pembelianRepository.findByFilm(id, idCustomer);
    }

    @Override
    public List<Pembelian> searchByDate(LocalDate date, String idCustomer) {
        return pembelianRepository.findByDate(date, idCustomer);
    }

    @Override
    public String validation(Pembelian pembelian) {
        return null;
    }
}
