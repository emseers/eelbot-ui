import React, { Component } from "react";
import MainHeader from "./MainHeader";
import MainContent from "./MainContent"
import Grid from '@mui/material/Grid';
import JokeService from "../../services/jokes";

class Home extends Component {

    static initialState = { jokes: [], index: 1, loading: false };

    constructor(props) {
        super(props);
        this.state = { jokes: [], index: 1, loading: false };
    }

    componentDidMount() {
        JokeService.getPage(9, this.state.index).then((jokes) => { this.setState({ jokes: jokes }) });
    }

    _reloadJokes = () => {
        JokeService.getPage(9, 1).then((jokes) => { this.setState({ jokes: jokes }); this.setState({ index: 1 }); });
    }

    _handleLoadMore = () => {
        this.setState({ loading: true }); // disables the button to prevent mutliple requests
        JokeService.getPage(9, this.state.index + 1).then((jokes) => {
            this.setState({ jokes: [...this.state.jokes, ...jokes] });
            this.setState({ index: this.state.index + 1 });
            this.setState({ loading: false }); // reenable the button after successful response
        });
    }

    _handleDeleteJoke = (id) => {
        JokeService.del(id).then((success) => { 
            //this.setState({ jokes: this.state.jokes.filter(joke => { return joke.JokeID != id }) }); wait until api cursor is available
            this._reloadJokes(); // for now just re-request jokes
        });
    }

    _handleCreateJoke = (joke) => {
        JokeService.create([joke.JokeText, joke.JokeTextLine2]).then((success) => { 
            //this.setState({ jokes: this.state.jokes.filter(joke => { return joke.JokeID != id }) }); wait until api cursor is available
            this._reloadJokes(); // for now just re-request jokes
        });
    }

    _handleEditJoke = (joke) => {
        JokeService.put(joke.JokeID, [joke.JokeText, joke.JokeTextLine2]).then((success) => {
            this._reloadJokes(); // for now just re-request jokes
        });
    }

    render() {
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item><MainHeader onCreateJoke={this._handleCreateJoke}/></Grid>
                <Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <MainContent jokes={this.state.jokes} onLoadMore={this._handleLoadMore} loading={this.state.loading} onDeleteJoke={this._handleDeleteJoke} onEditJoke={this._handleEditJoke}/>
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>
            </Grid>
        )
    }
}

export default Home