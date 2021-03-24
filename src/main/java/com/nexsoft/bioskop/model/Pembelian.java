package com.nexsoft.bioskop.model;

import java.time.LocalDate;
import java.util.List;

public class Pembelian {
    private String id;
    private short jumlahTiket;
    private int total;
    private LocalDate tanggal;
    private Jadwal jadwal;
    private Pengguna pengguna;
    private List<TempatDuduk> tempatDuduk;

    public Pembelian() {
    }

    public Pembelian(String id, short jumlahTiket, int total, LocalDate tanggal) {
        this.id = id;
        this.jumlahTiket = jumlahTiket;
        this.total = total;
        this.tanggal = tanggal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public short getJumlahTiket() {
        return jumlahTiket;
    }

    public void setJumlahTiket(short jumlahTiket) {
        this.jumlahTiket = jumlahTiket;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public Jadwal getJadwal() {
        return jadwal;
    }

    public void setJadwal(Jadwal jadwal) {
        this.jadwal = jadwal;
    }

    public Pengguna getPengguna() {
        return pengguna;
    }

    public void setPengguna(Pengguna pengguna) {
        this.pengguna = pengguna;
    }

    public List<TempatDuduk> getTempatDuduk() {
        return tempatDuduk;
    }

    public void setTempatDuduk(List<TempatDuduk> tempatDuduk) {
        this.tempatDuduk = tempatDuduk;
    }
}
