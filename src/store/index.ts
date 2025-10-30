import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import todosReducer from '../features/todos/todosSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
})

type RootReducerState = ReturnType<typeof rootReducer>

// persist the todos state to Local Storage
const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  storage,
  whitelist: ['todos'],
}

// persist the root reducer to Local Storage
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // ignore the actions that are not serializable
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
  addTodo,
  updateTodo,
  deleteTodo,
  setPage,
  setPageSize,
  fetchTodos,
} from '../features/todos/todosSlice'

export {
  selectTodosState,
  selectTodos,
  selectTodosStatus,
  selectTodosError,
  selectTodosPage,
  selectTodosPageSize,
  selectCompletedCount,
} from '../features/todos/selectors'
export type { Todo, TodosState, TodosStatus } from '../features/todos/types'
