import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import Empty from '@/components/ui/Empty'

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
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)
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
    <div className="space-y-4">
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
            />
          </motion.div>
        ))}
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