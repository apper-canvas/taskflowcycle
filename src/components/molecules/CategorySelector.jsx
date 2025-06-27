import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategorySelector = ({ categories, value, onChange, disabled = false }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Category
      </label>
      
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            type="button"
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={() => !disabled && onChange(category.id)}
            disabled={disabled}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2
              ${value === category.id
                ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            
            <ApperIcon 
              name={category.icon} 
              size={16} 
              className={value === category.id ? 'text-primary-600' : 'text-gray-500'} 
            />
            
            <span className={`font-medium truncate ${
              value === category.id ? 'text-primary-700' : 'text-gray-700'
            }`}>
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector