import React from 'react'
      import PropTypes from 'prop-types'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      
      const StatCard = ({ iconName, value, label }) => {
        return (
          <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <Icon name={iconName} size={24} className="mx-auto mb-1 text-primary" />
            <Text as="div" className="font-semibold text-surface-800 dark:text-surface-200">
              {value}
            </Text>
            <Text as="div" className="text-xs text-surface-600 dark:text-surface-400">
              {label}
            </Text>
          </div>
        )
      }
      
      StatCard.propTypes = {
        iconName: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      }
      
      export default StatCard