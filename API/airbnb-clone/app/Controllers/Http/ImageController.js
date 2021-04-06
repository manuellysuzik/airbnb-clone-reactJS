'use strict'

const Image = use('App/Models/Image')
const Property = use('App/Models/Property')

const Helpers = use('Helpers')

class ImageController {
  async store({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))


    if (!images.moveAll()) {
      return response.json({ error: "não foi possível fazer o upload da imagem" })
    }

    await Promise.all(
      images
        .movedList()
        .map(image => property.images().create({ path: image.fileName }))
    )

  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
