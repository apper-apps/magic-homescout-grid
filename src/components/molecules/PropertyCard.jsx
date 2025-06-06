import React from 'react'
      import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      
      const PropertyCard = ({ property, isFavorite, onClick, onToggleFavorite }) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop'}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Text as="span" className="glass-morphism px-2 py-1 rounded-lg text-sm font-medium text-surface-800 dark:text-surface-200">
                  {property.type}
                </Text>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(property.id)
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-surface-800 shadow-md hover:scale-110 transition-transform"
              >
                <Icon
                  name="Heart"
                  size={16}
                  className={isFavorite ? 'text-red-500 fill-current' : 'text-surface-400'}
                />
              </Button>
              <div className="absolute bottom-3 left-3">
                <Text as="span" className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-lg">
                  ${property.price?.toLocaleString()}
                </Text>
              </div>
            </div>
      
            <div className="p-4">
              <Text as="h3" className="font-semibold text-lg text-surface-800 dark:text-surface-200 mb-2 line-clamp-1">
                {property.title}
              </Text>
              <Text as="p" className="text-surface-600 dark:text-surface-400 text-sm mb-3 flex items-center">
                <Icon name="MapPin" size={14} className="mr-1" />
                {property.address?.street}, {property.address?.city}
              </Text>
      
              <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400">
                <div className="flex items-center space-x-4">
                  <Text as="span" className="flex items-center">
                    <Icon name="Bed" size={14} className="mr-1" />
                    {property.bedrooms} bed
                  </Text>
                  <Text as="span" className="flex items-center">
                    <Icon name="Bath" size={14} className="mr-1" />
                    {property.bathrooms} bath
                  </Text>
                </div>
                <Text as="span" className="font-medium">{property.sqft?.toLocaleString()} sqft</Text>
              </div>
            </div>
          </motion.div>
        )
      }
      
      PropertyCard.propTypes = {
        property: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
          }),
          price: PropTypes.number,
          images: PropTypes.arrayOf(PropTypes.string),
          type: PropTypes.string,
          bedrooms: PropTypes.number,
          bathrooms: PropTypes.number,
          sqft: PropTypes.number,
        }).isRequired,
        isFavorite: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired,
      }
      
      export default PropertyCard