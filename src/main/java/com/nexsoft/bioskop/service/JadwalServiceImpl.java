package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Jadwal;
import com.nexsoft.bioskop.repository.JadwalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service("JadwalService")
public class JadwalServiceImpl implements JadwalService {
    @Autowired
    JadwalRepository jadwalRepository;

    @Override
    public Jadwal insert(Jadwal jadwal) {
        UUID id = UUID.randomUUID();
        jadwal.setId(id.toString());

        synchronized (this)
        {
            jadwalRepository.insert(jadwal);
        }

        return jadwal;
    }

    @Override
    public List<Jadwal> findAll() {
        return jadwalRepository.findAll();
    }

    @Override
    public List<Jadwal> findAll(int limit, int offset) {
        return jadwalRepository.findAll(limit, offset);
    }

    @Override
    public List<Jadwal> searchByDate(LocalDate tanggal) {
        return jadwalRepository.findByTanggal(tanggal);
    }

    @Override
    public List<Jadwal> searchByDate(LocalDate tanggal, int limit, int offset) {
        return jadwalRepository.findByTanggal(tanggal, limit, offset);
    }

    @Override
    public List<Jadwal> searchByRoom(String ruang) {
        return jadwalRepository.findByRuang(ruang);
    }

    @Override
    public List<Jadwal> searchByRoom(String ruang, int limit, int offset) {
        return jadwalRepository.findByRuang(ruang, limit, offset);
    }

    @Override
    public List<Jadwal> searchByFilm(String title) {
        return jadwalRepository.findByFilm(title);
    }

    @Override
    public List<Jadwal> searchByFilm(String title, int limit, int offset) {
        return jadwalRepository.findByFilm(title, limit, offset);
    }

    @Override
    public List<Jadwal> findByFilmForCustomer(String idFilm) {
        return jadwalRepository.findByFilmForCustomer(idFilm);
    }

    @Override
    public String validation(Jadwal jadwal) {
        if((jadwal.getTanggal() == null) || (jadwal.getTanggal().toString() == ""))
        {
            return "Tanggal tidak boleh kosong!";
        }

        if((jadwal.getRuang() == null) || (jadwal.getRuang().getId() == ""))
        {
            return "Ruang tidak boleh kosong!";
        }

        if((jadwal.getFilm() == null) || (jadwal.getFilm().getId() == ""))
        {
            return "Film tidak boleh kosong!";
        }

        if((jadwal.getJam() == null) || (jadwal.getJam().toString() == ""))
        {
            return "Jam tidak boleh kosong!";
        }

        return null;
    }

    @Override
    public String validationAvaliabilityOfSpace(Jadwal jadwal) {
        Jadwal objectFound = jadwalRepository.findByDateTimeAndRoom(jadwal);

        if(objectFound != null)
        {
            if(!jadwal.getFilm().getId().equals(objectFound.getFilm().getId()))
            {
                return "Ruang " + objectFound.getRuang().getNama() + " pada tanggal " + jadwal.getTanggal() + " dan jam " + jadwal.getJam() + " sudah dipesan!";
            }
            else if(jadwal.getFilm().getId().equals(objectFound.getFilm().getId()))
            {
                return "Film " + jadwal.getFilm().getJudul() + " sudah dijadwalkan pada ruang dan waktu yang sama";
            }
        }
        else
        {
            List<Jadwal> list = jadwalRepository.findByDateTimeAndFilm(jadwal);

            if(!list.isEmpty())
            {
                if(list.size() == 2)
                {
                    return "Film " + jadwal.getFilm().getJudul() + " pada tanggal " + jadwal.getTanggal().toString() +
                            " dan jam " + jadwal.getJam().toString() + " sudah dijadwalkan untuk jenis ruang regular dan VIP";
                }
                else
                {
                    if(jadwal.getRuang().getJenis() == list.get(0).getRuang().getJenis())
                    {
                        return "Film " + list.get(0).getFilm().getJudul() + " pada tanggal " + list.get(0).getTanggal().toString() + " jam " + list.get(0).getJam() + " sudah dijadwalkan untuk jenis ruang " + ((jadwal.getRuang().getJenis() == 1) ? "Regular" : "VIP");
                    }
                }
            }
        }

        return null;
    }
}
