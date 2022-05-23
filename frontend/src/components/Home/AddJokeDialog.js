import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

class AddJokeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            leadup: '',
            punchline: '',
        };
    }

    _handleClickOpen = () => {
        this.setState({ open: true })
    };

    _handleClose = () => {
        this.setState({ open: false });
    };

    _handleSubmit = () => {
        const joke = {
            JokeText: this.state.leadup,
            JokeTextLine2: this.state.punchline,
        }
        this._handleClose();
        this.props.onCreateJoke(joke);
    }

    _handleLeadUpChange = (event) => {
        this.setState({
            leadup: event.target.value
        });
    }

    _handlePunchLineChange = (event) => {
        this.setState({
            punchline: event.target.value
        });
    }

    render() {
        return (
            <div>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="add"
                    sx={{ mr: 2 }}
                    onClick={this._handleClickOpen}
                >
                    <AddIcon />
                </IconButton>

                <Dialog open={this.state.open} onClose={this._handleClose}>
                    <DialogTitle>Add Joke</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add a new joke.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="leadup"
                            label="Leadup"
                            type="leadup"
                            fullWidth
                            variant="standard"
                            onChange={this._handleLeadUpChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="punchline"
                            label="Punch Line"
                            type="punchline"
                            fullWidth
                            variant="standard"
                            onChange={this._handlePunchLineChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleClose}>Cancel</Button>
                        <Button color="secondary" onClick={this._handleSubmit}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

export default AddJokeDialog