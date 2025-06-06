import React from 'react'
      import PropTypes from 'prop-types'
      
      const Button = ({ children, onClick, className = '', ...props }) => {
        return (
          <button
            onClick={onClick}
            className={`transition-colors duration-200 ${className}`}
            {...props}
          >
            {children}
          </button>
        )
      }
      
      Button.propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string,
      }
      
      export default Button