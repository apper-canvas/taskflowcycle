import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ 
  tasksCount, 
  completedCount, 
  onSearch, 
  onAddTask,
  searchTerm 
}) => {
  const completionPercentage = tasksCount > 0 ? Math.round((completedCount / tasksCount) * 100) : 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
                <p className="text-sm text-gray-600">Modern Task Management</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-full"
            >
              <span className="text-sm font-medium text-primary-700">
                {completedCount} of {tasksCount} completed ({completionPercentage}%)
              </span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="md"
              icon="Plus"
              onClick={onAddTask}
              className="shadow-premium"
            >
              Add Task
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="max-w-2xl"
          />
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header