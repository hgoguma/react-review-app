import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Row, Col } from 'antd';
import styled from 'styled-components';
import { LOAD_MAIN_MOVIE_REQUEST } from '../reducers/movie';

const imagePath = "https://1ryzas42x65e2oosia40bgli-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/WBB-site-image-838x400.jpg";


const MoreBtn = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const movie = () => {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.movie);
    useEffect(() => {
        dispatch({
            type : LOAD_MAIN_MOVIE_REQUEST,
        });
    }, []);

    const onClickMovie = useCallback(id => () => {
        console.log('아이디는?', id);
    }, []);

    return (
        <>  
        <div>
            <h1 style={{textAlign:'center'}}>트렌드 영화</h1>
        </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24}} justify='center' style={{marginTop:'20px'}} around="xs">
                    {data.map(v => (
                        <Col xs={24} md={6}>
                        <Card
                            key={v.id}
                            hoverable
                            style={{ width: 320, margin:'20px'}}
                            cover={<img alt={v.title} src={`https://image.tmdb.org/t/p/w500/${v.backdrop_path}`} />}
                            onClick={onClickMovie(v.id)}
                        >
                            <Card.Meta 
                                style={{ textAlign:'center'}}
                                title={v.title} 
                                description={`평점 : ${v.vote_average}`} />
                        </Card>
                        </Col>
                    ))}
            </Row>
        </>
    )
}

export default movie;