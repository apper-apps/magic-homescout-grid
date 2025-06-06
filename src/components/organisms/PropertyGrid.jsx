import React from 'react'
      import PropTypes from 'prop-types'
      import PropertyCard from '@/components/molecules/PropertyCard'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      
      const PropertyGrid = ({ properties, favorites, viewMode, onPropertyClick, onToggleFavorite }) => {
        return (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.some(fav => fav.propertyId === property.id)}
                  onClick={() => onPropertyClick(property)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
      
            {properties.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Home" size={48} className="mx-auto text-surface-400 mb-4" />
                <Text as="h3" className="text-lg font-medium text-surface-800 dark:text-surface-200 mb-2">
                  No properties found
                </Text>
                <Text as="p" className="text-surface-600 dark:text-surface-400">
                  Try adjusting your search criteria or filters
                </Text>
              </div>
            )}
          </>
        )
      }
      
      PropertyGrid.propTypes = {
        properties: PropTypes.arrayOf(PropTypes.object).isRequired,
        favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
        viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
        onPropertyClick: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired,
      }
      
      export default PropertyGrid