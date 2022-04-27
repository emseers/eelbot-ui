import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grid, Button, CardHeader } from '@mui/material';

class JokeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, leadup, punchline } = this.props;

        return (
            <Card>
                <CardHeader
                    title={'Joke#' + id}
                />
                <CardContent>
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
                            <Button size="small" color="error">Delete</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="small" color="secondary">Edit</Button>
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
    }
};

export default JokeCard;