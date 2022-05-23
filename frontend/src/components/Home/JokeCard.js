import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grid, Button, CardHeader } from '@mui/material';
import EditJokeDialog from './EditJokeDialog';

class JokeCard extends Component {
    constructor(props) {
        super(props);
    }

    _handleDelete = () => {
        this.props.onDelete(this.props.id);
    };

    _handleEditJoke = (joke) => {
        this.props.onEdit(joke);
    };

    render() {
        const { id, leadup, punchline } = this.props;

        return (
            <Card>
                <CardHeader
                    title={'Joke#' + id}
                />
                <CardContent sx={{ ...styles.card }}>
                    <Typography sx={{ ...styles.title }} color="textSecondary" gutterBottom>
                        {leadup}
                    </Typography>
                    <Typography sx={{ ...styles.title }} color="textSecondary" gutterBottom>
                        {punchline}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button size="small" color="error" onClick={this._handleDelete}>Delete</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <EditJokeDialog leadup={leadup} punchline={punchline} id={id} onEditJoke={this._handleEditJoke}/>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        );
    }
}

const styles = {
    title: {
        fontSize: 14,
        textOverflow: "ellipsis",
    },
    card: {
        height: 100,
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
};

export default JokeCard;