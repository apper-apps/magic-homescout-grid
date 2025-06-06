import React, { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import PropTypes from 'prop-types'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Header from '@/components/organisms/Header'
      import SearchFilterBar from '@/components/organisms/SearchFilterBar'
      import PropertyGrid from '@/components/organisms/PropertyGrid'
      import PropertyDetailModal from '@/components/organisms/PropertyDetailModal'
      import propertyService from '@/services/api/propertyService'
      import favoriteService from '@/services/api/favoriteService'
      
      const HomePage = ({ darkMode, setDarkMode }) => {
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
        const [showFilters, setShowFilters] = useState(false)
        const [selectedProperty, setSelectedProperty] = useState(null)
      
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
                <Icon name="AlertCircle" size={64} className="mx-auto text-red-500 mb-4" />
                <Text as="h2" className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">Something went wrong</Text>
                <Text as="p" className="text-surface-600 dark:text-surface-400">{error}</Text>
              </div>
            </div>
          )
        }
      
        return (
          <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
      
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
                showFilters={showFilters}
                toggleFiltersVisibility={() => setShowFilters(!showFilters)}
              />
      
              {/* Results Summary */}
              <div className="flex items-center justify-between bg-white dark:bg-surface-800 rounded-lg p-4 shadow-soft mt-6">
                <Text as="span" className="text-surface-600 dark:text-surface-400">
                  {filteredProperties.length} properties found
                </Text>
                <div className="flex items-center space-x-2">
                  <Text as="span" className="text-sm text-surface-600 dark:text-surface-400">Sort by:</Text>
                  <select className="bg-transparent text-surface-800 dark:text-surface-200 border-none focus:ring-0">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                    <option>Bedrooms</option>
                  </select>
                </div>
              </div>
      
              <PropertyGrid
                properties={filteredProperties}
                favorites={favorites}
                viewMode={viewMode}
                onPropertyClick={setSelectedProperty}
                onToggleFavorite={toggleFavorite}
              />
            </main>
      
            <PropertyDetailModal
              property={selectedProperty}
              favorites={favorites}
              onClose={() => setSelectedProperty(null)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )
      }
      
      HomePage.propTypes = {
        darkMode: PropTypes.bool.isRequired,
        setDarkMode: PropTypes.func.isRequired,
      }
      
      export default HomePage