import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import FilterGroup from '../molecules/FilterGroup'
import Button from '../atoms/Button'
      
      const FilterSection = ({ showFilters, filters, onFilterChange, onClearFilters }) => {
        const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa']
      
        const bedroomsOptions = [
          { value: '', label: 'Any' },
          { value: '1', label: '1+' },
          { value: '2', label: '2+' },
          { value: '3', label: '3+' },
          { value: '4', label: '4+' },
        ]
      
        const bathroomsOptions = [
          { value: '', label: 'Any' },
          { value: '1', label: '1+' },
          { value: '2', label: '2+' },
          { value: '3', label: '3+' },
        ]
      
        return (
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-600"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <FilterGroup
                    label="Min Price"
                    type="input"
                    value={filters.priceMin}
                    onChange={(e) => onFilterChange('priceMin', e.target.value)}
                  />
                  <FilterGroup
                    label="Max Price"
                    type="input"
                    value={filters.priceMax}
                    onChange={(e) => onFilterChange('priceMax', e.target.value)}
                  />
                  <FilterGroup
                    label="Bedrooms"
                    type="select"
                    value={filters.bedrooms}
                    onChange={(e) => onFilterChange('bedrooms', e.target.value)}
                    options={bedroomsOptions}
                  />
                  <FilterGroup
                    label="Bathrooms"
                    type="select"
                    value={filters.bathrooms}
onChange={(e) => onFilterChange('bathrooms', e.target.value)}
                    options={bathroomsOptions}
                  />
                  <FilterGroup
                    label="Property Type"
                    type="checkbox-group"
                    value={filters.propertyType}
                    onChange={(value) => onFilterChange('propertyType', value)}
                    options={propertyTypes.map(type => ({ value: type, label: type }))}
                  />
                </div>
      
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={onClearFilters}
                    className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }
      
      FilterSection.propTypes = {
        showFilters: PropTypes.bool.isRequired,
        filters: PropTypes.shape({
          priceMin: PropTypes.string,
          priceMax: PropTypes.string,
          propertyType: PropTypes.arrayOf(PropTypes.string),
          bedrooms: PropTypes.string,
          bathrooms: PropTypes.string,
        }).isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onClearFilters: PropTypes.func.isRequired,
      }
      
      export default FilterSection