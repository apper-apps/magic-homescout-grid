import React from 'react'
import PropTypes from 'prop-types'
import ApperIcon from '../../ApperIcon'
      
      const Icon = ({ name, size, className = '', ...props }) => {
        return (
          <ApperIcon name={name} size={size} className={className} {...props} />
        )
      }
      
      Icon.propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
        className: PropTypes.string,
      }
      
      export default Icon