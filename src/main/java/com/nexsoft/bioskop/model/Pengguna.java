package com.nexsoft.bioskop.model;

public class Pengguna {
    private String id;
    private String nama;
    private String telepon;
    private String email;
    private String username;
    private String password;
    private short hakAkses;
    private String alamat;

    public Pengguna() {
    }

    public Pengguna(String id, String nama, String telepon, String email, String username, short hakAkses, String alamat) {
        this.id = id;
        this.nama = nama;
        this.telepon = telepon;
        this.email = email;
        this.username = username;
        this.hakAkses = hakAkses;
        this.alamat = alamat;
    }

    public Pengguna(String id, String nama, String telepon, String email, String username, String password, short hakAkses, String alamat) {
        this.id = id;
        this.nama = nama;
        this.telepon = telepon;
        this.email = email;
        this.username = username;
        this.password = password;
        this.hakAkses = hakAkses;
        this.alamat = alamat;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getTelepon() {
        return telepon;
    }

    public void setTelepon(String telepon) {
        this.telepon = telepon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public short getHakAkses() {
        return hakAkses;
    }

    public void setHakAkses(short hakAkses) {
        this.hakAkses = hakAkses;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }
}
