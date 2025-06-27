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
      completed: false,
      archived: false,
      createdAt: new Date().toISOString(),
      completedAt: null
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
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updates
    }
    
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