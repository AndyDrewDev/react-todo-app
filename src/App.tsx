import { useEffect, useMemo, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
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
    deleteAllTodos: deleteAllTodosFromStore,
    updateTodo: updateTodoInStore,
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

  const visibleTodos = useMemo(
    () => paginate(todos, safePage, pageSize),
    [todos, safePage, pageSize]
  )

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

  const handleEditTodo = (id: string, title: string) => {
    updateTodoInStore(id, { title })
  }

  const handleDeleteAllTodos = () => {
    if (window.confirm('Are you sure you want to delete all todos?')) {
      deleteAllTodosFromStore()
    }
  }

  return (
    <Layout title='Todo List'>
      <Stack spacing={2}>
        <TodoForm
          value={title}
          onChange={setTitle}
          onSubmit={handleAddTodo}
          label='New task'
          placeholder='Add a task'
          submitLabel='Add'
        />

        {totalItems > 0 && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='center'
            alignItems='stretch'
          >
            <Button
              variant='contained'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAllTodos}
              sx={{ py: 1, width: { xs: '100%', sm: 'auto' } }}
              size='small'
            >
              Clear all tasks
            </Button>
          </Stack>
        )}
      </Stack>

      <TodoList
        todos={visibleTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        emptyStateText='The task list is empty. Add the first task!'
      />

      <PaginationControls
        page={safePage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {totalItems > 0 && (
        <Typography variant='body2' color='text.secondary' textAlign='center'>
          Completed: {completedCount} / {totalItems}
        </Typography>
      )}
    </Layout>
  )
}

export default App
