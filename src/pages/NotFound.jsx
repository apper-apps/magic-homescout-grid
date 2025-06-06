import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <ApperIcon name="Home" size={64} className="mx-auto text-surface-400 mb-8" />
        <h1 className="text-6xl font-bold text-surface-800 dark:text-surface-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-600 dark:text-surface-400 mb-4">
          Property Not Found
        </h2>
        <p className="text-surface-500 dark:text-surface-500 mb-8 max-w-md mx-auto">
          The property you're looking for doesn't exist or has been moved to a new address.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
          Back to Properties
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound