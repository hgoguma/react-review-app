import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST } from '../reducers/movie';
import styled from 'styled-components';

const Movie = ({id}) => {

    // background-Image: ${backdropPath => `url(https://image.tmdb.org/t/p/w500${backdropPath}) center no-repeat`};
    //backdropPath={data.backdrop_path}
    //background-image: url('https://image.tmdb.org/t/p/w500/pbOOOT0ASXjP4aJZr5NyOjK9qix.jpg');


    const { data, genres } = useSelector(state => state.movie);
    


    return (
        <div>
            <div style={ { backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat', 
                            height: '400px',
                            width: '100%',
                            opacity : 0.7,
                            } }>
            </div>
            <span> 장르 : {genres.map(v => (
            <span>{v.name} || </span>
                ))}
            </span>
            <p>{data.overview}</p>
            <p>{data.release_date}</p>
            <p>{data.title}</p>
            <p>{data.tagline}</p>
            <p>{data.vote_average}</p>
            <p>{data.backdrop_path}</p>
            <p>{data.tagline}</p>
        </div>
    );
}

Movie.getInitialProps = async (context) => {
    //console.log('무비 getInitialProps', context.query.id);
    context.store.dispatch({
        type: LOAD_MOVIE_REQUEST,
        data: context.query.id,
    });
    return { id : parseInt(context.query.id, 10) }
};

Movie.propTypes = {
    id: PropTypes.number.isRequired,
}

export default Movie;