import React from 'react'
import PropTypes from 'prop-types'
import PropertyCard from '../molecules/PropertyCard'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
      
const PropertyGrid = ({ properties = [], favorites = [], viewMode = 'grid', onPropertyClick, onToggleFavorite }) => {
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
            isFavorite={Array.isArray(favorites) && favorites.some(fav => fav && fav.propertyId === property.id)}
            onClick={() => onPropertyClick && onPropertyClick(property)}
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
  properties: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  viewMode: PropTypes.oneOf(['grid', 'list']),
  onPropertyClick: PropTypes.func,
  onToggleFavorite: PropTypes.func,
}
      
      export default PropertyGrid