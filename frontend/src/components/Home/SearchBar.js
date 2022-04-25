import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Box } from '@mui/material';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Box sx={{ ...styles.box }}>
                <TextField sx={{ ...styles.text }} onChange={this._handleChange} id="outlined-basic" label="Search..." variant="outlined" />
                <Button
                    sx={{ ...styles.button }}
                    variant="contained"
                    color="secondary"
                    onClick={this._handleClick}
                    startIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </Box>

        );
    }
}

const styles = {
    box: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        flexGrow: 1,
    },
    button: {
        width: '100px',
        marginLeft: '8px',
    },
};

export default SearchBar;