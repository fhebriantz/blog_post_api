"use strict";
const Database = use("Database");
const { validate } = use('Validator')
const Encryption = use('Encryption')


class UserController {
  async login({ request, response }) {
    try {
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

      const emailLower = email.toLowerCase()
      const checkuser = await Database.raw(`select * from public.siswas where email = '${emailLower}' and password = '${password}'`)

      if (!checkuser.rows.length > 0) {
        response.status(401)
        return {
          message: 'Alamat email dan password tidak sesuai'
        }
      }

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
    } catch (error) {
      if(error.name === 'PasswordMisMatchException'){
        response.status(401)
        return [{
          field : 'password',
          message: 'Alamat email dan password tidak sesuai'
        }]
      }else{
        response.status(500).json(error)
      }
    }
    
  }
}

module.exports = UserController