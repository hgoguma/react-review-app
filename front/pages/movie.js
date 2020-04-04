import React from 'react';
import { Row, Col, Card, List, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LOAD_MOVIE_REQUEST, LOAD_MOVIE_CAST_REQUEST, LOAD_SIMILAR_MOVIE_REQUEST } from '../reducers/movie';
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

const Cast = styled.div`
    margin: 50px;
`;

const Similar = styled.div`
    margin: 50px;
`;

const Review = styled.div`
    margin: 50px;
`;



const Movie = ({id}) => {

    const { data, cast, similar } = useSelector(state => state.movie);

    return (
        <Container>
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
                    <List
                        dataSource={cast.cast}
                        grid={{ gutter: 8, column: 6 }}
                        // loadMore={<Button style={{width:'100%'}} >더 보기</Button>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Card
                                    hoverable
                                    style={{ width: 150, margin:'20px'}}
                                    cover={<img alt={item.name} src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} />}
                                >
                                    <Card.Meta 
                                        style={{ textAlign:'center'}}
                                        title={item.name}
                                        description={item.character} 
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </Cast>
            <Similar>
                <h2>비슷한 영화</h2>
                <Row>
                    <List
                        dataSource={similar.results}
                        grid={{ gutter: 8, column: 6 }}
                        renderItem ={ item => (
                                <List.Item key={item.id}>
                                    <Card
                                        hoverable
                                        style={{ width: '150px', margin:'20px'}}
                                        cover={<img alt={item.title} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
                                                style={{ width: '100%', height: '100%' }} />}
                                    >
                                        <Card.Meta 
                                            style={{ textAlign:'center'}}
                                            title={item.title}
                                            description={`평점 : ${item.vote_average}`}
                                        />
                                    </Card>
                                </List.Item>
                            )
                        }
                    />                    
                </Row>
            </Similar>
            <Review>
                <h2>후기</h2>
                <Button>후기 작성</Button>
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
    return { id : parseInt(context.query.id, 10) }
};

Movie.propTypes = {
    id: PropTypes.number.isRequired,
}

export default Movie;