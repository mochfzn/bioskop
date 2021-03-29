package com.nexsoft.bioskop.repository;

import com.nexsoft.bioskop.model.Pengguna;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("PenggunaRepository")
public class PenggunaRepositoryImpl implements PenggunaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Pengguna> findAll() {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna ORDER BY hak_akses, nama",
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findAll(int limit, int offset) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna ORDER BY hak_akses, nama LIMIT ? OFFSET ?",
                    preparedStatement -> {
                        preparedStatement.setInt(1, limit);
                        preparedStatement.setInt(2, offset);
                    },
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByName(String name) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE nama LIKE ? ORDER BY hak_akses",
                    preparedStatement -> preparedStatement.setString(1, "%" + name + "%"),
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByName(String name, int limit, int offset) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE nama LIKE ? ORDER BY hak_akses LIMIT ? OFFSET ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + name + "%");
                        preparedStatement.setInt(2, limit);
                        preparedStatement.setInt(3, offset);
                    },
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByTelephone(String telephone) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE telepon LIKE ? ORDER BY hak_akses",
                    preparedStatement -> preparedStatement.setString(1, "%" + telephone + "%"),
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByTelephone(String telephone, int limit, int offset) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE telepon LIKE ? ORDER BY hak_akses LIMIT ? OFFSET ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + telephone + "%");
                        preparedStatement.setInt(2, limit);
                        preparedStatement.setInt(3, offset);
                    },
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByUsername(String username) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE username LIKE ? ORDER BY hak_akses",
                    preparedStatement -> preparedStatement.setString(1, "%" + username + "%"),
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public List<Pengguna> findByUsername(String username, int limit, int offset) {
        List<Pengguna> penggunaList;

        try {
            penggunaList = this.jdbcTemplate.query("SELECT * FROM pengguna WHERE username LIKE ? ORDER BY hak_akses LIMIT ? OFFSET ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + username + "%");
                        preparedStatement.setInt(2, limit);
                        preparedStatement.setInt(3, offset);
                    },
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
            );
        } catch (IndexOutOfBoundsException e) {
            penggunaList = null;
        }

        return penggunaList;
    }

    @Override
    public Pengguna findByIdSpecific(String id) {
        Pengguna pengguna;

        try {
            pengguna = this.jdbcTemplate.query(
                    "SELECT * FROM pengguna WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, id),
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
        } catch (IndexOutOfBoundsException e) {
            pengguna = null;
        }
        return pengguna;
    }


    @Override
    public Pengguna findByUsernameSpecific(String username) {
        Pengguna pengguna;

        try {
            pengguna = jdbcTemplate.query(
                    "SELECT * FROM pengguna WHERE username = ?",
                    preparedStatement -> preparedStatement.setString(1, username),
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
        } catch (IndexOutOfBoundsException e) {
            pengguna = null;
        }

        return pengguna;
    }

    @Override
    public Pengguna login(String username) {
        Pengguna pengguna;

        try {
            pengguna = jdbcTemplate.query(
                    "SELECT * FROM pengguna WHERE username = ?",
                    preparedStatement -> preparedStatement.setString(1, username),
                    (rs, rowNum) ->
                            new Pengguna(
                                    rs.getString("id"),
                                    rs.getString("nama"),
                                    rs.getString("telepon"),
                                    rs.getString("email"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getShort("hak_akses"),
                                    rs.getString("alamat")
                            )
            ).get(0);
        } catch (IndexOutOfBoundsException e) {
            pengguna = null;
        }

        return pengguna;
    }

    @Override
    public int insert(Pengguna pengguna) {
        return jdbcTemplate.update(
                "INSERT INTO pengguna(id, nama, telepon, email, username, hak_akses, alamat) values(?, ?, ?, ?, ?, ?, ?)",
                pengguna.getId(), pengguna.getNama(), pengguna.getTelepon(), pengguna.getEmail(), pengguna.getUsername(), pengguna.getHakAkses(), pengguna.getAlamat()
        );
    }

    @Override
    public int update(Pengguna pengguna) {
        return jdbcTemplate.update(
                "UPDATE pengguna SET nama = ?, telepon = ?, email = ?, username = ?, alamat = ? WHERE id = ?;",
                pengguna.getNama(), pengguna.getTelepon(), pengguna.getEmail(), pengguna.getUsername(), pengguna.getAlamat(), pengguna.getId()
        );
    }

    @Override
    public int delete(String id) {
        return jdbcTemplate.update(
                "DELETE FROM pengguna WHERE id = ?", id
        );
    }

    @Override
    public int insertPassword(Pengguna pengguna) {
        return jdbcTemplate.update(
                "UPDATE pengguna SET password = ? WHERE username = ? AND telepon = ? AND email = ?",
                pengguna.getPassword(), pengguna.getUsername(), pengguna.getTelepon(), pengguna.getEmail()
        );
    }

    @Override
    public String getPassword(Pengguna pengguna) {
        try {
            String password = jdbcTemplate.query(
                    "SELECT password FROM pengguna WHERE id = ?",
                    preparedStatement -> preparedStatement.setString(1, pengguna.getId()),
                    (rs, rowNum) ->
                            rs.getString("password")
            ).get(0);

            return password;
        } catch (IndexOutOfBoundsException e) {
             return null;
        }
    }
}
