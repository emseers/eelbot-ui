import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Divider } from '@mui/material';
import SearchBar from './SearchBar'

class ItemSearchCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title="Search for an Item"
                />
                <Divider variant="middle" />
                <CardContent>
                    <SearchBar />
                </CardContent>
            </Card>
        );
    }
}

export default ItemSearchCard;