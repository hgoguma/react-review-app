import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import { LOAD_MAIN_MOVIE_REQUEST } from '../reducers/movie';


const Main = () => {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.movie);
    useEffect(() => {
        dispatch({
            type : LOAD_MAIN_MOVIE_REQUEST,
        });
    }, []);

    // const onClickMovie = useCallback(id => () => {
    //     console.log('아이디는?', id);
    //     Router.push('/movie');
    // }, []);
//     const Background = styled.div`
//     background-size: cover;
//     background-position: center center;
//     background-repeat: no-repeat,
//     height: 400px;
//     width: 100%;
//     opacity : 0.7;
// `;

    return (
        <>  
        <div style={{textAlign:'center', marginTop:'10px'}}>
            <h1>트렌드 영화</h1>
            <h3>지난 일주일간 트렌드에 오른 영화를 확인해보세요</h3>
        </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24}} justify='center' style={{marginTop:'20px'}} around="xs">
                    {data.map(v => (
                        <Col xs={24} md={6}>
                        <Link href={{pathname: '/movie', query: { id : v.id }}} as={`/movie/${v.id}`} key={v.id}>
                        <a>
                            <Card
                                key={v.id}
                                hoverable
                                style={{ width: 320, margin:'20px'}}
                                cover={<img alt={v.title} src={`https://image.tmdb.org/t/p/w500/${v.backdrop_path}`} />}
                            >
                                <Card.Meta 
                                    style={{ textAlign:'center'}}
                                    title={v.title} 
                                    description={`평점 : ${v.vote_average}`} />
                            </Card>
                        </a>
                        </Link>
                        </Col>
                    ))}
            </Row>
        </>
    )
}

export default Main;