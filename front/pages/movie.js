import React, { useState, useCallback } from 'react';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST, LOAD_MOVIE_CAST_REQUEST, LOAD_SIMILAR_MOVIE_REQUEST } from '../reducers/movie';
import styled from 'styled-components';
import Cast from '../component/Cast';
import SimliarMovie from '../component/SimilarMovie';
import ReviewForm from '../component/ReviewForm';
import ReviewCard from '../component/ReviewCard';
import { LOAD_REVIEW_REQUEST } from '../reducers/review';
import { HeartFilled } from '@ant-design/icons';


const Container = styled.div`

`;
const Background = styled.div`
    height: 500px;
    position: relative;
    z-index: 1;

    &::after {
        position: absolute;
        content: '';
        background-image: url(https://image.tmdb.org/t/p/original${props => props.path}),
            linear-gradient(to right, rgba(2.75%, 6.67%, 10.20%, 1.00) 150px, rgba(14.12%, 20.78%, 27.06%, 0.84) 100%);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.5;
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

const MovieInfo = styled.div`
    margin-top: 50px;

    & section h1 {
    }
`;
const Review = styled.div`
    margin: 50px;

    & h2 {
        margin-left: 50px;
    }
`;



const Movie = ({id}) => {

    const { data, cast, similar } = useSelector(state => state.movie);
    const { reviews, hasMoreReviews } =  useSelector(state => state.review);

    const [reviewFormOpen, setReviewFormOpen] = useState(false);

    const onToggleReview = useCallback(() => {
        setReviewFormOpen(prev => !prev);
    }, []);

    return (
        <Container>
            <Background path={data.backdrop_path}>
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col xs={24} md={8}>
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
                    </Col>
                    <Col xs={24} md={12}>
                        <MovieInfo>
                            <section>
                                <h1><b>{data.title}&nbsp;&nbsp;</b><Button shape="circle" icon={ <HeartFilled /> } /></h1>
                                <p> 장르 : 
                                    { data.genres && data.genres.map((v) => {
                                    return ( <span>{v.name}, </span> )  
                                })}
                                </p>
                                <span>{data.release_date}</span>
                                <span>평점 : {data.vote_average}</span>
                                <p>{data.tagline}</p>
                                <p>{data.overview}</p>
                                <p><a style={{color: 'black'}}>공식 홈페이지 {data.homepage}</a></p>
                                <p>러닝 타임 : {data.runtime}</p>
                            </section>
                        </MovieInfo>
                    </Col>
                </Row>
            </Background>
            <Cast cast={cast} />
            <SimliarMovie similar={similar} />
            <Review>
                <h2>후기</h2>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <Col xs={24} md={4}></Col>
                    <Col xs={24} md={16}>
                    {
                        reviews && reviews.map((v) => {
                            return (
                            <ReviewCard key={v.id} review={v} />
                            )
                        })
                    }
                    <Button onClick={onToggleReview}>후기 작성</Button>
                        { reviewFormOpen && 
                        (
                            <ReviewForm />
                        )}
                    </Col>
                    <Col xs={24} md={4}></Col>                    
                </Row>
            </Review>
        </Container>
    );
}

Movie.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MOVIE_REQUEST,
        data: context.query.id,
    });
    context.store.dispatch({
        type: LOAD_MOVIE_CAST_REQUEST,
        data: context.query.id,
    });
    context.store.dispatch({
        type: LOAD_SIMILAR_MOVIE_REQUEST,
        data: context.query.id,
    });
    context.store.dispatch({
        type: LOAD_REVIEW_REQUEST,
        data: context.query.id,
    });

    return { id : parseInt(context.query.id, 10) }
};

Movie.propTypes = {
    id: PropTypes.number.isRequired,
}

export default Movie;