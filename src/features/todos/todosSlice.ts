import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Todo, TodosState } from './types'

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
  page: 1,
  pageSize: 10,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<Todo, 'id'>> }>,
    ) => {
      const todo = state.todos.find((item) => item.id === action.payload.id)

      if (todo) {
        Object.assign(todo, action.payload.changes)
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { addTodo, updateTodo, deleteTodo, setPage } = todosSlice.actions

export default todosSlice.reducer

