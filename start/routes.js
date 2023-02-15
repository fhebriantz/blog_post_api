'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


 

  
  Route.get('/', async ({ request, response }) => {
    return {
      greeting: 'Hello world in JSON',
      no_tiket : request.tiket
    }
  }).middleware([
      'tiketRandom'
    ])

  Route.group(() => {
    Route.post('/data_kuadrat', 'DashboardController.dataKuadrat')
    Route.get('/get_kelas', 'DashboardController.dataKelas')
    Route.get('/geo_area', 'DashboardController.geoArea')
    Route.post('/insert_siswa', 'DashboardController.insertSiswa')
    Route.post('/import_siswa', 'DashboardController.importSiswa')
    Route.post('/update_siswa', 'DashboardController.updateSiswa')
    Route.post('/delete_siswa', 'DashboardController.deleteSiswa')
    Route.get('/show_siswa', 'DashboardController.showSiswa')
    Route.get('/show_siswa_by_find', 'DashboardController.showSiswaByFind')
    Route.get('/show_siswa_by_filter', 'DashboardController.showSiswaByFilter')
  }).middleware([
    'authJwt'
  ])

  Route.group(() => {
    Route.post('/login', 'UserController.login')
  })


