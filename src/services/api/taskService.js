import { taskData } from '@/services/mockData/tasks'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.tasks = [...taskData]
  }

  async getAll() {
    await delay(300)
    return [...this.tasks]
  }

  async getById(id) {
    await delay(200)
    const task = this.tasks.find(task => task.id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

async create(taskData) {
    await delay(400)
    
    const newTask = {
      id: Math.max(...this.tasks.map(t => t.id), 0) + 1,
      ...taskData,
      status: taskData.status || 'pending',
      completed: taskData.status === 'completed' ? true : false,
      archived: false,
      createdAt: new Date().toISOString(),
      completedAt: taskData.status === 'completed' ? new Date().toISOString() : null,
      notes: taskData.notes || ''
    }
    
    this.tasks.unshift(newTask)
    return { ...newTask }
  }

async update(id, updates) {
    await delay(300)
    
    const index = this.tasks.findIndex(task => task.id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    // Handle status-completion synchronization
    const updatedTask = { ...this.tasks[index], ...updates }
    
    if (updates.status === 'completed' && !updatedTask.completed) {
      updatedTask.completed = true
      updatedTask.completedAt = new Date().toISOString()
    } else if (updates.status && updates.status !== 'completed' && updatedTask.completed) {
      updatedTask.completed = false
      updatedTask.completedAt = null
    } else if (updates.completed === true && updatedTask.status !== 'completed') {
      updatedTask.status = 'completed'
      updatedTask.completedAt = new Date().toISOString()
    } else if (updates.completed === false && updatedTask.status === 'completed') {
      updatedTask.status = 'pending'
      updatedTask.completedAt = null
    }
    
    this.tasks[index] = updatedTask
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await delay(250)
    
    const index = this.tasks.findIndex(task => task.id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }

  async getByCategory(categoryId) {
    await delay(300)
    return this.tasks.filter(task => task.category === categoryId && !task.archived)
  }

  async getCompleted() {
    await delay(300)
    return this.tasks.filter(task => task.completed && !task.archived)
  }

  async getArchived() {
    await delay(300)
    return this.tasks.filter(task => task.archived)
  }
}

export const taskService = new TaskService()