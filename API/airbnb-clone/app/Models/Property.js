'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Database = use('Database')

class Property extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  images() {
    return this.hasMany('App/Models/Image')
  }

  static scopeNearBy(query, latitude, longitude, distance) {
    function degToRad(deg) {
      const pi = Math.PI
      return deg * (pi / 180)
    }

    function calcHaverSine(LA_A, LO_A) {
      const haverside = (6371 * (Math.acos(
        (Math.cos(90 - degToRad(LA_A))
          *
          Math.cos(90 - degToRad(LA_B)))
        +
        (Math.sin(90 - degToRad(LA_A))
          *
          Math.sin(90 - degToRad(LA_B)))
        *
        (Math.cos(degToRad(LO_A) - degToRad(LO_B))))
      ))
      const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

      return query
        .select('*', Database.raw(`${haversine} as distance`))
        .whereRaw(`${haversine} < ${distance}`)
    }
  }

module.exports = Property
