import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  fetchTodos as fetchTodosThunk,
  selectTodosPage,
  selectTodosPageSize,
  updateTodo as updateTodoAction,
  selectTodos,
  selectCompletedCount,
  setPage as setPageAction,
  setPageSize as setPageSizeAction,
} from '../store'
import type { AppDispatch, Todo } from '../store'

const createTodo = (title: string): Todo => ({
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36),
  title,
  completed: false,
})

export const useTodos = () => {
  const todos = useSelector(selectTodos)
  const page = useSelector(selectTodosPage)
  const pageSize = useSelector(selectTodosPageSize)
  const completedCount = useSelector(selectCompletedCount)
  const dispatch = useDispatch<AppDispatch>()

  const addTodo = (title: string) => {
    const trimmed = title.trim()

    if (!trimmed) {
      return false
    }

    dispatch(addTodoAction(createTodo(trimmed)))

    return true
  }

  const toggleTodo = (todo: Todo) => {
    dispatch(
      updateTodoAction({
        id: todo.id,
        changes: {
          completed: !todo.completed,
        },
      }),
    )
  }

  const deleteTodo = (id: string) => {
    dispatch(deleteTodoAction(id))
  }

  const updateTodo = (id: string, changes: Partial<Omit<Todo, 'id'>>) => {
    dispatch(updateTodoAction({ id, changes }))
  }

  const loadTodos = () => {
    return dispatch(fetchTodosThunk())
  }

  const setPage = (value: number) => {
    dispatch(setPageAction(value))
  }

  const setPageSize = (value: number) => {
    dispatch(setPageSizeAction(value))
  }

  return {
    todos,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    loadTodos,
    page,
    pageSize,
    setPage,
    setPageSize,
  }
}


