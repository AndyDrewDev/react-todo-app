import {
  Pagination,
  Select,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { clampPage, getTotalPages } from '../utils/pagination'

export type PaginationControlsProps = {
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  disabled?: boolean
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100]

export const PaginationControls = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: PaginationControlsProps) => {
  const totalPages = getTotalPages(totalItems, pageSize)
  const safePage = clampPage(page, totalPages)

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value)
  }

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number
    onPageSizeChange?.(newPageSize)
  }

  const shouldShowPageSize = totalItems > 10 && onPageSizeChange

  if (totalPages <= 1 && !shouldShowPageSize) {
    return null
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={3}
      sx={{ flexWrap: 'wrap', gap: 2 }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent={totalPages > 1 ? 'space-between' : 'flex-end'}
        spacing={2}
        sx={{ width: '100%' }}
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={safePage}
            onChange={handlePageChange}
            disabled={disabled}
            color='primary'
            shape='rounded'
            showFirstButton={false}
            showLastButton={false}
          />
        )}

        {shouldShowPageSize && (
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel id='page-size-label'>Items per page</InputLabel>
            <Select
              labelId='page-size-label'
              value={pageSize}
              label='Items per page'
              onChange={handlePageSizeChange}
              disabled={disabled}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
    </Stack>
  )
}

export default PaginationControls
