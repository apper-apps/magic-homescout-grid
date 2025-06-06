import React from 'react'
import PropTypes from 'prop-types'
import SearchBar from '../molecules/SearchBar'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import FilterSection from '../molecules/FilterSection'
      
      const SearchFilterBar = ({
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        showFilters,
        toggleFiltersVisibility
      }) => {
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
      
        return (
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
            <div className="flex flex-col lg:flex-row gap-4">
              <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
      
              <Button
                onClick={toggleFiltersVisibility}
                className="flex items-center px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600"
              >
                <Icon name="Filter" size={20} className="mr-2" />
                <Text as="span">Filters</Text>
                {Object.values(filters).some(val => val !== '' && val.length !== 0) && (
                  <Text as="span" className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </Text>
                )}
              </Button>
            </div>
      
            <FilterSection
              showFilters={showFilters}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>
        )
      }
      
      SearchFilterBar.propTypes = {
        searchTerm: PropTypes.string.isRequired,
        setSearchTerm: PropTypes.func.isRequired,
        filters: PropTypes.shape({
          priceMin: PropTypes.string,
          priceMax: PropTypes.string,
          propertyType: PropTypes.arrayOf(PropTypes.string),
          bedrooms: PropTypes.string,
          bathrooms: PropTypes.string,
        }).isRequired,
        setFilters: PropTypes.func.isRequired,
        showFilters: PropTypes.bool.isRequired,
        toggleFiltersVisibility: PropTypes.func.isRequired,
      }
      
      export default SearchFilterBar