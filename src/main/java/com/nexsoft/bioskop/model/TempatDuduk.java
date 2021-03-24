package com.nexsoft.bioskop.model;

public class TempatDuduk {
    private String id;
    private String posisi;

    public TempatDuduk() {
    }

    public TempatDuduk(String id, String posisi) {
        this.id = id;
        this.posisi = posisi;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPosisi() {
        return posisi;
    }

    public void setPosisi(String posisi) {
        this.posisi = posisi;
    }
}
