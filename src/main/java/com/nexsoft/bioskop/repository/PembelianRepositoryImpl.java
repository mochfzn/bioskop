package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository("PembelianRepository")
public class PembelianRepositoryImpl implements PembelianRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Pembelian> findAll() {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian",
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                        " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                        ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                        ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                    rs.getString("id"),
                                    rs.getString("posisi")
                                )
                        );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findById(String id) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE id LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + id + "%"),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByCustomer(String name) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian p, pengguna c WHERE p.id_pengguna = c.id AND c.nama LIKE ?;",
                    preparedStatement -> preparedStatement.setString(1, "%" + name + "%"),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByDate(LocalDate date) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE tanggal = ?",
                    preparedStatement -> preparedStatement.setString(1, date.toString()),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByFilm(String judul) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT p.id, p.jumlah_tiket, p.total, p.tanggal FROM pembelian p, jadwal j, film f WHERE p.id_jadwal = j.id AND j.id_film = f.id AND f.judul LIKE ?;",
                    preparedStatement -> preparedStatement.setString(1, "%" + judul + "%"),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByRuangan(String ruangan) {
        return null;
    }

    @Override
    public List<Pembelian> findByJadwal(String idJadwal) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE id_jadwal = ?",
                    preparedStatement -> preparedStatement.setString(1, idJadwal),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            System.out.println(e.getMessage());
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByUser(String idPelanggan) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE id_pengguna = ?",
                    preparedStatement -> preparedStatement.setString(1, idPelanggan),
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            System.out.println(e.getMessage());
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findById(String id, String idCustomer) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE id LIKE ? AND id_pengguna = ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + id + "%");
                        preparedStatement.setString(2, idCustomer);
                    },
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByDate(LocalDate date, String idCustomer) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT * FROM pembelian WHERE tanggal = ? AND id_pengguna = ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, date.toString());
                        preparedStatement.setString(2, idCustomer);
                    },
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public List<Pembelian> findByFilm(String judul, String idCustomer) {
        List<Pembelian> pembelianList;

        try {
            pembelianList = this.jdbcTemplate.query("SELECT p.id, p.jumlah_tiket, p.total, p.tanggal FROM pembelian p, jadwal j, film f WHERE p.id_jadwal = j.id AND j.id_film = f.id AND p.id_pengguna = ? AND f.judul LIKE ?;",
                    preparedStatement -> {
                        preparedStatement.setString(1, idCustomer);
                        preparedStatement.setString(2, "%" + judul + "%");
                    },
                    (rs, rowNum) ->
                            new Pembelian(
                                    rs.getString("id"),
                                    rs.getShort("jumlah_tiket"),
                                    rs.getInt("total"),
                                    rs.getDate("tanggal").toLocalDate()
                            )
            );

            for(Pembelian data : pembelianList)
            {
                Pengguna pengguna = this.jdbcTemplate.query("SELECT p.id, p.nama, p.telepon, p.email, p.username, p.password, p.hak_akses, p.alamat" +
                                " FROM pembelian b, pengguna p WHERE b.id_pengguna = p.id AND b.id = ?;",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Pengguna(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getString("telepon"),
                                        rs.getString("email"),
                                        rs.getString("username"),
                                        rs.getShort("hak_akses"),
                                        rs.getString("alamat")
                                )
                ).get(0);
                data.setPengguna(pengguna);

                Jadwal jadwal = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.jam FROM pembelian p, jadwal j WHERE p.id_jadwal = j.id AND p.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Jadwal(
                                        rs.getString("id"),
                                        rs.getString("tanggal"),
                                        rs.getString("jam")
                                )
                ).get(0);

                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                jadwal.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, jadwal.getId()),
                        (rs, rowNum) ->
                                new Film(
                                        rs.getString("id"),
                                        rs.getString("judul"),
                                        rs.getString("produser"),
                                        rs.getString("direktur"),
                                        rs.getShort("sensor"),
                                        rs.getString("bahasa"),
                                        rs.getString("judul_tambahan"),
                                        rs.getString("durasi"),
                                        rs.getString("genre"),
                                        rs.getString("deskripsi")
                                )
                ).get(0);
                jadwal.setFilm(film);

                data.setJadwal(jadwal);

                List<TempatDuduk> tempatDudukList = this.jdbcTemplate.query("SELECT * FROM tempat_duduk WHERE id_pembelian = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new TempatDuduk(
                                        rs.getString("id"),
                                        rs.getString("posisi")
                                )
                );

                data.setTempatDuduk(tempatDudukList);
            }
        } catch (IndexOutOfBoundsException e) {
            pembelianList = null;
        }

        return pembelianList;
    }

    @Override
    public Pembelian findByIdSpecific(String id) {
        return null;
    }

    @Override
    public int insert(Pembelian pembelian) {
        jdbcTemplate.update(
                "INSERT INTO pembelian(id, jumlah_tiket, total, id_jadwal, id_pengguna) values(?, ?, ?, ?, ?)",
                pembelian.getId(), pembelian.getJumlahTiket(), pembelian.getTotal(), pembelian.getJadwal().getId(), pembelian.getPengguna().getId()
        );

        for(TempatDuduk data : pembelian.getTempatDuduk())
        {
            UUID id = UUID.randomUUID();
            data.setId(id.toString());

            jdbcTemplate.update(
                    "INSERT INTO tempat_duduk(id, posisi, id_pembelian) VALUES(?, ?, ?);",
                    data.getId(), data.getPosisi(), pembelian.getId()
            );
        }

        return 1;
    }

    @Override
    public int update(Pembelian pembelian) {
        return 0;
    }

    @Override
    public int delete(String id) {
        return 0;
    }
}
