import { List, ListItem, ListItemText } from '@mui/material'
import type { Todo } from '../features/todos/types'
import { TodoItem } from './TodoItem'

export type TodoListProps = {
  todos: Todo[]
  onToggle: (todo: Todo) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
  emptyStateText?: string
}

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  emptyStateText,
}: TodoListProps) => {
  if (!todos.length) {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary={
              emptyStateText ?? 'The task list is empty. Add the first task!'
            }
            sx={{ textAlign: 'center' }}
          />
        </ListItem>
      </List>
    )
  }

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </List>
  )
}

export default TodoList
