import propertyData from '../mockData/property.json'

let properties = [...propertyData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const propertyService = {
  async getAll() {
    await delay(300)
    return [...properties]
  },

  async getById(id) {
    await delay(200)
    const property = properties.find(p => p.id === id)
    if (!property) {
      throw new Error('Property not found')
    }
    return { ...property }
  },

  async create(propertyData) {
    await delay(400)
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      listedDate: new Date().toISOString()
    }
    properties.push(newProperty)
    return { ...newProperty }
  },

  async update(id, propertyData) {
    await delay(350)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    properties[index] = { ...properties[index], ...propertyData }
    return { ...properties[index] }
  },

  async delete(id) {
    await delay(250)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    const deletedProperty = properties.splice(index, 1)[0]
    return { ...deletedProperty }
  }
}

export default propertyService