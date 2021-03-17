package com.nexsoft.bioskop.model;

import java.util.List;

public class Pembelian {
    private String id;
    private short jumlahTiket;
    private float total;
    private short tipe;
    private Jadwal jadwal;
    private Pengguna pengguna;
    private List<TempatDuduk> tempatDuduk;

    public Pembelian() {
    }

    public Pembelian(String id, short jumlahTiket, float total, short tipe) {
        this.id = id;
        this.jumlahTiket = jumlahTiket;
        this.total = total;
        this.tipe = tipe;
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

    public void setTotal(float total) {
        this.total = total;
    }

    public short getTipe() {
        return tipe;
    }

    public void setTipe(short tipe) {
        this.tipe = tipe;
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
