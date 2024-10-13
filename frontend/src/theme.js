// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 14, // Base font size
    h1: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem', // Smaller on mobile
      },
    },
    // h6 variant is used for the news title
    h6: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        lineHeight: 1.2, // Smaller line height
        fontSize: '1rem !important', // Smaller title on mobile
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem', // Smaller body font on mobile
      },
    },
    // Additional typography variants can be added here
  },
});

export default theme;
