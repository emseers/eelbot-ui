import React, { Component } from 'react';
import JokeCard from "./JokeCard"
import Grid from '@mui/material/Grid';
import ItemSearchCard from './ItemSearchCard';

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // sample response from jokes endpoint
        const testJoke = {
            "id": "123",
            'leadup': 'Why did the chicken cross the road?',
            'punchline': 'To get to the other side',
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ItemSearchCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JokeCard id={testJoke.id} leadup={testJoke.leadup} punchline={testJoke.punchline} />
                </Grid>
            </Grid>
        );
    }
}

export default MainContent