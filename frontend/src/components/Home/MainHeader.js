import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MainDrawer from './MainDrawer';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <MainDrawer></MainDrawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eelbot Database
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}