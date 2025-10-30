import { Button, Stack, Typography } from '@mui/material'
import { clampPage, getTotalPages } from '../utils/pagination'

export type PaginationControlsProps = {
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const PaginationControls = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  disabled = false,
}: PaginationControlsProps) => {
  const totalPages = getTotalPages(totalItems, pageSize)
  const safePage = clampPage(page, totalPages)

  const handlePrevious = () => {
    if (safePage > 1) {
      onPageChange(safePage - 1)
    }
  }

  const handleNext = () => {
    if (safePage < totalPages) {
      onPageChange(safePage + 1)
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={2}
    >
      <Button
        variant='outlined'
        onClick={handlePrevious}
        disabled={disabled || safePage <= 1}
      >
        Previous
      </Button>
      <Typography variant='body2' color='text.secondary'>
        Page {safePage} of {totalPages}
      </Typography>
      <Button
        variant='outlined'
        onClick={handleNext}
        disabled={disabled || safePage >= totalPages}
      >
        Next
      </Button>
    </Stack>
  )
}

export default PaginationControls
