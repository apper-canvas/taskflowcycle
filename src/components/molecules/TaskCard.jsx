import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onArchive 
}) => {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'info'
      default: return 'default'
    }
  }

  const formatDueDate = (date) => {
    if (!date) return null
    
    const dueDate = new Date(date)
    
    if (isToday(dueDate)) return 'Today'
    if (isTomorrow(dueDate)) return 'Tomorrow'
    if (isPast(dueDate)) return `Overdue: ${format(dueDate, 'MMM d')}`
    
    return format(dueDate, 'MMM d, yyyy')
  }

  const isDueSoon = task.dueDate && (isToday(new Date(task.dueDate)) || isPast(new Date(task.dueDate)))

  const handleCompleteToggle = () => {
    onToggleComplete(task.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01 }}
      className={`card-premium p-6 ${task.completed ? 'opacity-75 bg-gradient-to-r from-green-50 to-green-100' : ''}`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleCompleteToggle}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-2 text-sm ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-3 mt-4">
                {category && (
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {category.name}
                    </span>
                  </div>
                )}
                
                <Badge 
                  variant={getPriorityVariant(task.priority)}
                  size="xs"
                  pulse={task.priority === 'high' && !task.completed}
                >
                  {task.priority}
                </Badge>
                
                {task.dueDate && (
                  <Badge 
                    variant={isDueSoon && !task.completed ? 'error' : 'default'}
                    size="xs"
                    icon="Calendar"
                  >
                    {formatDueDate(task.dueDate)}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit2"
                onClick={() => onEdit(task)}
              />
              
              {task.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Archive"
                  onClick={() => onArchive(task.id)}
                />
              )}
              
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard