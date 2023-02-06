'use strict'

class TiketAcak {
  async handle ({ request }, next) {
    const tiket = Math.random()
    request.tiket = tiket
    await next()
  }
}

module.exports = TiketAcak