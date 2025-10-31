import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Todo, TodosState } from './types'
import { fetchTodos as fetchTodosApi } from '../../api/todosApi'

export const fetchTodos = createAsyncThunk<
  Todo[],
  void
>('todos/fetchTodos', async () => {
    const todos = await fetchTodosApi()
    return todos
})

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
      state.todos.unshift(action.payload)
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
    deleteAllTodos: (state) => {
      state.todos = []
      state.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      // Reset to page 1 when page size changes
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load todos.'
      })
  },
})

export const { addTodo, updateTodo, deleteTodo, deleteAllTodos, setPage, setPageSize } = todosSlice.actions

export default todosSlice.reducer

