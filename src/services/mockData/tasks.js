export const taskData = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the Q4 project proposal and send it to the client for review',
    category: 'work',
    priority: 'high',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    completed: false,
    archived: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: ''
  },
{
    id: 2,
    title: 'Buy groceries',
    description: 'Get fresh vegetables, fruits, and pantry essentials for the week',
    category: 'shopping',
    priority: 'medium',
    dueDate: new Date().toISOString(), // Today
    completed: false,
    archived: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: ''
  },
{
    id: 3,
    title: 'Morning workout',
    description: '30-minute cardio session and strength training',
    category: 'health',
    priority: 'high',
    dueDate: new Date().toISOString(), // Today
    completed: true,
    archived: false,
    createdAt: new Date().toISOString(),
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: ''
  },
{
    id: 4,
    title: 'Learn React hooks',
    description: 'Study advanced React hooks patterns and implement custom hooks',
    category: 'learning',
    priority: 'medium',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // In 3 days
    completed: false,
    archived: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: ''
  },
{
    id: 5,
    title: 'Call mom',
    description: 'Weekly check-in call with family',
    category: 'personal',
    priority: 'low',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // In 2 days
    completed: false,
    archived: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    notes: ''
  },
{
    id: 6,
    title: 'Fix kitchen faucet',
    description: 'Replace the leaky kitchen faucet with the new one purchased last week',
    category: 'home',
    priority: 'medium',
    dueDate: null,
    completed: false,
    archived: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: ''
  },
{
    id: 7,
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for the weekly team standup meeting',
    category: 'work',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    completed: true,
    archived: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    notes: ''
  },
{
    id: 8,
    title: 'Read JavaScript book',
    description: 'Continue reading "You Don\'t Know JS" series - finish chapter 3',
    category: 'learning',
    priority: 'low',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
    completed: false,
    archived: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: ''
  }
]