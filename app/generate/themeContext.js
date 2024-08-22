import { createContext, useState, useMemo, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState('light')

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: 'linear-gradient(to right, #ffffff, #f5f5f5)',
              },
            }
          : {
              background: {
                default: 'linear-gradient(to right, #1c1c1c, #2c2c2c)',
              },
            }),
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? 'linear-gradient(to right, #ffffff, #f5f5f5)'
                : 'linear-gradient(to right, #1c1c1c, #2c2c2c)',
            },
          },
        },
      },
    }), 
  [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
