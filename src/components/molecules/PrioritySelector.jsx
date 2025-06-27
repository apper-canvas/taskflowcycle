import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'

const PrioritySelector = ({ value, onChange, disabled = false }) => {
  const priorities = [
    { value: 'low', label: 'Low', variant: 'info' },
    { value: 'medium', label: 'Medium', variant: 'warning' },
    { value: 'high', label: 'High', variant: 'error' }
  ]

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Priority Level
      </label>
      
      <div className="flex gap-2">
        {priorities.map((priority) => (
          <motion.button
            key={priority.value}
            type="button"
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={() => !disabled && onChange(priority.value)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium
              ${value === priority.value
                ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <Badge variant={priority.variant} size="sm">
              {priority.label}
            </Badge>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default PrioritySelector