import React from 'react'
      import PropTypes from 'prop-types'
      
      const Text = ({ as = 'p', children, className = '', ...props }) => {
        const Tag = as
        return (
          <Tag className={className} {...props}>
            {children}
          </Tag>
        )
      }
      
      Text.propTypes = {
        as: PropTypes.oneOf(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
      }
      
      export default Text