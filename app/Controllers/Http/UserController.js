"use strict";
const Database = use("Database");
const { validate } = use('Validator')
// const Encryption = use('Encryption')
const Encryption = use('Encryption')
const Hash = use('Hash')


class UserController {
  async login({ request, response }) {
    // try {
    const { email, password} = request.all();
    const rules = {
        email: "required", //1 req or not req, 2 tipe, 3 aturan uniq (schema.table,kolom)
        password: "required",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
        response.status(400);
        return validation.messages();
    }
      // ecryption
      // return Encryption.encrypt('hello world')
      // return Encryption.decrypt('5f929576cbba3c1b98f515a456859042OKM3G/dy+1R/ZnujftILjA==')

      // hash
      // const safePassword = await Hash.make('hello world')
      // const isSame = await Hash.verify('hello world', '$2a$10$ndBsHioX5csH3At7LaCWvuQVjAEPJO9dKx1quADYvzZ5mzflIFrOq')

      // const isSame = await Hash.verify('plain-value', 'hashed-value')

      // if (isSame) {
      //   // ...
      // }

      const emailLower = email.toLowerCase()
      const checkuser = await Database.raw(`select * from public.siswas where email = '${emailLower}'`)
      
      if (!checkuser.rows.length > 0) {
        response.status(401)
        return {
          message: 'Email Tidak Tersedia'
        }
      }

      const isSame = await Hash.verify(password, checkuser.rows[0].password)

      if (isSame) {
        let dataUser = checkuser.rows[0]
        let user = {
          id_siswa: dataUser.id,
          nama: dataUser.nama,
          email: dataUser.email,
          kelas: dataUser.kelas,
          umur: dataUser.umur
        }
        
        return {
          message: 'Berhasil Login',
          data : user
        }
      }else{
        response.status(401)
        return {
          message: 'Alamat email dan password tidak sesuai'
        }
      }
    // } catch (error) {
    //   if(error.name === 'PasswordMisMatchException'){
    //     response.status(401)
    //     return {
    //       field : 'password',
    //       message: 'Alamat email dan password tidak sesuai'
    //     }
    //   }else{
    //     response.status(500).json(error)
    //   }
    // }
    
  }
}

module.exports = UserController