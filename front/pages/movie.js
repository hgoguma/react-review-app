import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST, LOAD_MOVIE_CAST_REQUEST, LOAD_SIMILAR_MOVIE_REQUEST } from '../reducers/movie';
import styled from 'styled-components';

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

const Cast = styled.div`
    margin: 50px;
`;

const Movie = ({id}) => {

    const { data, cast, similar } = useSelector(state => state.movie);

    return (
        <div>
            <Background path={data.backdrop_path}>
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col xs={24} md={8}>
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{marginTop:'50px'}}>
                            <section>
                                <h1>{data.title}</h1>
                                <p> 장르 : 
                                    { data.genres && data.genres.map((v) => {
                                    return ( <span>{v.name} || </span> )  
                                })}
                                </p>
                                <span>{data.release_date}</span>
                                <span>평점 : {data.vote_average}</span>
                                <p>{data.tagline}</p>
                                <p>{data.overview}</p>
                                <p><a>공식 홈페이지 {data.homepage}</a></p>
                                <p>러닝 타임 : {data.runtime}</p>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Background>
            <Cast>
                <h2>주요 출연진</h2>
                <Row>
                    { cast.cast && cast.cast.map((v, i) =>  
                            (
                                <>
                                <Card
                                    key={v.id}
                                    hoverable
                                    style={{ width: 150, margin:'20px'}}
                                    cover={<img alt={v.name} src={`https://image.tmdb.org/t/p/w500/${v.profile_path}`} />}
                                >
                                    <Card.Meta 
                                        style={{ textAlign:'center'}}
                                        title={v.name}
                                        description={v.character} 
                                    />
                                </Card>
                                </>
                            )
                    ) }
                </Row>
            </Cast>
            <div>
                <h2>비슷한 영화</h2>
                <Row>
                    { similar.results && 
                    similar.results.map((v, i) =>  
                        (
                            <>
                            <Card
                                key={v.id}
                                hoverable
                                style={{ width: 150, margin:'20px'}}
                                cover={<img alt={v.title} src={`https://image.tmdb.org/t/p/w500/${v.poster_path}`} />}
                            >
                                <Card.Meta 
                                    style={{ textAlign:'center'}}
                                    title={v.title}
                                    description={`평점 : ${v.vote_average}`}
                                />
                            </Card>
                            </>
                        ) 
                        
                    )}
                </Row>

            </div>
        </div>
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
    return { id : parseInt(context.query.id, 10) }
};

Movie.propTypes = {
    id: PropTypes.number.isRequired,
}

export default Movie;