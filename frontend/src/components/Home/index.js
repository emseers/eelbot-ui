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

    async componentDidMount() {
        const jokes = await JokeService.getPage(9, this.state.index);
        this.setState({ jokes: jokes });
        console.log(this.state.jokes)
    }

    _reloadJokes = async () => {
        const jokes = await JokeService.getPage(9, 1);
        this.setState({ jokes: jokes });
        this.setState({ index: 1 });

    }

    _handleLoadMore = async () => {
        this.setState({ loading: true }); // disables the button to prevent mutliple requests

        const newJokes = await JokeService.getPage(9, this.state.index + 1);
        this.setState({ jokes: [...this.state.jokes, ...newJokes] });
        this.setState({ index: this.state.index + 1 });
        this.setState({ loading: false }); // reenable the button after successful response
    }

    _handleDeleteJoke = async (id) => {
        await JokeService.del(id);
        // TODO: reflect state with deleted joke (need api cursor for this)
        this._reloadJokes();
    }

    _handleCreateJoke = async (joke) => {
        await JokeService.create([joke.JokeText, joke.JokeTextLine2]);
        // TODO: reflect state with new joke (need api cursor for this)
        this._reloadJokes();
    }

    _handleEditJoke = async (joke) => {
        await JokeService.put(joke.JokeID, [joke.JokeText, joke.JokeTextLine2]);
        this._reloadJokes();
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