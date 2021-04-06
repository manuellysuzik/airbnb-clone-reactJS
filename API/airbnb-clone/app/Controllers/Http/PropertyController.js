'use strict'

const Property = use('App/Models/Property')
const Image = use('App/Models/Image')

class PropertyController {
  async index() {

    const properties = Property.all()

    return properties
  }
  async show({ params }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }
  async store({ auth, request, response }) {
    const { id } = auth.user

    const { user_id, title, address, price, latitude, longitude, property_id, path } = request.body

    const property = await Property.create({ user_id, title, address, price, latitude, longitude, user_id: id })

    return property
  }

  async destroy({ params, auth, response }) {
    const property = await Property.findOrFail(params.id)

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Não autorizado" })
    }

    await property.delete()
  }
  async update({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])

    property.merge(data)

    await property.save()

    return property
  }

}

module.exports = PropertyController
