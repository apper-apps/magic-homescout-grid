import React from 'react'
      import PropTypes from 'prop-types'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Select from '@/components/atoms/Select'
      import Checkbox from '@/components/atoms/Checkbox'
      import Text from '@/components/atoms/Text'
      
      const FilterGroup = ({ label, type, value, onChange, options, propertyTypes = [], className = '' }) => {
        const id = label.toLowerCase().replace(/\s/g, '-')
      
        const renderInput = () => (
          <Input
            id={id}
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Any"
          />
        )
      
        const renderSelect = () => (
          <Select
            id={id}
            value={value}
            onChange={onChange}
            options={options}
          />
        )
      
        const renderCheckboxes = () => (
          <div className="space-y-1">
            {propertyTypes.map((propType) => (
              <Label key={propType} htmlFor={`${id}-${propType}`} className="flex items-center">
                <Checkbox
                  id={`${id}-${propType}`}
                  checked={value.includes(propType)}
                  onChange={() => onChange(propType)}
                />
                <Text as="span" className="text-sm text-surface-700 dark:text-surface-300 ml-2">{propType}</Text>
              </Label>
            ))}
          </div>
        )
      
        return (
          <div className={className}>
            <Label htmlFor={id}>{label}</Label>
            {type === 'input' && renderInput()}
            {type === 'select' && renderSelect()}
            {type === 'checkbox-group' && renderCheckboxes()}
          </div>
        )
      }
      
      FilterGroup.propTypes = {
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['input', 'select', 'checkbox-group']).isRequired,
        value: PropTypes.any, // Can be string, number, or array for checkboxes
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired,
        })),
        propertyTypes: PropTypes.arrayOf(PropTypes.string),
        className: PropTypes.string,
      }
      
      export default FilterGroup