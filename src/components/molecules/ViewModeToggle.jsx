import React from 'react'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
      
      const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
        return (
          <div className="flex items-center bg-surface-100 dark:bg-surface-700 rounded-lg p-2">
            <Button
              onClick={() => onViewModeChange('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-surface-600 dark:text-surface-400'}`}
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              onClick={() => onViewModeChange('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-surface-600 dark:text-surface-400'}`}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        )
      }
      
      ViewModeToggle.propTypes = {
        viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
        onViewModeChange: PropTypes.func.isRequired,
      }
      
      export default ViewModeToggle