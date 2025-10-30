import { memo } from 'react'
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Todo } from '../features/todos/types'

export type TodoItemProps = {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (id: string) => void
}

export const TodoItem = memo(({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="Delete" onClick={() => onDelete(todo.id)}>
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
          onChange={() => onToggle(todo)}
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
  )
})

TodoItem.displayName = 'TodoItem'

export default TodoItem

