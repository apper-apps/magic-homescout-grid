import favoriteData from '../mockData/favorite.json'

let favorites = [...favoriteData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const favoriteService = {
  async getAll() {
    await delay(200)
    return [...favorites]
  },

  async getById(id) {
    await delay(150)
    const favorite = favorites.find(f => f.id === id)
    if (!favorite) {
      throw new Error('Favorite not found')
    }
    return { ...favorite }
  },

  async create(favoriteData) {
    await delay(300)
    const newFavorite = {
      ...favoriteData,
      id: Date.now().toString(),
      savedDate: new Date().toISOString()
    }
    favorites.push(newFavorite)
    return { ...newFavorite }
  },

  async update(id, favoriteData) {
    await delay(250)
    const index = favorites.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Favorite not found')
    }
    favorites[index] = { ...favorites[index], ...favoriteData }
    return { ...favorites[index] }
  },

  async delete(id) {
    await delay(200)
    const index = favorites.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Favorite not found')
    }
    const deletedFavorite = favorites.splice(index, 1)[0]
    return { ...deletedFavorite }
  }
}

export default favoriteService