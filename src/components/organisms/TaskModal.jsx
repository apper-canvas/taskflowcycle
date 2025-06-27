import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import PrioritySelector from '@/components/molecules/PrioritySelector'
import CategorySelector from '@/components/molecules/CategorySelector'
import ApperIcon from '@/components/ApperIcon'

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null, 
  categories = [] 
}) => {
const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    notes: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotesPreview, setShowNotesPreview] = useState(false)
  const [notesExpanded, setNotesExpanded] = useState(false)

useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
        notes: task.notes || ''
      })
      setNotesExpanded(Boolean(task.notes))
} else {
      setFormData({
        title: '',
        description: '',
        category: categories[0]?.id || '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        notes: ''
      })
      setNotesExpanded(false)
    }
    setErrors({})
    setShowNotesPreview(false)
  }, [task, categories, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }
      
      await onSave(taskData)
      onClose()
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Plus" size={18} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {task ? 'Edit Task' : 'Create New Task'}
                </h2>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>

          {/* Form */}
<form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <Input
              label="Task Title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter task title..."
              error={errors.title}
              icon="Type"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Add task description (optional)..."
                rows={4}
                className="input-premium resize-none"
              />
            </div>

            {/* Notes Section */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <ApperIcon name="FileText" size={16} className="mr-2" />
                  Notes (Markdown Supported)
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={notesExpanded ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setNotesExpanded(!notesExpanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {notesExpanded ? 'Collapse' : 'Expand'}
                </Button>
              </div>
              
              <AnimatePresence>
                {notesExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3">
                      {formData.notes && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon="Edit"
                            onClick={() => setShowNotesPreview(false)}
                            className={`text-xs ${!showNotesPreview ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon="Eye"
                            onClick={() => setShowNotesPreview(true)}
                            className={`text-xs ${showNotesPreview ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
                          >
                            Preview
                          </Button>
                        </div>
                      )}
                      
                      {!showNotesPreview ? (
                        <div>
                          <textarea
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Add notes in markdown format..."
                            rows={6}
                            className="input-premium resize-none font-mono text-sm"
                          />
                          <div className="mt-2 text-xs text-gray-500 bg-white rounded p-2 border">
                            <div className="font-medium mb-1">Markdown Quick Reference:</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>**Bold** → <strong>Bold</strong></div>
                              <div>*Italic* → <em>Italic</em></div>
                              <div># Header → Header</div>
                              <div>- List → • List</div>
                              <div>`Code` → <code className="bg-gray-100 px-1 rounded">Code</code></div>
                              <div>[Link](url) → Link</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white border rounded-lg p-4 min-h-[8rem]">
                          <ReactMarkdown className="prose prose-sm max-w-none">
                            {formData.notes || '*No notes added yet*'}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <CategorySelector
              categories={categories}
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
            />
            {errors.category && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <ApperIcon name="AlertCircle" size={16} className="mr-1" />
                {errors.category}
              </p>
            )}

<PrioritySelector
              value={formData.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="input-premium"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <Input
              label="Due Date (Optional)"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              icon="Calendar"
            />

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                icon={task ? "Save" : "Plus"}
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskModal