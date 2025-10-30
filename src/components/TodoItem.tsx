import { memo, useState, useCallback, useEffect, useRef } from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import type { Todo } from '../features/todos/types'

export type TodoItemProps = {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
}

export const TodoItem = memo(
  ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(todo.title)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, [isEditing])

    useEffect(() => {
      setEditTitle(todo.title)
    }, [todo.title])

    const handleStartEdit = useCallback(() => {
      setIsEditing(true)
      setEditTitle(todo.title)
    }, [todo.title])

    const handleSaveEdit = useCallback(() => {
      const trimmed = editTitle.trim()
      if (trimmed && trimmed !== todo.title) {
        onEdit(todo.id, trimmed)
      } else if (!trimmed) {
        setEditTitle(todo.title)
      }
      setIsEditing(false)
    }, [editTitle, todo.id, todo.title, onEdit])

    const handleCancelEdit = useCallback(() => {
      setEditTitle(todo.title)
      setIsEditing(false)
    }, [todo.title])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSaveEdit()
        } else if (event.key === 'Escape') {
          handleCancelEdit()
        }
      },
      [handleSaveEdit, handleCancelEdit]
    )

    return (
      <ListItem
        secondaryAction={
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isEditing ? (
              <>
                <IconButton
                  edge='end'
                  aria-label='Save'
                  onClick={handleSaveEdit}
                  color='primary'
                  sx={{
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                  }}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='Cancel'
                  onClick={handleCancelEdit}
                  sx={{
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                  }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  edge='end'
                  aria-label='Edit'
                  onClick={handleStartEdit}
                  sx={{
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                  }}
                >
                  <EditOutlinedIcon sx={{ color: 'primary.main' }} />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='Delete'
                  onClick={() => onDelete(todo.id)}
                  sx={{
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                  }}
                >
                  <DeleteOutlinedIcon sx={{ color: 'error.main' }} />
                </IconButton>
              </>
            )}
          </Box>
        }
      >
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            onChange={() => onToggle(todo)}
            disabled={isEditing}
          />
        </ListItemIcon>
        {isEditing ? (
          <TextField
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            variant='standard'
            sx={{ mr: 8 }}
          />
        ) : (
          <ListItemText
            primary={todo.title}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.disabled' : 'text.primary',
              cursor: 'pointer',
              pr: 8,
            }}
            onClick={handleStartEdit}
          />
        )}
      </ListItem>
    )
  }
)

TodoItem.displayName = 'TodoItem'

export default TodoItem
