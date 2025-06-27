import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isToday, isFuture, parseISO } from 'date-fns'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'
import TaskList from '@/components/organisms/TaskList'
import TaskModal from '@/components/organisms/TaskModal'
import CategoryModal from '@/components/organisms/CategoryModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const Dashboard = () => {
  const { categoryId } = useParams()
  
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  
  // UI state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
const [searchTerm, setSearchTerm] = useState('')
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  // Handle URL category changes
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId)
    } else {
      setSelectedCategory('all')
    }
  }, [categoryId])

  // Filter tasks when dependencies change
  useEffect(() => {
    filterTasks()
  }, [tasks, selectedCategory, searchTerm])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let filtered = [...tasks]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category/view
    switch (selectedCategory) {
      case 'all':
        filtered = filtered.filter(task => !task.archived)
        break
      case 'today':
        filtered = filtered.filter(task => 
          !task.archived && 
          task.dueDate && 
          isToday(parseISO(task.dueDate))
        )
        break
      case 'upcoming':
        filtered = filtered.filter(task => 
          !task.archived && 
          task.dueDate && 
          isFuture(parseISO(task.dueDate))
        )
        break
      case 'completed':
        filtered = filtered.filter(task => task.completed && !task.archived)
        break
      default:
        // Specific category
        filtered = filtered.filter(task => 
          !task.archived && 
          task.category === selectedCategory
        )
    }

    // Sort tasks
    filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      
      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const aPriority = priorityOrder[a.priority] ?? 3
      const bPriority = priorityOrder[b.priority] ?? 3
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      
      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      
      // Sort by creation date
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setFilteredTasks(filtered)
  }

  const getTaskCounts = () => {
    const activeTasks = tasks.filter(task => !task.archived)
    const completedTasks = tasks.filter(task => task.completed && !task.archived)
    
    const counts = {
      all: activeTasks.length,
      completed: completedTasks.length,
      today: activeTasks.filter(task => 
        task.dueDate && isToday(parseISO(task.dueDate))
      ).length,
      upcoming: activeTasks.filter(task => 
        task.dueDate && isFuture(parseISO(task.dueDate))
      ).length
    }

    // Count tasks by category
    categories.forEach(category => {
      counts[category.id] = activeTasks.filter(task => 
        task.category === category.id
      ).length
    })

    return counts
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleSaveTask = async (taskData) => {
    try {
      let savedTask
      
      if (editingTask) {
        savedTask = await taskService.update(editingTask.id, taskData)
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id ? savedTask : task
        ))
        toast.success('Task updated successfully!')
      } else {
        savedTask = await taskService.create(taskData)
        setTasks(prev => [savedTask, ...prev])
        toast.success('Task created successfully!')
      }
    } catch (err) {
      toast.error('Failed to save task. Please try again.')
      console.error('Error saving task:', err)
}
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsCategoryModalOpen(true)
  }

  const handleSaveCategory = async (categoryData) => {
    try {
      let savedCategory
      
      if (editingCategory) {
        savedCategory = await categoryService.update(editingCategory.id, categoryData)
        setCategories(prev => prev.map(category => 
          category.id === editingCategory.id ? savedCategory : category
        ))
        toast.success('Category updated successfully!')
      } else {
        savedCategory = await categoryService.create(categoryData)
        setCategories(prev => [savedCategory, ...prev])
        toast.success('Category created successfully!')
      }
    } catch (err) {
      toast.error('Failed to save category. Please try again.')
      console.error('Error saving category:', err)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      })

      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ))

      if (updatedTask.completed) {
        toast.success('🎉 Task completed! Great job!')
      } else {
        toast.info('Task marked as incomplete')
      }
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error toggling task completion:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  const handleArchiveTask = async (taskId) => {
    try {
      const updatedTask = await taskService.update(taskId, { archived: true })
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      toast.success('Task archived successfully')
    } catch (err) {
      toast.error('Failed to archive task')
      console.error('Error archiving task:', err)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  const getEmptyStateContent = () => {
    switch (selectedCategory) {
      case 'today':
        return {
          title: "No tasks due today",
          message: "You're all caught up for today! Consider planning ahead or taking a well-deserved break."
        }
      case 'upcoming':
        return {
          title: "No upcoming tasks",
          message: "Great planning! Add some future tasks to stay organized and productive."
        }
      case 'completed':
        return {
          title: "No completed tasks yet",
          message: "Start completing some tasks to see your progress here. You've got this!"
        }
      default:
        if (selectedCategory !== 'all') {
          const category = categories.find(cat => cat.id === selectedCategory)
          return {
            title: `No tasks in ${category?.name || 'this category'}`,
            message: `Add your first task to the ${category?.name || 'selected'} category to get started!`
          }
        }
        return {
          title: "No tasks yet",
          message: "Create your first task to get started on your productivity journey!"
        }
    }
  }

  if (loading) return <Loading />
  
  if (error) return <Error message={error} onRetry={loadData} />

  const taskCounts = getTaskCounts()
  const emptyContent = getEmptyStateContent()

  return (
    <div className="flex h-screen bg-gray-50">
<Sidebar
        categories={categories}
        taskCounts={taskCounts}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        onAddCategory={handleAddCategory}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          tasksCount={taskCounts.all}
          completedCount={taskCounts.completed}
          onSearch={handleSearch}
          onAddTask={handleAddTask}
          searchTerm={searchTerm}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onArchiveTask={handleArchiveTask}
              onAddTask={handleAddTask}
              emptyTitle={emptyContent.title}
              emptyMessage={emptyContent.message}
            />
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setEditingTask(null)
        }}
        onSave={handleSaveTask}
        task={editingTask}
categories={categories}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  )
}

export default Dashboard