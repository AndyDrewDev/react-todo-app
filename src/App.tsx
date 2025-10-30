
import { useState, type KeyboardEventHandler } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import './App.css'
import { useTodos } from './hooks/useTodos'
import type { Todo } from './store'

function App() {
  const {
    todos,
    completedCount,
    addTodo: addTodoToStore,
    toggleTodo: toggleTodoInStore,
    deleteTodo: deleteTodoFromStore,
  } = useTodos()
  const [title, setTitle] = useState('')

  const handleAddTodo = () => {
    const added = addTodoToStore(title)

    if (added) {
      setTitle('')
    }
  }

  const handleToggleTodo = (todo: Todo) => {
    toggleTodoInStore(todo)
  }

  const handleDeleteTodo = (todo: Todo) => {
    deleteTodoFromStore(todo)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddTodo()
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Typography component="h1" variant="h4" textAlign="center">
              Todo List
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="New task"
                placeholder="Add a task"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTodo}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Add
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" textAlign="right">
              Completed: {completedCount} / {todos.length}
            </Typography>

            <List>
              {todos.map((todo) => (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="Delete" onClick={() => handleDeleteTodo(todo)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleToggleTodo(todo)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={todo.title}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.disabled' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
              {todos.length === 0 && (
                <ListItem>
                  <ListItemText primary="The task list is empty. Add the first task!" />
                </ListItem>
              )}
            </List>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
