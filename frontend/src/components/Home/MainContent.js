import React, { Component } from 'react';
import JokeCard from "./JokeCard"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ItemSearchCard from './ItemSearchCard';

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    _createJokeCards() {
        if (!this.props.jokes) return null;

        return this.props.jokes.map(joke => {
            return (
                <Grid item xs={12} sm={4} key={joke.JokeID}>
                    <JokeCard id={joke.JokeID} leadup={joke.JokeText} punchline={joke.JokeTextLine2} onDelete={this._handleDeleteJoke} onEdit={this._handleEditJoke} />
                </Grid>
            );
        })
    }

    _handleLoadMore = () => {
        this.props.onLoadMore();
    };

    _handleDeleteJoke = (id) => {
        this.props.onDeleteJoke(id);
    }

    _handleEditJoke = (joke) => {
        this.props.onEditJoke(joke);
    }

    render() {

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ItemSearchCard />
                </Grid>
                {this._createJokeCards()}
                <Grid item xs={12}>
                    <Button color="secondary" onClick={this._handleLoadMore} disabled={this.props.loading}>Load More</Button>
                </Grid>
            </Grid>
        );
    }
}

export default MainContent