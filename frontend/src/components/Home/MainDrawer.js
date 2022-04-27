import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ImageIcon from '@mui/icons-material/Image';
import { Typography } from '@mui/material';

class MainDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    _handleClickOpen = () => {
        this.setState({ open: true });
    };

    _handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={this._handleClickOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor='left'
                    open={this.state.open}
                    onClose={this._handleClose}
                >
                    <Box sx={{ width: 250 }}>
                        <Typography sx={{ ...styles.title }}>Eelbot Config 🌊</Typography>
                        <Divider />
                        <List>
                            <ListItemButton key={'Jokes'}>
                                <ListItemIcon>
                                    <TheaterComedyIcon />
                                </ListItemIcon>
                                <ListItemText primary='Jokes' />
                            </ListItemButton>

                            <ListItemButton key='Images'>
                                <ListItemIcon>
                                    <ImageIcon />
                                </ListItemIcon>
                                <ListItemText primary='Images' />
                            </ListItemButton>

                            <ListItemButton key='Taunts'>
                                <ListItemIcon>
                                    <VolumeUpIcon />
                                </ListItemIcon>
                                <ListItemText primary='Taunts' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Drawer>
            </div>
        )
    }
}

const styles = {
    title: {
        fontSize: 22,
        p: 1,
    },
};

export default MainDrawer