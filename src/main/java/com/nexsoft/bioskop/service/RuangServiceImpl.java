package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Ruang;
import com.nexsoft.bioskop.repository.RuangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service("RuangService")
public class RuangServiceImpl implements RuangService {
    @Autowired
    RuangRepository ruangRepository;

    @Override
    public Ruang findById(String id) {
        return ruangRepository.findByIdSpecific(id);
    }

    @Override
    public Ruang findByName(String name) {
        return ruangRepository.findByNameSpecific(name);
    }

    @Override
    public Ruang insert(Ruang ruang) {
        UUID id = UUID.randomUUID();
        ruang.setId(id.toString());

        synchronized (this)
        {
            ruangRepository.insert(ruang);
        }

        return ruang;
    }

    @Override
    public Ruang update(Ruang ruang) {
        Ruang objectFound = ruangRepository.findByIdSpecific(ruang.getId());

        if(objectFound != null)
        {
            synchronized (this)
            {
                ruangRepository.update(ruang);
                return objectFound;
            }
        }
        return null;
    }

    @Override
    public List<Ruang> findAll() {
        return ruangRepository.findAll();
    }

    @Override
    public List<Ruang> searchByName(String name) {
        return ruangRepository.findByName(name);
    }

    @Override
    public List<Ruang> searchByPrice(int price) {
        return ruangRepository.findByPrice(price);
    }

    @Override
    public List<Ruang> searchByType(int type) {
        return ruangRepository.findByType(type);
    }

    @Override
    public List<Ruang> searchById(String id) {
        return ruangRepository.findById(id);
    }

    @Override
    public boolean isExist(Ruang ruang) {
        return ruangRepository.findByNameSpecific(ruang.getNama()) != null;
    }

    @Override
    public String validation(Ruang ruang) {
        if((ruang.getNama() == null) || (ruang.getNama() == ""))
        {
            return "Nama tidak boleh kosong!";
        }

        if(ruang.getHarga() == 0)
        {
            return "Harga tidak boleh kosong!";
        }

        if(ruang.getJenis() == 0)
        {
            return "Jenis tidak boleh kosong!";
        }

        if(ruang.getNama().length() > 50)
        {
            return "Nama ruang tidak boleh lebih dari 50 karakter!";
        }

        return null;
    }
}
