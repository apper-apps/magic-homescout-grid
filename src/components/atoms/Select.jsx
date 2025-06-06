import React from 'react'
      import PropTypes from 'prop-types'
      
      const Select = ({ value, onChange, options, className = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`w-full p-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-200 ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }
      
      Select.propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired,
        })).isRequired,
        className: PropTypes.string,
      }
      
      export default Select