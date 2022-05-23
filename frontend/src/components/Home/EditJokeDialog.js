import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

class EditJokeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            leadup: this.props.leadup,
            punchline: this.props.punchline,
        };
    };

    _handleClickOpen = () => {
        this.setState({ open: true })
    };

    _handleClose = () => {
        this.setState({ open: false });
    };

    _handleSubmit = () => {
        const joke = {
            JokeID: this.props.id,
            JokeText: this.state.leadup,
            JokeTextLine2: this.state.punchline,
        }
        this._handleClose();
        this.props.onEditJoke(joke);
    };

    _handleLeadUpChange = (event) => {
        this.setState({
            leadup: event.target.value
        });
    };

    _handlePunchLineChange = (event) => {
        this.setState({
            punchline: event.target.value
        });
    };

    render() {
        return (
            <div>
                <Button size="small" color="secondary" onClick={this._handleClickOpen}>Edit</Button>

                <Dialog open={this.state.open} onClose={this._handleClose}>
                    <DialogTitle>Edit Joke#{this.props.id}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit this Joke.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="leadup"
                            label="Leadup"
                            type="leadup"
                            fullWidth
                            variant="standard"
                            defaultValue={this.props.leadup}
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
                            defaultValue={this.props.punchline}
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
    };
};

export default EditJokeDialog;