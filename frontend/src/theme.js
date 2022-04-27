import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
    },
    background: {
      default: grey[100],
    },
  },  
});

export default theme