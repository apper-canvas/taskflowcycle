import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const CategoryModal = ({ isOpen, onClose, onSave, category = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Folder',
    color: '#3B82F6'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableIcons = [
    'Folder', 'FolderOpen', 'Briefcase', 'Home', 'User', 'Users',
    'Heart', 'Star', 'BookOpen', 'Coffee', 'Music', 'Camera',
    'Gamepad2', 'ShoppingCart', 'Car', 'Plane', 'MapPin', 'Calendar',
    'Clock', 'Settings', 'Tool', 'Zap', 'Target', 'Trophy'
  ]

  const availableColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
    '#14B8A6', '#A855F7', '#22C55E', '#FACC15', '#DC2626'
  ]

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        icon: category.icon || 'Folder',
        color: category.color || '#3B82F6'
      })
    } else {
      setFormData({
        name: '',
        icon: 'Folder', 
        color: '#3B82F6'
      })
    }
    setErrors({})
  }, [category, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      await onSave({
        name: formData.name.trim(),
        icon: formData.icon,
        color: formData.color
      })
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {category ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter category name"
                className={errors.name ? 'border-red-500' : ''}
                autoFocus
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Icon
              </label>
              <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                {availableIcons.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleInputChange('icon', iconName)}
                    className={`
                      p-2 rounded-lg border-2 transition-all hover:scale-105
                      ${formData.icon === iconName
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <ApperIcon 
                      name={iconName} 
                      size={20} 
                      className={formData.icon === iconName ? 'text-primary-600' : 'text-gray-600'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all hover:scale-110
                      ${formData.color === color
                        ? 'border-gray-400 scale-110'
                        : 'border-gray-200'
                      }
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  category ? 'Update Category' : 'Create Category'
                )}
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CategoryModal