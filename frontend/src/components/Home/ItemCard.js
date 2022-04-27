import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grid, Button, CardHeader, CardMedia } from '@mui/material';

class ItemCard extends Component {
    constructor(props) {
        super(props);
    }

    // is it a joke? an image? a taunt? return the appropriate card
    _resolveItemType = (type, payload) => {
        if (type === 'joke') {
            return (
                <div>
                    <Typography sx={{ ...styles.title }} color="textSecondary" gutterBottom>
                        {payload.leadup}
                    </Typography>
                    <Typography sx={{ ...styles.title }} color="textSecondary" gutterBottom>
                        {payload.punchline}
                    </Typography>
                </div>
            )
        }
    }


    render() {
        const { id, type, payload } = this.props;

        return (
            <Card>
                <CardHeader
                    title={type + '#' + id}
                />
                <CardContent>
                    {this._resolveItemType(type, payload)}
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
    },
    media: {
        height: '150px',
    },
};

export default ItemCard;