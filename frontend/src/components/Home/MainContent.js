import React, { Component } from 'react';
import ItemCard from "./ItemCard"
import Grid from '@mui/material/Grid';
import ItemSearchCard from './ItemSearchCard';

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        const testItem = {
            "id": "123",
            "type": "joke",
            "payload": { 'leadup': 'Why did the chicken cross the road?', 'punchline': 'To get to the other side'},
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ItemSearchCard/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemCard id={testItem.id} type={testItem.type} payload={testItem.payload}/>
                </Grid>
            </Grid>
        );
    }
}

export default MainContent