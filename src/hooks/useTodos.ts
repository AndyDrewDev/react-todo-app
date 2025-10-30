import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  selectTodos,
  updateTodo as updateTodoAction,
} from '../store'
import type { AppDispatch, Todo } from '../store'

const createTodo = (title: string): Todo => ({
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36),
  title,
  completed: false,
})

export const useTodos = () => {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch<AppDispatch>()

  const completedCount = todos.filter((todo) => todo.completed).length

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

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteTodoAction(todo.id))
  }

  return {
    todos,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}


