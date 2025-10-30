import type { PropsWithChildren } from 'react'
import { Container, Paper, Stack, Typography } from '@mui/material'

type LayoutProps = PropsWithChildren<{
  title?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  spacing?: number
  gutterY?: number
}>

export const Layout = ({
  children,
  title,
  maxWidth = 'sm',
  spacing = 3,
  gutterY = 8,
}: LayoutProps) => {
  return (
    <Container component="main" maxWidth={maxWidth} sx={{ py: gutterY }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={spacing}>
          {title ? (
            <Typography component="h1" variant="h4" textAlign="center">
              {title}
            </Typography>
          ) : null}
          {children}
        </Stack>
      </Paper>
    </Container>
  )
}

export default Layout

