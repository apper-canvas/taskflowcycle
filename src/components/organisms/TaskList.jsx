import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import TaskCard from "@/components/molecules/TaskCard";
import Empty from "@/components/ui/Empty";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onArchiveTask,
  onAddTask,
  emptyTitle,
  emptyMessage 
}) => {
  const [selectedTasks, setSelectedTasks] = useState(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)
  }

  const handleSelectTask = (taskId, selected) => {
    const newSelected = new Set(selectedTasks)
    if (selected) {
      newSelected.add(taskId)
    } else {
      newSelected.delete(taskId)
    }
    setSelectedTasks(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }

  const handleSelectAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set())
      setShowBulkActions(false)
    } else {
      setSelectedTasks(new Set(tasks.map(task => task.id)))
      setShowBulkActions(true)
    }
  }

  const handleBulkComplete = () => {
    selectedTasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId)
      if (task && !task.completed) {
        onToggleComplete(taskId)
      }
    })
    setSelectedTasks(new Set())
    setShowBulkActions(false)
  }

  const handleBulkCategoryChange = (categoryId) => {
    selectedTasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId)
      if (task) {
        onEditTask({ ...task, category: categoryId })
      }
    })
    setSelectedTasks(new Set())
    setShowBulkActions(false)
  }

  const handleBulkDueDateChange = () => {
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):')
    if (newDueDate) {
      selectedTasks.forEach(taskId => {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          onEditTask({ ...task, dueDate: newDueDate })
        }
      })
      setSelectedTasks(new Set())
      setShowBulkActions(false)
    }
  }

  const clearSelection = () => {
    setSelectedTasks(new Set())
    setShowBulkActions(false)
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyTitle || "No tasks found"}
        message={emptyMessage || "Create your first task to get started on your productivity journey!"}
        onAction={onAddTask}
        actionText="Add Task"
        icon="CheckSquare"
      />
    )
  }

return (
    <div className="space-y-4 relative">
      {/* Bulk Selection Header */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectedTasks.size === tasks.length}
              onChange={handleSelectAll}
              size="md"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedTasks.size > 0 
                ? `${selectedTasks.size} of ${tasks.length} selected`
                : 'Select all tasks'
              }
            </span>
          </div>
          {selectedTasks.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={clearSelection}
            >
              Clear
            </Button>
          )}
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 100
            }}
            layout
          >
<TaskCard
              task={task}
              category={getCategoryById(task.category)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onArchive={onArchiveTask}
              isSelected={selectedTasks.has(task.id)}
              onSelect={handleSelectTask}
              showSelection={true}
            />
          </motion.div>
        ))}
</AnimatePresence>
      
      {/* Bulk Actions Toolbar */}
      <AnimatePresence>
        {showBulkActions && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckSquare" size={16} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedTasks.size} selected
                  </span>
                </div>
                
                <div className="h-6 w-px bg-gray-300" />
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Check"
                    onClick={handleBulkComplete}
                  >
                    Complete
                  </Button>
                  
                  <div className="relative group">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="Tag"
                    >
                      Category
                    </Button>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-2 space-y-1">
                        {categories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => handleBulkCategoryChange(category.id)}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-gray-100 rounded"
                          >
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Calendar"
                    onClick={handleBulkDueDateChange}
                  >
                    Due Date
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Completion Celebration */}
      <AnimatePresence>
        {tasks.every(task => task.completed) && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: 2,
                ease: "easeInOut" 
              }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            
            <h3 className="text-2xl font-bold gradient-text mb-2">
              All Tasks Completed!
            </h3>
            
            <p className="text-gray-600">
              Great job! You've completed all your tasks. Time to celebrate!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskList