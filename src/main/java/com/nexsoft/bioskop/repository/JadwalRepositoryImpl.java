package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Film;
import com.nexsoft.bioskop.model.Jadwal;
import com.nexsoft.bioskop.model.Ruang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository("JadwalRepository")
public class JadwalRepositoryImpl implements JadwalRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Jadwal> findAll() {
        List<Jadwal> jadwalList;

        try {
            jadwalList = this.jdbcTemplate.query("SELECT * FROM jadwal",
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: jadwalList)
            {
                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                        ).get(0);
                data.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }
        } catch (IndexOutOfBoundsException e) {
            jadwalList = null;
        }

        return jadwalList;
    }

    @Override
    public List<Jadwal> findByTanggal(LocalDate tanggal) {
        List<Jadwal> jadwalList;

        try {
            jadwalList = this.jdbcTemplate.query("SELECT * FROM jadwal WHERE tanggal = ?",
                    preparedStatement -> preparedStatement.setString(1, tanggal.toString()),
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: jadwalList)
            {
                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                data.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }
        } catch (IndexOutOfBoundsException e) {
            jadwalList = null;
        }

        return jadwalList;
    }

    @Override
    public List<Jadwal> findByRuang(String ruang) {
        List<Jadwal> jadwalList;

        try {
            jadwalList = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.id_ruang, j.id_film, j.jam FROM jadwal j, ruang r WHERE j.id_ruang = r.id AND r.nama LIKE ?;",
                    preparedStatement -> preparedStatement.setString(1, "%" + ruang + "%"),
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: jadwalList)
            {
                Ruang ruangObject = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                data.setRuang(ruangObject);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }
        } catch (IndexOutOfBoundsException e) {
            jadwalList = null;
        }

        return jadwalList;
    }

    @Override
    public List<Jadwal> findByFilm(String judul) {
        List<Jadwal> jadwalList;

        try {
            jadwalList = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.id_ruang, j.id_film, j.jam FROM jadwal j, film f WHERE j.id_film = f.id AND f.judul LIKE ?;",
                    preparedStatement -> preparedStatement.setString(1, "%" + judul + "%"),
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: jadwalList)
            {
                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                data.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }
        } catch (IndexOutOfBoundsException e) {
            jadwalList = null;
        }

        return jadwalList;
    }

    @Override
    public List<Jadwal> findByFilmForCustomer(String idFilm) {
        List<Jadwal> jadwalList;

        try {
            jadwalList = this.jdbcTemplate.query("SELECT j.id, j.tanggal, j.id_ruang, j.id_film, j.jam FROM jadwal j, film f WHERE j.id_film = f.id AND f.id = ? AND j.tanggal >= ?;",
                    preparedStatement -> {
                        preparedStatement.setString(1, idFilm);
                        preparedStatement.setString(2, LocalDate.now().toString());
                    },
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: jadwalList)
            {
                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                data.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }
        } catch (IndexOutOfBoundsException e) {
            jadwalList = null;
        }

        return jadwalList;
    }

    @Override
    public Jadwal findByIdSpecific(String id) {
        try {
            Jadwal jadwal;
            jadwal = this.jdbcTemplate.query("SELECT * FROM jadwal WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, id),
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

            return jadwal;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    @Override
    public Jadwal findByDateTimeAndRoom(Jadwal jadwal) {
        try {
            Jadwal objectFound;
            objectFound = this.jdbcTemplate.query("SELECT * FROM jadwal WHERE tanggal = ? AND jam = ? AND id_ruang = ?;",
                    preparedStatement -> {
                        preparedStatement.setString(1, jadwal.getTanggal().toString());
                        preparedStatement.setString(2, jadwal.getJam().toString());
                        preparedStatement.setString(3, jadwal.getRuang().getId());
                    },
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            ).get(0);

            Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                    preparedStatement -> preparedStatement.setString(1, objectFound.getId()),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            ).get(0);
            objectFound.setRuang(ruang);

            Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                    preparedStatement -> preparedStatement.setString(1, objectFound.getId()),
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
            objectFound.setFilm(film);

            return objectFound;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    @Override
    public List<Jadwal> findByDateTimeAndFilm(Jadwal jadwal) {
        try {
            List<Jadwal> objectFound;
            objectFound = this.jdbcTemplate.query("SELECT * FROM jadwal WHERE tanggal = ? AND jam = ? AND id_film = ?;",
                    preparedStatement -> {
                        preparedStatement.setString(1, jadwal.getTanggal().toString());
                        preparedStatement.setString(2, jadwal.getJam().toString());
                        preparedStatement.setString(3, jadwal.getFilm().getId());
                    },
                    (rs, rowNum) ->
                            new Jadwal(
                                    rs.getString("id"),
                                    rs.getString("tanggal"),
                                    rs.getString("jam")
                            )
            );

            for(Jadwal data: objectFound)
            {
                Ruang ruang = this.jdbcTemplate.query("SELECT r.id, r.nama, r.jenis, r.harga FROM ruang r, jadwal j WHERE r.id = j.id_ruang AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
                        (rs, rowNum) ->
                                new Ruang(
                                        rs.getString("id"),
                                        rs.getString("nama"),
                                        rs.getInt("jenis"),
                                        rs.getInt("harga")
                                )
                ).get(0);
                data.setRuang(ruang);

                Film film = this.jdbcTemplate.query("SELECT f.id, f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM film f, jadwal j WHERE f.id = j.id_film AND j.id = ?",
                        preparedStatement -> preparedStatement.setString(1, data.getId()),
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
                data.setFilm(film);
            }

            return objectFound;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    @Override
    public int insert(Jadwal jadwal) {
        return jdbcTemplate.update(
                "INSERT INTO jadwal(id, tanggal, jam, id_ruang, id_film) values(?, ?, ?, ?, ?)",
                jadwal.getId(), jadwal.getTanggal(), jadwal.getJam(), jadwal.getRuang().getId(), jadwal.getFilm().getId()
        );
    }

    @Override
    public int update(Jadwal jadwal) {
        return 0;
    }

    @Override
    public int delete(String id) {
        return 0;
    }
}
