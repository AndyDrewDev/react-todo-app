
import { useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import './App.css'
import { Layout, PaginationControls, TodoForm, TodoList } from './components'
import { useTodos } from './hooks/useTodos'
import type { Todo } from './store'
import { clampPage, getTotalPages, paginate } from './utils'

function App() {
  const {
    todos,
    completedCount,
    addTodo: addTodoToStore,
    toggleTodo: toggleTodoInStore,
    deleteTodo: deleteTodoFromStore,
    page,
    pageSize,
    setPage,
    setPageSize,
  } = useTodos()
  const [title, setTitle] = useState('')

  const totalItems = todos.length
  const totalPages = getTotalPages(totalItems, pageSize)
  // clamp the page number to the total number of pages to avoid out of bounds
  const safePage = clampPage(page, totalPages)

  // update the page number if it is out of bounds
  useEffect(() => {
    if (safePage !== page) {
      setPage(safePage)
    }
  }, [page, safePage, setPage])

  const visibleTodos = useMemo(() => paginate(todos, safePage, pageSize), [todos, safePage, pageSize])

  const handleAddTodo = () => {
    const added = addTodoToStore(title)

    if (added) {
      setTitle('')
    }
  }

  const handleToggleTodo = (todo: Todo) => {
    toggleTodoInStore(todo)
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodoFromStore(id)
  }

  return (
    <Layout title="Todo List">
      <TodoForm value={title} onChange={setTitle} onSubmit={handleAddTodo} label="New task" placeholder="Add a task" submitLabel="Add" />

      <TodoList todos={visibleTodos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} emptyStateText="The task list is empty. Add the first task!" />
      
      {totalItems > 0 && (
        <Typography variant='body2' color='text.secondary' textAlign='center'>
          Completed: {completedCount} / {totalItems}
        </Typography>
      )}

      <PaginationControls 
        page={safePage} 
        pageSize={pageSize} 
        totalItems={totalItems} 
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Layout>
  )
}

export default App
