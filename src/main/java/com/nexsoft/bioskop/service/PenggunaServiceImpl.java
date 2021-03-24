package com.nexsoft.bioskop.service;

import com.nexsoft.bioskop.model.Pengguna;
import com.nexsoft.bioskop.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service("PenggunaService")
public class PenggunaServiceImpl implements PenggunaService {
    @Autowired
    PenggunaRepository penggunaRepository;

    @Override
    public Pengguna checkUsername(String username) {
        return penggunaRepository.findByUsernameSpecific(username);
    }

    @Override
    public boolean checkPassword(Pengguna pengguna) {
        String password = penggunaRepository.getPassword(pengguna);

        if(password == null)
        {
            return false;
        }
        else if(password.equals("Apra95PP"))
        {
            return false;
        }
        else if(!password.equals("Apra95PP"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    @Override
    public boolean login(Pengguna pengguna) {
        Pengguna getUser = penggunaRepository.login(pengguna.getUsername());

        if(getUser.getPassword().equals(pengguna.getPassword()))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    @Override
    public Pengguna registration(Pengguna pengguna) {
        UUID id = UUID.randomUUID();
        pengguna.setId(id.toString());

        synchronized (this)
        {
            penggunaRepository.insert(pengguna);
        }

        return pengguna;
    }

    @Override
    public Pengguna savePassword(Pengguna pengguna) {
        penggunaRepository.insertPassword(pengguna);
        return null;
    }

    @Override
    public Pengguna update(Pengguna pengguna) {
        Pengguna objectFound = penggunaRepository.findByIdSpecific(pengguna.getId());

        if(objectFound != null)
        {
            synchronized (this)
            {
                penggunaRepository.update(pengguna);
                return objectFound;
            }
        }

        return null;
    }

    @Override
    public Pengguna findById(String id) {
        return penggunaRepository.findByIdSpecific(id);
    }

    @Override
    public List<Pengguna> findAll() {
        return penggunaRepository.findAll();
    }

    @Override
    public List<Pengguna> findAll(int limit, int offset) {
        return penggunaRepository.findAll(limit, offset);
    }

    @Override
    public List<Pengguna> searchByName(String name) {
        return penggunaRepository.findByName(name);
    }

    @Override
    public List<Pengguna> searchByName(String name, int limit, int offset) {
        return penggunaRepository.findByName(name, limit, offset);
    }

    @Override
    public List<Pengguna> searchByTelephone(String telephone) {
        return penggunaRepository.findByTelephone(telephone);
    }

    @Override
    public List<Pengguna> searchByTelephone(String telephone, int limit, int offset) {
        return penggunaRepository.findByTelephone(telephone, limit, offset);
    }

    @Override
    public List<Pengguna> searchByUsername(String username) {
        return penggunaRepository.findByUsername(username);
    }

    @Override
    public List<Pengguna> searchByUsername(String username, int limit, int offset) {
        return penggunaRepository.findByUsername(username, limit, offset);
    }

    @Override
    public String validation(Pengguna pengguna) {
        if((pengguna.getNama() == null) || (pengguna.getNama() == ""))
        {
            return "Nama lengkap tidak boleh kosong!";
        }

        if((pengguna.getTelepon() == null) || (pengguna.getTelepon() == ""))
        {
            return "Telepon tidak boleh kosong!";
        }

        if((pengguna.getUsername() == null) || (pengguna.getUsername() == ""))
        {
            return "Nama pengguna tidak boleh kosong!";
        }

        if((pengguna.getAlamat() == null) || (pengguna.getAlamat() == ""))
        {
            return "Alamat tidak boleh kosong!";
        }

        if(pengguna.getNama().length() > 50)
        {
            return "Nama lengkap tidak boleh lebih dari 50 karakter!";
        }

        if(pengguna.getTelepon().length() > 14)
        {
            return "Telepon tidak boleh lebih dari 14 nomor!";
        }

        if(pengguna.getUsername().length() > 50)
        {
            return "\"Nama pengguna tidak boleh lebih dari 50 karakter!";
        }

        if((pengguna.getEmail() != null) || (pengguna.getEmail() != ""))
        {
            if(pengguna.getEmail().length() > 50)
            {
                return "Email tidak boleh lebih dari 50 karakter!";
            }
        }

        Pattern p_uname = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$");
        Matcher m_uname = p_uname.matcher(pengguna.getUsername());
        Pattern p_email = Pattern.compile("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        Matcher m_email = p_email.matcher(pengguna.getEmail());
        Pattern p_phone = Pattern.compile("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$");
        Matcher m_phone = p_phone.matcher(pengguna.getTelepon());

        if(!m_uname.matches())
        {
            return "Nama pengguna minimal 6 karakter. Terdiri dari satu huruf besar, satu huruf kecil, dan satu angka.";
        }

        if((pengguna.getEmail() != null) || (pengguna.getEmail() != ""))
        {
            if(!m_email.matches())
            {
                return "Format email salah. Contoh: (xxx.xxx@xx.xxx)";
            }
        }

        if(!m_phone.matches())
        {
            return "Format telepon salah. Contoh (08xxxxxxxxxxx).";
        }

        return null;
    }

    @Override
    public String validationPassword(String password) {
        Pattern p_pass = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$");
        Matcher m_pass = p_pass.matcher(password);

        if(password == null)
        {
            return "Kata sandi tidak boleh kosong.";
        }

        if(!m_pass.matches())
        {
            return "Kata sandi antara 6-8 karakter yang terdiri dari huruf besar, huruf kecil, dan angka.";
        }

        return null;
    }
}
