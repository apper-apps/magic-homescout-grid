import React from 'react'
      import PropTypes from 'prop-types'
      
      const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200 focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
          />
        )
      }
      
      Input.propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        className: PropTypes.string,
      }
      
      export default Input