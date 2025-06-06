import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const MainFeature = ({
  properties,
  favorites,
  viewMode,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  onToggleFavorite
}) => {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa']

  const handleFilterChange = (key, value) => {
    if (key === 'propertyType') {
      setFilters(prev => ({
        ...prev,
        propertyType: prev.propertyType.includes(value)
          ? prev.propertyType.filter(type => type !== value)
          : [...prev.propertyType, value]
      }))
    } else {
      setFilters(prev => ({ ...prev, [key]: value }))
    }
  }

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyType: [],
      bedrooms: '',
      bathrooms: ''
    })
  }

  const PropertyCard = ({ property }) => {
    const isFavorite = favorites.some(fav => fav.propertyId === property.id)

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProperty(property)}
      >
        <div className="relative">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop'}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="glass-morphism px-2 py-1 rounded-lg text-sm font-medium text-surface-800 dark:text-surface-200">
              {property.type}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(property.id)
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-surface-800 shadow-md hover:scale-110 transition-transform"
          >
            <ApperIcon 
              name="Heart" 
              size={16} 
              className={isFavorite ? 'text-red-500 fill-current' : 'text-surface-400'} 
            />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-lg">
              ${property.price?.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-surface-800 dark:text-surface-200 mb-2 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 flex items-center">
            <ApperIcon name="MapPin" size={14} className="mr-1" />
            {property.address?.street}, {property.address?.city}
          </p>
          
          <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <ApperIcon name="Bed" size={14} className="mr-1" />
                {property.bedrooms} bed
              </span>
              <span className="flex items-center">
                <ApperIcon name="Bath" size={14} className="mr-1" />
                {property.bathrooms} bath
              </span>
            </div>
            <span className="font-medium">{property.sqft?.toLocaleString()} sqft</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search by location or property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
          >
            <ApperIcon name="Filter" size={20} className="mr-2" />
            Filters
            {Object.values(filters).some(val => val !== '' && val.length !== 0) && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    placeholder="Any"
                    className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    placeholder="Any"
                    className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Property Type
                  </label>
                  <div className="space-y-1">
                    {propertyTypes.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.propertyType.includes(type)}
                          onChange={() => handleFilterChange('propertyType', type)}
                          className="mr-2 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-surface-700 dark:text-surface-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between bg-white dark:bg-surface-800 rounded-lg p-4 shadow-soft">
        <span className="text-surface-600 dark:text-surface-400">
          {properties.length} properties found
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-surface-600 dark:text-surface-400">Sort by:</span>
          <select className="bg-transparent text-surface-800 dark:text-surface-200 border-none focus:ring-0">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Bedrooms</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Home" size={48} className="mx-auto text-surface-400 mb-4" />
          <h3 className="text-lg font-medium text-surface-800 dark:text-surface-200 mb-2">
            No properties found
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProperty.images?.[imageIndex] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop'}
                  alt={selectedProperty.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-surface-800 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <ApperIcon name="X" size={20} />
                </button>
                
                {selectedProperty.images?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedProperty.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === imageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">
                      {selectedProperty.title}
                    </h2>
                    <p className="text-surface-600 dark:text-surface-400 flex items-center">
                      <ApperIcon name="MapPin" size={16} className="mr-1" />
                      {selectedProperty.address?.street}, {selectedProperty.address?.city}, {selectedProperty.address?.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${selectedProperty.price?.toLocaleString()}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      ${Math.round(selectedProperty.price / selectedProperty.sqft)} per sqft
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                    <ApperIcon name="Bed" size={24} className="mx-auto mb-1 text-primary" />
                    <div className="font-semibold text-surface-800 dark:text-surface-200">
                      {selectedProperty.bedrooms}
                    </div>
                    <div className="text-xs text-surface-600 dark:text-surface-400">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                    <ApperIcon name="Bath" size={24} className="mx-auto mb-1 text-primary" />
                    <div className="font-semibold text-surface-800 dark:text-surface-200">
                      {selectedProperty.bathrooms}
                    </div>
                    <div className="text-xs text-surface-600 dark:text-surface-400">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                    <ApperIcon name="Square" size={24} className="mx-auto mb-1 text-primary" />
                    <div className="font-semibold text-surface-800 dark:text-surface-200">
                      {selectedProperty.sqft?.toLocaleString()}
                    </div>
                    <div className="text-xs text-surface-600 dark:text-surface-400">Sq Ft</div>
                  </div>
                  <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                    <ApperIcon name="Home" size={24} className="mx-auto mb-1 text-primary" />
                    <div className="font-semibold text-surface-800 dark:text-surface-200">
                      {selectedProperty.type}
                    </div>
                    <div className="text-xs text-surface-600 dark:text-surface-400">Type</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Description
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>
                
                {selectedProperty.features && selectedProperty.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                      Features
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-surface-600 dark:text-surface-400"
                        >
                          <ApperIcon name="Check" size={16} className="mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button
                    onClick={() => onToggleFavorite(selectedProperty.id)}
                    className="flex-1 flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <ApperIcon 
                      name="Heart" 
                      size={20} 
                      className={`mr-2 ${favorites.some(fav => fav.propertyId === selectedProperty.id) ? 'fill-current' : ''}`} 
                    />
                    {favorites.some(fav => fav.propertyId === selectedProperty.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  <button className="flex-1 flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <ApperIcon name="Phone" size={20} className="mr-2" />
                    Contact Agent
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature