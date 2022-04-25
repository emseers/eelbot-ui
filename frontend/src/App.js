import logo from './logo.svg';
import './App.css';
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
          <Home/>
      </div>
    </ThemeProvider>
  );
}

export default App;
