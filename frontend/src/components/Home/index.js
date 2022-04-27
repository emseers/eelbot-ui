import React, { Component } from "react";
import MainHeader from "./MainHeader";
import MainContent from "./MainContent"
import Grid from '@mui/material/Grid';

class Home extends Component {

    static initialState = { items: [] };

    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    render() {
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item><MainHeader /></Grid>
                <Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <MainContent />
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>
            </Grid>
        )
    }
}

export default Home