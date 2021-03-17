package com.nexsoft.bioskop.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

public class Jadwal {
    private String id;
    private LocalDate tanggal;
    private LocalTime jam;
    private Ruang ruang;
    private Film film;

    public Jadwal() {
    }

    public Jadwal(String id, String tanggal, String jam) {
        this.id = id;

        String[] arrDate = tanggal.split("-");
        int year = Integer.parseInt(arrDate[0]);
        int month = Integer.parseInt(arrDate[1]);
        int date = Integer.parseInt(arrDate[2]);

        this.tanggal = LocalDate.of(year, month, date);

        String[] arrTime = jam.split(":");
        int hour = Integer.parseInt(arrTime[0]);
        int minute = Integer.parseInt(arrTime[1]);
        int second = Integer.parseInt(arrTime[2]);

        this.jam = LocalTime.of(hour,minute,second);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public LocalTime getJam() {
        return jam;
    }

    public void setJam(LocalTime jam) {
        this.jam = jam;
    }

    public Ruang getRuang() {
        return ruang;
    }

    public void setRuang(Ruang ruang) {
        this.ruang = ruang;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}
