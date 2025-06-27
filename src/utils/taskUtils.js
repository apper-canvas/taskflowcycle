export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-red-600 bg-red-100'
    case 'medium':
      return 'text-amber-600 bg-amber-100'
    case 'low':
      return 'text-blue-600 bg-blue-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'text-green-600 bg-green-100'
    case 'in-progress':
      return 'text-orange-600 bg-orange-100'
    case 'pending':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getPriorityWeight = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 3
    case 'medium':
      return 2
    case 'low':
      return 1
    default:
      return 0
  }
}

export const filterTasksByStatus = (tasks, status) => {
  switch (status) {
    case 'completed':
      return tasks.filter(task => (task.completed || task.status === 'completed') && !task.archived)
    case 'in-progress':
      return tasks.filter(task => task.status === 'in-progress' && !task.archived)
    case 'pending':
      return tasks.filter(task => (task.status === 'pending' || (!task.completed && !task.status)) && !task.archived)
    case 'archived':
      return tasks.filter(task => task.archived)
    case 'active':
    default:
      return tasks.filter(task => !task.archived)
  }
}

export const filterTasksByCategory = (tasks, categoryId) => {
  if (!categoryId || categoryId === 'all') {
    return tasks
  }
  return tasks.filter(task => task.category === categoryId)
}

export const sortTasks = (tasks, sortBy = 'priority') => {
  return [...tasks].sort((a, b) => {
    // Always put completed tasks at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    switch (sortBy) {
      case 'priority':
        const aPriority = getPriorityWeight(a.priority)
        const bPriority = getPriorityWeight(b.priority)
        if (aPriority !== bPriority) {
          return bPriority - aPriority // Higher priority first
        }
        // Fall through to date sorting
        
      case 'dueDate':
        const aDate = a.dueDate ? new Date(a.dueDate) : null
        const bDate = b.dueDate ? new Date(b.dueDate) : null
        
        if (aDate && bDate) {
          return aDate - bDate
        }
        if (aDate) return -1
        if (bDate) return 1
        
        // Fall through to creation date
        
      case 'created':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })
}

export const getTaskStats = (tasks) => {
  const activeTasks = tasks.filter(task => !task.archived)
  const completedTasks = activeTasks.filter(task => task.completed || task.status === 'completed')
  const inProgressTasks = activeTasks.filter(task => task.status === 'in-progress')
  const pendingTasks = activeTasks.filter(task => task.status === 'pending' || (!task.completed && !task.status))
  
  return {
    total: activeTasks.length,
    completed: completedTasks.length,
    inProgress: inProgressTasks.length,
    pending: pendingTasks.length,
    completionRate: activeTasks.length > 0 ? (completedTasks.length / activeTasks.length) * 100 : 0
  }
}