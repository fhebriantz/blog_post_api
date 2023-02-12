'use strict'
const Database = use('Database')
const { validate } = use('Validator')
const Hash = use('Hash')
const Helpers = use('Helpers')

class DashboardController {
    async dataKuadrat ({ request, response }) {
        const params = request.all()
        
        const validation = await validate(params, {
            number: 'required',
            huruf: 'required'
        })

        if (validation.fails()) {
            response.status(400)
            return validation.messages()
        }

        const hasilKuadrat = params.number * params.number
    
        return {
            nama : params.huruf,
            hasil : hasilKuadrat
        }
    }

    async dataKelas ({ request, response }) {
        // const query = await Database.raw(`select * from kelas`) --> cara query database
        // console.log(query) --> untuk mengecek
        // return query.rows  --> cara munculin hasil query
        const dataKelas = [
            {
                nama : 'budi',
                kelas : '1B'
            },
            {
                nama : 'ruslan',
                kelas : '1C'
            },
            {
                nama : 'andi',
                kelas : '1D'
            }
        ]
        return dataKelas
    }

     async insertSiswa ({ request, response }) {
        const { nama, email, password, kelas, umur } = request.all();

        const rules = {
            nama: "required",
            email: "required|email|unique:public.siswas,email", //1 req or not req, 2 tipe, 3 aturan uniq (schema.table,kolom)
            password: "required",
            kelas: "required",
            umur: "required|number",
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            response.status(400);
            return validation.messages();
        }

        // const profilePic = request.file('profile_pic', {
        //     types: ['image'],
        //     size: '2mb'
        // })
        
        // await profilePic.move(Helpers.tmpPath('uploads'), {
        //     name: 'custom-name.jpg',
        //     overwrite: true
        // })
    
        // if (!profilePic.moved()) {
        //     return profilePic.error()
        // }

        const emailLower = email.toLowerCase()
        // contoh query insert

        const safePassword = await Hash.make(password)

        await Database.raw(`
        INSERT INTO public.siswas
            (nama, email, "password", kelas, umur)
            VALUES('${nama}', '${emailLower}', '${safePassword}', '${kelas}', ${umur});            
        `) 

        const data = await Database.raw(`select * from public.siswas`)
        
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil diimput',
            data : data.rows
        }
        
    }

    async importSiswa({ request, response }) {
        const filecsv = request.file('file_csv', {
          extnames: ['csv']
        })
    
        if (filecsv) {
          const csvFilePath = filecsv.tmpPath
          const csv = require('csvtojson')
          let array_siswa = new Array //nampung values
          
          const arr = await csv({
            delimiter: ","
          }).fromFile(csvFilePath)
    
          for (let i = 0; i < arr.length; i++) { //looping isi values
            const safePassword = await Hash.make(arr[i].password)
            array_siswa.push(`('${arr[i].nama}','${arr[i].email}','${safePassword}','${arr[i].kelas}','${arr[i].umur}')`);
          }
          await Database.raw(`INSERT INTO public.siswas
          (nama, email, "password", kelas, umur)
            VALUES ${array_siswa.toString()}`) //store values
    
        const data = await Database.raw(`select * from public.siswas`)
    
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil diimput',
            data : data.rows
        }
    
        } else {
          response.status(400)
          return {
            message: 'Please insert csv file!'
          }
        }
      }

    async updateSiswa ({ request, response }) {
        const params = request.all()
        const { dataUser } = request
        //atribut apa aja yg wajib
        const validation = await validate(params, {
            nama: 'required',
            email: 'required',
            password: 'required',
            kelas: 'required',
            umur: 'required|number',
            id: 'required|number'
        })

        //logic validasi
        if (validation.fails()) {
            response.status(400)
            return validation.messages()
        }

        // contoh query insert
        await Database.raw(`
            UPDATE public.siswas
            SET nama='${params.nama}', email='${params.email}', "password"='${params.password}', kelas='${params.kelas}', umur=${params.umur}, updated_by='${dataUser.nama}'
            WHERE id=${params.id};
        ;            
        `) 

        const data = await Database.raw(`select * from public.siswas`)
        
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil diubah',
            data : data.rows
        }
        
    }

    async deleteSiswa ({ request, response }) {
        const params = request.all()
        
        //atribut apa aja yg wajib
        const validation = await validate(params, {
            id: 'required|number'
        })

        //logic validasi
        if (validation.fails()) {
            response.status(400)
            return validation.messages()
        }

        // contoh query insert
        await Database.raw(`
            DELETE FROM public.siswas
            WHERE id=${params.id}
        ;            
        `) 

        const data = await Database.raw(`select * from public.siswas`)
        
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil didelete',
            data : data.rows
        }
        
    }

    async showSiswa ({  }) {
        const data = await Database.raw(`select * from public.siswas`)
        
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil diperoleh',
            data : data.rows
        }
        
    }
}

module.exports = DashboardController
