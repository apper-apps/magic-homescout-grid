import React from 'react'
      import PropTypes from 'prop-types'
      
      const Label = ({ children, htmlFor, className = '', ...props }) => {
        return (
          <label htmlFor={htmlFor} className={`block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2 ${className}`} {...props}>
            {children}
          </label>
        )
      }
      
      Label.propTypes = {
        children: PropTypes.node.isRequired,
        htmlFor: PropTypes.string,
        className: PropTypes.string,
      }
      
      export default Label