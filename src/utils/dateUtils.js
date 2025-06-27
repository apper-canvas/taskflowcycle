import { format, isToday, isTomorrow, isPast, isFuture, parseISO } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return null
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr)
  } catch (error) {
    console.error('Error formatting date:', error)
    return null
  }
}

export const getRelativeDate = (date) => {
  if (!date) return null
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (isToday(dateObj)) return 'Today'
    if (isTomorrow(dateObj)) return 'Tomorrow'
    if (isPast(dateObj)) return `Overdue: ${format(dateObj, 'MMM d')}`
    
    return format(dateObj, 'MMM d, yyyy')
  } catch (error) {
    console.error('Error getting relative date:', error)
    return null
  }
}

export const isOverdue = (date) => {
  if (!date) return false
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isPast(dateObj) && !isToday(dateObj)
  } catch (error) {
    console.error('Error checking if date is overdue:', error)
    return false
  }
}

export const sortByDate = (items, dateField = 'dueDate', ascending = true) => {
  return [...items].sort((a, b) => {
    const dateA = a[dateField] ? new Date(a[dateField]) : null
    const dateB = b[dateField] ? new Date(b[dateField]) : null
    
    // Handle null dates (put them at the end)
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    
    const diff = dateA - dateB
    return ascending ? diff : -diff
  })
}