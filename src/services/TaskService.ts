export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

const STORAGE_KEY = 'doon_tasks'

export function getTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function addTask(task: Task): void {
  const tasks = getTasks()
  tasks.push(task)
  saveTasks(tasks)
}

export function removeTask(id: string): void {
  const tasks = getTasks().filter(task => task.id !== id)
  saveTasks(tasks)
}

export function updateTask(updatedTask: Task): void {
  const tasks = getTasks().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  )
  saveTasks(tasks)
}
