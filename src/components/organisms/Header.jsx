import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import ViewModeToggle from '../molecules/ViewModeToggle'
const Header = ({ darkMode, setDarkMode, viewMode, setViewMode }) => {
  return (
    <header className="bg-white dark:bg-surface-800 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Icon name="Home" size={32} className="text-primary mr-3" />
              <Text as="h1" className="font-heading text-2xl font-bold text-surface-800 dark:text-surface-200">
                HomeScout
              </Text>
            </motion.div>
          </div>

<div className="flex items-center space-x-4">
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            <Button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600"
            >
              <Icon name={darkMode ? "Sun" : "Moon"} size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
}

export default Header