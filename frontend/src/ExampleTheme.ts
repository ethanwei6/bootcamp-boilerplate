import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50', // Green primary color
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#2196F3', // Blue secondary color
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#2196F3',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 700,
      color: '#333',
    },
    h2: {
      fontWeight: 600,
      color: '#333',
    },
    h3: {
      fontWeight: 600,
      color: '#333',
    },
    h4: {
      fontWeight: 600,
      color: '#333',
    },
    h5: {
      fontWeight: 600,
      color: '#333',
    },
    h6: {
      fontWeight: 700,
      color: '#333',
    },
    body1: {
      color: '#555',
    },
    body2: {
      color: 'rgba(0,0,0,0.65)'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
})

export default theme


