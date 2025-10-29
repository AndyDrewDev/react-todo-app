export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type TodosStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodosState = {
  todos: Todo[]
  status: TodosStatus
  error: string | null
  page: number
  pageSize: number
}

