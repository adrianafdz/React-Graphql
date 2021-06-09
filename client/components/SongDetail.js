import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricsList from './LyricsList'
import { graphql } from '@apollo/client/react/hoc';

class SongDetail extends Component {
    render() {
        const { song } = this.props.data;

        if (!song) {
            return <div>Loading...</div>
        }

        return (
            <div className="container">
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricCreate songId={song.id}></LyricCreate>
                <LyricsList lyrics={song.lyrics}></LyricsList>
            </div>
        )
    }
}

export default graphql(query, {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
    }
})(SongDetail);