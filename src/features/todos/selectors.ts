import type { RootState } from '../../store'

export const selectTodosState = (state: RootState) => state.todos

export const selectTodos = (state: RootState) => selectTodosState(state).todos

export const selectTodosStatus = (state: RootState) => selectTodosState(state).status

export const selectTodosError = (state: RootState) => selectTodosState(state).error

export const selectTodosPage = (state: RootState) => selectTodosState(state).page

export const selectTodosPageSize = (state: RootState) => selectTodosState(state).pageSize

