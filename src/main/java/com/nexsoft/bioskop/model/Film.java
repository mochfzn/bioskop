package com.nexsoft.bioskop.model;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;

public class Film {
    private String id;
    private String judul;
    private String produser;
    private String direktur;
    private short sensor;
    private String bahasa;
    private String judulTambahan;
    private LocalTime durasi;
    private ArrayList<String> genre;
    private String deskripsi;

    public Film() {
        this.genre = new ArrayList<>();
    }

    public Film(String id, String judul, String produser, String direktur, short sensor, String bahasa, String judulTambahan, String durasi, String genre, String deskripsi) {
        this.id = id;
        this.judul = judul;
        this.produser = produser;
        this.direktur = direktur;
        this.sensor = sensor;
        this.bahasa = bahasa;
        this.judulTambahan = judulTambahan;

        String[] arrTime = durasi.split(":");
        int hour = Integer.parseInt(arrTime[0]);
        int minute = Integer.parseInt(arrTime[1]);
        int second = Integer.parseInt(arrTime[2]);

        this.durasi = LocalTime.of(hour,minute,second);

        this.genre = new ArrayList<>();
        String[] array = genre.split(",");

        for(String data: array)
        {
            this.genre.add(data);
        }

        this.deskripsi = deskripsi;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJudul() {
        return judul;
    }

    public void setJudul(String judul) {
        this.judul = judul;
    }

    public String getProduser() {
        return produser;
    }

    public void setProduser(String produser) {
        this.produser = produser;
    }

    public String getDirektur() {
        return direktur;
    }

    public void setDirektur(String direktur) {
        this.direktur = direktur;
    }

    public short getSensor() {
        return sensor;
    }

    public void setSensor(short sensor) {
        this.sensor = sensor;
    }

    public String getBahasa() {
        return bahasa;
    }

    public void setBahasa(String bahasa) {
        this.bahasa = bahasa;
    }

    public String getJudulTambahan() {
        return judulTambahan;
    }

    public void setJudulTambahan(String judulTambahan) {
        this.judulTambahan = judulTambahan;
    }

    public LocalTime getDurasi() {
        return durasi;
    }

    public void setDurasi(LocalTime durasi) {
        this.durasi = durasi;
    }

    public ArrayList<String> getGenre() {
        return genre;
    }

    public void setGenre(ArrayList<String> genre) {
        this.genre = genre;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    @Override
    public String toString() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        String strDate = formatter.format(this.durasi);

        return "Film{" +
                "id='" + id + '\'' +
                ", judul='" + judul + '\'' +
                ", produser='" + produser + '\'' +
                ", direktur='" + direktur + '\'' +
                ", sensor=" + sensor +
                ", bahasa='" + bahasa + '\'' +
                ", judulTambahan='" + judulTambahan + '\'' +
                ", durasi=" + strDate +
                ", genre=" + genre +
                ", deskripsi='" + deskripsi + '\'' +
                '}';
    }
}
