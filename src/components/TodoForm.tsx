import { useCallback } from 'react'
import type { FormEvent } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { useTodos } from '../hooks/useTodos'

export type TodoFormProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  label?: string
  submitLabel?: string
  autoFocus?: boolean
}

export const TodoForm = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Add a task',
  label = 'New task',
  submitLabel = 'Add',
  autoFocus = false,
}: TodoFormProps) => {
  const { loadTodos, todos } = useTodos()
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} noValidate>
      {todos.length === 0 && (
        <Stack alignItems='center' pb={4}>
          <Button
            onClick={loadTodos}
            variant='contained'
            color='primary'
            size='large'
          >
            Load from API
          </Button>
        </Stack>
      )}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems='stretch'
      >
        <TextField
          fullWidth
          label={label}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ whiteSpace: 'nowrap' }}
        >
          {submitLabel}
        </Button>
      </Stack>
    </form>
  )
}
