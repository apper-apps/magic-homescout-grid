import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import propertyService from '../services/api/propertyService'
import favoriteService from '../services/api/favoriteService'

const Home = ({ darkMode, setDarkMode }) => {
  const [properties, setProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: [],
    bedrooms: '',
    bathrooms: ''
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [propertiesResult, favoritesResult] = await Promise.all([
          propertyService.getAll(),
          favoriteService.getAll()
        ])
        setProperties(propertiesResult)
        setFavorites(favoritesResult)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load properties')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const toggleFavorite = async (propertyId) => {
    try {
      const existingFavorite = favorites.find(fav => fav.propertyId === propertyId)
      
      if (existingFavorite) {
        await favoriteService.delete(existingFavorite.id)
        setFavorites(prev => prev.filter(fav => fav.id !== existingFavorite.id))
        toast.success('Property removed from favorites')
      } else {
        const newFavorite = await favoriteService.create({
          propertyId,
          savedDate: new Date().toISOString(),
          notes: ''
        })
        setFavorites(prev => [...prev, newFavorite])
        toast.success('Property added to favorites')
      }
    } catch (err) {
      toast.error('Failed to update favorites')
    }
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPrice = (!filters.priceMin || property.price >= parseInt(filters.priceMin)) &&
                        (!filters.priceMax || property.price <= parseInt(filters.priceMax))
    
    const matchesType = filters.propertyType.length === 0 || filters.propertyType.includes(property.type)
    
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms)
    
    const matchesBathrooms = !filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms)
    
    return matchesSearch && matchesPrice && matchesType && matchesBedrooms && matchesBathrooms
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={64} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">Something went wrong</h2>
          <p className="text-surface-600 dark:text-surface-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <ApperIcon name="Home" size={32} className="text-primary mr-3" />
                <h1 className="font-heading text-2xl font-bold text-surface-800 dark:text-surface-200">
                  HomeScout
                </h1>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-surface-100 dark:bg-surface-700 rounded-lg p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-surface-600 dark:text-surface-400'}`}
                >
                  <ApperIcon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-surface-600 dark:text-surface-400'}`}
                >
                  <ApperIcon name="List" size={16} />
                </button>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainFeature
          properties={filteredProperties}
          favorites={favorites}
          viewMode={viewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  )
}

export default Home