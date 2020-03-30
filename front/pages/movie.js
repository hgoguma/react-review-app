import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST } from '../reducers/movie';

const Movie = ({id}) => {

    const { data } = useSelector(state => state.movie);

    return (
        <div>
            {/* <span>장르 : {data.genres.map(v => (
                <span>{v.name} || </span>
            ))}</span> */}
            <p>{data.overview}</p>
            <p>{data.release_date}</p>
            <p>{data.title}</p>
            <p>{data.tagline}</p>
            <p>{data.vote_average}</p>
            <p>{data.backdrop_path}</p>

        </div>
    )
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