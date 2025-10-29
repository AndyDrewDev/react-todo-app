import {
  combineReducers,
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
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

export type Todo = {
  id: string
  title: string
  completed: boolean
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => action.payload,
  },
})

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
})

type RootReducerState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  storage,
  whitelist: ['todos'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
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

export const { setTodos } = todosSlice.actions
export const todosReducer = todosSlice.reducer
export const selectTodos = (state: RootState) => state.todos

