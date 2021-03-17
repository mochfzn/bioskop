package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository("FilmRepository")
public class FilmRepositoryImpl implements FilmRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Film> findAll() {
        List<Film> filmList;

        try {
            filmList = this.jdbcTemplate.query("SELECT * FROM film",
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
            );
        } catch (IndexOutOfBoundsException e) {
            filmList = null;
        }

        return filmList;
    }

    @Override
    public List<Film> findByTitle(String title) {
        List<Film> filmList;

        try {
            filmList = this.jdbcTemplate.query("SELECT * FROM film WHERE judul LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + title + "%"),
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
            );
        } catch (IndexOutOfBoundsException e) {
            filmList = null;
        }

        return filmList;
    }

    @Override
    public List<Film> findById(String id) {
        List<Film> filmList;

        try {
            filmList = this.jdbcTemplate.query("SELECT * FROM film WHERE id LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + id + "%"),
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
            );
        } catch (IndexOutOfBoundsException e) {
            filmList = null;
        }

        return filmList;
    }

    @Override
    public List<Film> getFilmIsPlaying() {
        List<Film> filmList;

        try {
            filmList = this.jdbcTemplate.query("SELECT DISTINCT(f.id), f.judul, f.produser, f.direktur, f.sensor, f.bahasa, f.judul_tambahan, f.durasi, f.genre, f.deskripsi FROM jadwal j, film f WHERE j.id_film = f.id AND j.tanggal > ?;",
                    preparedStatement -> preparedStatement.setString(1, LocalDate.now().toString()),
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
            );
        } catch (IndexOutOfBoundsException e) {
            filmList = null;
        }

        return filmList;
    }

    @Override
    public Film findByIdSpecific(String id) {
        Film film;

        try {
            film = this.jdbcTemplate.query("SELECT * FROM film WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, id),
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
        } catch (IndexOutOfBoundsException e) {
            film = null;
        }

        return film;
    }

    @Override
    public Film findByTitleSpecific(String title) {
        Film film;

        try {
            film = this.jdbcTemplate.query("SELECT * FROM film WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, title),
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
        } catch (IndexOutOfBoundsException e) {
            film = null;
        }

        return film;
    }

    @Override
    public int insert(Film film) {
        String genre = "";
        for(String data: film.getGenre())
        {
            if(data.equals(film.getGenre().get(0)))
            {
                genre += data;
            }
            else
            {
                genre += ",";
                genre += data;
            }
        }

        return jdbcTemplate.update(
                "INSERT INTO film(id, judul, produser, direktur, sensor, bahasa, judul_tambahan, durasi, genre, deskripsi) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                film.getId(), film.getJudul(), film.getProduser(), film.getDirektur(), film.getSensor(), film.getBahasa(), film.getJudulTambahan(), film.getDurasi(), genre, film.getDeskripsi()
        );
    }

    @Override
    public int update(Film film) {
        String genre = "";
        for(String data: film.getGenre())
        {
            if(data.equals(film.getGenre().get(0)))
            {
                genre += data;
            }
            else
            {
                genre += ",";
                genre += data;
            }
        }

        return jdbcTemplate.update(
                "UPDATE film SET judul = ?, produser = ?, direktur = ?, sensor = ?, bahasa = ?, judul_tambahan = ?, durasi = ?, genre = ?, deskripsi = ? WHERE id = ?",
                film.getJudul(), film.getProduser(), film.getDirektur(), film.getSensor(), film.getBahasa(), film.getJudulTambahan(), film.getDurasi(), genre, film.getDeskripsi(), film.getId()
        );
    }

    @Override
    public int delete(String id) {
        return jdbcTemplate.update(
                "DELETE FROM film WHERE id = ?",
                id
        );
    }
}
