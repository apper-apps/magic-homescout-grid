import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import StatCard from '../molecules/StatCard'
      
      const PropertyDetailModal = ({ property, favorites, onClose, onToggleFavorite }) => {
        const [imageIndex, setImageIndex] = useState(0)
      
        useEffect(() => {
          setImageIndex(0) // Reset image index when property changes
        }, [property])
      
        if (!property) return null
      
        const isFavorite = favorites.some(fav => fav.propertyId === property.id)
      
        return (
          <AnimatePresence>
            {property && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
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
                      src={property.images?.[imageIndex] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop'}
                      alt={property.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <Button
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 bg-white dark:bg-surface-800 rounded-full shadow-md hover:scale-110"
                    >
                      <Icon name="X" size={20} />
                    </Button>
      
                    {property.images?.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {property.images.map((_, index) => (
                          <Button
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
                        <Text as="h2" className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">
                          {property.title}
                        </Text>
                        <Text as="p" className="text-surface-600 dark:text-surface-400 flex items-center">
                          <Icon name="MapPin" size={16} className="mr-1" />
                          {property.address?.street}, {property.address?.city}, {property.address?.state}
                        </Text>
                      </div>
                      <div className="text-right">
<Text as="div" className="text-3xl font-bold text-primary mb-1">
                          ${property.price?.toLocaleString() || 'N/A'}
                        </Text>
                        <Text as="div" className="text-sm text-surface-600 dark:text-surface-400">
                          {property.price && property.sqft ? `$${Math.round(property.price / property.sqft)} per sqft` : 'Price per sqft N/A'}
                        </Text>
                      </div>
                    </div>
      
<div className="grid grid-cols-4 gap-4 mb-6">
                      <StatCard iconName="Bed" value={property.bedrooms || 0} label="Bedrooms" />
                      <StatCard iconName="Bath" value={property.bathrooms || 0} label="Bathrooms" />
                      <StatCard iconName="Square" value={property.sqft?.toLocaleString() || 'N/A'} label="Sq Ft" />
                      <StatCard iconName="Home" value={property.type || 'N/A'} label="Type" />
                    </div>
      
                    <div className="mb-6">
                      <Text as="h3" className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                        Description
</Text>
                      <Text as="p" className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {property.description || 'No description available.'}
                      </Text>
                    </div>
      
                    {property.features && property.features.length > 0 && (
                      <div className="mb-6">
                        <Text as="h3" className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-3">
                          Features
                        </Text>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {property.features.map((feature, index) => (
                            <Text as="div"
                              key={index}
                              className="flex items-center text-sm text-surface-600 dark:text-surface-400"
                            >
                              <Icon name="Check" size={16} className="mr-2 text-green-500" />
                              {feature}
                            </Text>
                          ))}
                        </div>
                      </div>
                    )}
      
                    <div className="flex gap-4">
                      <Button
                        onClick={() => onToggleFavorite(property.id)}
                        className="flex-1 flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white"
                      >
                        <Icon
                          name="Heart"
                          size={20}
                          className={`mr-2 ${isFavorite ? 'fill-current' : ''}`}
                        />
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                      </Button>
                      <Button className="flex-1 flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
                        <Icon name="Phone" size={20} className="mr-2" />
                        Contact Agent
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }
      
      PropertyDetailModal.propTypes = {
        property: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
          }),
          price: PropTypes.number,
          images: PropTypes.arrayOf(PropTypes.string),
          type: PropTypes.string,
          bedrooms: PropTypes.number,
          bathrooms: PropTypes.number,
          sqft: PropTypes.number,
          description: PropTypes.string,
          features: PropTypes.arrayOf(PropTypes.string),
        }),
        favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
        onClose: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired,
      }
      
      export default PropertyDetailModal