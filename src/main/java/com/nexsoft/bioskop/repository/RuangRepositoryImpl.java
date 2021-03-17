package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Ruang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("RuangRepository")
public class RuangRepositoryImpl implements RuangRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Ruang> findAll() {
        List<Ruang> ruangList;

        try {
            ruangList = this.jdbcTemplate.query("SELECT * FROM ruang ORDER BY nama",
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            );
        } catch (IndexOutOfBoundsException e) {
            ruangList = null;
        }

        return ruangList;
    }

    @Override
    public List<Ruang> findByName(String name) {
        List<Ruang> ruangList;

        try {
            ruangList = this.jdbcTemplate.query("SELECT * FROM ruang WHERE nama LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + name + "%"),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            );
        } catch (IndexOutOfBoundsException e) {
            ruangList = null;
        }

        return ruangList;
    }

    @Override
    public List<Ruang> findByPrice(int price) {
        List<Ruang> ruangList;

        try {
            ruangList = this.jdbcTemplate.query("SELECT * FROM ruang WHERE harga LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + price + "%"),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            );
        } catch (IndexOutOfBoundsException e) {
            ruangList = null;
        }

        return ruangList;
    }

    @Override
    public List<Ruang> findByType(int type) {
        List<Ruang> ruangList;

        try {
            ruangList = this.jdbcTemplate.query("SELECT * FROM ruang WHERE jenis LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + type + "%"),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            );
        } catch (IndexOutOfBoundsException e) {
            ruangList = null;
        }

        return ruangList;
    }

    @Override
    public List<Ruang> findById(String id) {
        List<Ruang> ruangList;

        try {
            ruangList = this.jdbcTemplate.query("SELECT * FROM ruang WHERE id LIKE ?",
                    preparedStatement -> preparedStatement.setString(1, "%" + id + "%"),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            );
        } catch (IndexOutOfBoundsException e) {
            ruangList = null;
        }

        return ruangList;
    }

    @Override
    public Ruang findByIdSpecific(String id) {
        Ruang ruang;

        try {
            ruang = this.jdbcTemplate.query("SELECT * FROM ruang WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, id),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            ).get(0);
        } catch (IndexOutOfBoundsException e) {
            ruang = null;
        }

        return ruang;
    }

    @Override
    public Ruang findByNameSpecific(String nama) {
        Ruang ruang;

        try {
            ruang = this.jdbcTemplate.query("SELECT * FROM ruang WHERE nama = ?",
                    preparedStatement -> preparedStatement.setString(1, nama),
                    (rs, rowNum) ->
                            new Ruang(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getInt("jenis"),
                                    rs.getInt("harga")
                            )
            ).get(0);
        } catch (IndexOutOfBoundsException e) {
            ruang = null;
        }

        return ruang;
    }

    @Override
    public int insert(Ruang ruang) {
        return jdbcTemplate.update(
                "INSERT INTO ruang(id, nama, jenis, harga) values(?, ?, ?, ?)",
                ruang.getId(), ruang.getNama(), ruang.getJenis(), ruang.getHarga()
        );
    }

    @Override
    public int update(Ruang ruang) {
        return jdbcTemplate.update(
                "UPDATE ruang SET nama = ?, jenis = ?, harga = ? WHERE id = ?",
                ruang.getNama(), ruang.getJenis(), ruang.getHarga(), ruang.getId()
        );
    }

    @Override
    public int delete(String id) {
        return jdbcTemplate.update(
                "DELETE FROM ruang WHERE id = ?",
                id
        );
    }
}
