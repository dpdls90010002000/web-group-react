import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#fff',       // Light gray
      main: '#000',        // Black
      dark: '#ccc',        // Dark gray
      contrastText: '#fff', // White
    },
    secondary: {
      light: '#ccc',       // Light gray
      main: '#000',        // Black
      dark: '#888',        // Dark gray
      contrastText: '#fff', // White
    },
    openTitle: '#000',      // Black
    protectedTitle: '#000',  // Black
    type: 'light',          // Light theme
  },
});

export default theme;
