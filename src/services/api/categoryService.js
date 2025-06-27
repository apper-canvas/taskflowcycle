import { categoryData } from '@/services/mockData/categories'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class CategoryService {
  constructor() {
    this.categories = [...categoryData]
  }

  async getAll() {
    await delay(200)
    return [...this.categories]
  }

  async getById(id) {
    await delay(150)
    const category = this.categories.find(cat => cat.id === id)
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }

  async create(categoryData) {
    await delay(300)
    
    const newCategory = {
      id: `cat_${Date.now()}`,
      ...categoryData
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await delay(250)
    
    const index = this.categories.findIndex(cat => cat.id === id)
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...updates
    }
    
    return { ...this.categories[index] }
  }

  async delete(id) {
    await delay(200)
    
    const index = this.categories.findIndex(cat => cat.id === id)
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories.splice(index, 1)
    return true
  }
}

export const categoryService = new CategoryService()