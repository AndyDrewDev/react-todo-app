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
  maxWidth = 'md',
  spacing = 3,
  gutterY = 8,
}: LayoutProps) => {
  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      disableGutters
      sx={{
        py: gutterY,
        width: '100%',
        px: { xs: 2, sm: 8, md: 12 },
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Stack spacing={spacing} >
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

