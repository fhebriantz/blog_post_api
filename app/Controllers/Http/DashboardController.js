'use strict'
const Database = use('Database')

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

     async insertSiswa ({ request, response }) {
        const params = request.all()
        
        //atribut apa aja yg wajib
        const validation = await validate(params, {
            nama: 'required',
            email: 'required',
            password: 'required',
            kelas: 'required',
            umur: 'required|number'
        })

        //logic validasi
        if (validation.fails()) {
            response.status(400)
            return validation.messages()
        }

        // contoh query insert
        await Database.raw(`
        INSERT INTO public.siswas
            (nama, email, "password", kelas, umur)
            VALUES('${params.nama}', '${params.email}', '${params.password}', '${params.kelas}', ${params.umur});            
        `) 

        const data = await Database.raw(`select * from public.siswas`)
        
        //ngasih pesan berhasil
        return {
            messages : 'data berhasil diimput',
            data : data.rows
        }
        
    }

    async updateSiswa ({ request, response }) {
        const params = request.all()
        
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
            SET nama='${params.nama}', email='${params.email}', "password"='${params.password}', kelas='${params.kelas}', umur=${params.umur}
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
