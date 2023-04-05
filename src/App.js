import './App.css';
import Carlist from './components/Carlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist></Carlist>
    </div>
  );
}

export default App;