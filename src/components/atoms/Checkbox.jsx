import React from 'react'
      import PropTypes from 'prop-types'
      
      const Checkbox = ({ checked, onChange, className = '', ...props }) => {
        return (
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`text-primary focus:ring-primary ${className}`}
            {...props}
          />
        )
      }
      
      Checkbox.propTypes = {
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
      }
      
      export default Checkbox