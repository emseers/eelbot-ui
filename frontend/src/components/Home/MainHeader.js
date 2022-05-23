import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddJokeDialog from './AddJokeDialog';
import MainDrawer from './MainDrawer';

class ButtonAppBar extends Component {
  _handleCreateJoke = (joke) => {
    this.props.onCreateJoke(joke);
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <MainDrawer></MainDrawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Eelbot Database
            </Typography>
            <AddJokeDialog onCreateJoke={this._handleCreateJoke} />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default ButtonAppBar