import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const Sidebar = ({ categories, taskCounts, onCategorySelect, selectedCategory, onAddCategory }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId)
    if (categoryId === 'all') {
      navigate('/')
    } else {
      navigate(`/category/${categoryId}`)
    }
  }

  const sidebarItems = [
    {
      id: 'all',
      name: 'All Tasks',
      icon: 'Inbox',
      count: taskCounts.all || 0,
      color: '#6B7280'
    },
    {
      id: 'today',
      name: 'Today',
      icon: 'Calendar',
      count: taskCounts.today || 0,
      color: '#3B82F6'
    },
    {
      id: 'upcoming',
      name: 'Upcoming',
      icon: 'Clock',
      count: taskCounts.upcoming || 0,
      color: '#8B5CF6'
    },
    {
      id: 'completed',
      name: 'Completed',
      icon: 'CheckCircle',
      count: taskCounts.completed || 0,
      color: '#10B981'
    }
  ]

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 p-6 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Quick Navigation */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Quick Access
          </h2>
          
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(item.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                  ${selectedCategory === item.id
                    ? 'bg-gradient-to-r from-primary-100 to-primary-200 border-2 border-primary-300 shadow-md'
                    : 'hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <ApperIcon 
                    name={item.icon} 
                    size={18} 
                    className={selectedCategory === item.id ? 'text-primary-600' : 'text-gray-500'} 
                  />
                  <span className={`font-medium ${
                    selectedCategory === item.id ? 'text-primary-700' : 'text-gray-700'
                  }`}>
                    {item.name}
                  </span>
                </div>
                
                <Badge 
                  variant={selectedCategory === item.id ? 'primary' : 'default'}
                  size="xs"
                >
                  {item.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>

{/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Categories
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onAddCategory}
              className="p-1.5 rounded-lg bg-primary-100 hover:bg-primary-200 border border-primary-200 transition-colors"
              title="Add Category"
            >
              <ApperIcon name="Plus" size={14} className="text-primary-600" />
            </motion.button>
          </div>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (sidebarItems.length + index) * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-100 to-primary-200 border-2 border-primary-300 shadow-md'
                    : 'hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <ApperIcon 
                    name={category.icon} 
                    size={18} 
                    className={selectedCategory === category.id ? 'text-primary-600' : 'text-gray-500'} 
                  />
                  <span className={`font-medium truncate ${
                    selectedCategory === category.id ? 'text-primary-700' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                </div>
                
                <Badge 
                  variant={selectedCategory === category.id ? 'primary' : 'default'}
                  size="xs"
                >
                  {taskCounts[category.id] || 0}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200"
        >
          <div className="flex items-center space-x-2 mb-3">
            <ApperIcon name="TrendingUp" size={20} className="text-primary-600" />
            <h3 className="font-semibold text-primary-700">Today's Progress</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-semibold text-primary-700">
                {taskCounts.all > 0 ? Math.round((taskCounts.completed / taskCounts.all) * 100) : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: taskCounts.all > 0 
                    ? `${Math.round((taskCounts.completed / taskCounts.all) * 100)}%` 
                    : '0%' 
                }}
                transition={{ duration: 1, delay: 1 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}

export default Sidebar