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
  })

