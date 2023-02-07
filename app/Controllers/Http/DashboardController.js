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
        const emailLower = email.toLowerCase()
        // contoh query insert
        await Database.raw(`
        INSERT INTO public.siswas
            (nama, email, "password", kelas, umur)
            VALUES('${nama}', '${emailLower}', '${password}', '${kelas}', ${umur});            
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
