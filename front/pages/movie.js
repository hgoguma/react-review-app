import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST } from '../reducers/movie';
import styled from 'styled-components';


const Container = styled.div`
`;

const Background = styled.div`
    height: 500px;
    position: relative;
    z-index: 1;

    &::after {
        position: absolute;
        content: '';
        background-image: url(https://image.tmdb.org/t/p/original${props => props.path});
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        top: 0;
        bottom: 0;
        z-index: -1;
    }

    & img {
        height: 400px;
        margin-left: 100px;
        margin-top: 50px;
    }
`;

const Movie = ({id}) => {

    // background-Image: ${backdropPath => `url(https://image.tmdb.org/t/p/w500${backdropPath}) center no-repeat`};
    //backdropPath={data.backdrop_path}
    //background-image: url('https://image.tmdb.org/t/p/w500/pbOOOT0ASXjP4aJZr5NyOjK9qix.jpg');
    //    background-image: url(https://image.tmdb.org/t/p/original/pbOOOT0ASXjP4aJZr5NyOjK9qix.jpg), 



    const { data, genres } = useSelector(state => state.movie);
    


    return (
        <div>
        <Background path={data.backdrop_path}>
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col xs={24} md={12}>
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <div>
                        영화 정보
                        </div>
                    </Col>
                    
                    
                    
                </Row>
                    
            </Background>
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