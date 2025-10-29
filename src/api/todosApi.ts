import type { Todo } from '../features/todos/types'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'

type JsonPlaceholderTodo = {
  id: number
  title: string
  completed: boolean
}

export const fetchTodos = async (): Promise<Todo[]> => {
  let response: Response

  try {
    response = await fetch(TODOS_URL)
  } catch {
    throw new Error('Failed to reach JSONPlaceholder. Try again later.')
  }

  if (!response.ok) {
    throw new Error(
      `JSONPlaceholder responded with status ${response.status}. Todos were not loaded.`,
    )
  }

  const todos = (await response.json()) as JsonPlaceholderTodo[]

  return todos.map((todo) => ({
    id: String(todo.id),
    title: todo.title.trim() || 'Untitled task',
    completed: Boolean(todo.completed),
  }))
}


