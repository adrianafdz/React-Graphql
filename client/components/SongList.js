import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs'

class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables: { id: id }
            //refetchQueries: [{ query: query }]
        })
        .then(() => this.props.data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(({id, title}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>{title}</Link>
                    <i 
                        className="material-icons"
                        onClick={() => {
                            this.onSongDelete(id)
                        }}
                    >delete</i>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return (<div>Loading...</div>)
        }

        return (
            <div className="container">
                <div className="collection">
                    {!this.props.data.loading && this.renderSongs()}
                </div>
                <Link 
                to="/songs/new"
                className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);