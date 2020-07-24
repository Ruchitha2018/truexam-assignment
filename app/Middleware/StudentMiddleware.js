'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class StudentMiddleware {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next) {
    // call next to advance the request
    // call next to advance the request
    if(auth.user.role !== 0) {
     return "Authorized Access!!!"
    }
    await next()
  }
}

module.exports = StudentMiddleware
