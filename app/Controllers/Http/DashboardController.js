'use strict'
const { validate } = use('Validator')

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

     async insertKelas ({ request, response }) {
        const params = request.all()
        
        //atribut apa aja yg wajib
        const validation = await validate(params, {
            nama: 'required',
            kelas: 'required'
        })

        try {
            //logic validasi
            if (validation.fails()) {
                response.status(400)
                return validation.messages()
            }

            // contoh query insert
            const query = await Database.raw(`
                INSERT INTO Kelas(nama, kelas)
                VALUES (${nama}, ${kelas});
            `) 
            
            //ngasih pesan berhasil
            return {
                messages : 'data berhasil diimput'
            }
        } catch (error) {
            response.status(403) //untuk keperluan handle developer
            return {
                messages : 'data gagal diimput'
            }
        }
        
    }
}

module.exports = DashboardController
