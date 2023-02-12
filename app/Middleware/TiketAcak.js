'use strict'

const Env = use('Env')
const jwt = require('jsonwebtoken')

class TiketAcak {
  async handle({ request }, next) {
    try {
      if(!request.header('Authorization')){
        throw {status : 401, message : 'Authorization Bearer Token Required!/Must be logged in!'}
      }
      let token = request.header('Authorization').split(" ")[1]
      const decoded = jwt.verify(token, Env.get('APP_KEY'))
      request.dataUser = decoded // proses untuk memasukkan object baru di dataUser dari decoded jwt
      console.log('dataUser :',decoded)
      await next()
    } catch (error) {
      if(error.name === 'JsonWebTokenError'){
        throw {status : 401, message : 'Authorization Bearer Token Required!/Must be logged in!'}
      }
      if(error.name === 'TokenExpiredError'){
        throw {status : 401, message : 'Token Expired'}
      }
      console.error('middleware orgs :', error);
      throw error
    }
  }
}

module.exports = TiketAcak
