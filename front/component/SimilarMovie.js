import React from 'react';
import { Row, Card, List } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    margin: 50px;

    & h2 {
        margin-left: 50px;
    }
`;

const SimliarMovie = ( {similar} ) => {
    return (
        <Container>
            <h2>비슷한 영화</h2>
            <Row justify="center">
                <List
                    dataSource={similar}
                    grid={{ gutter: 8, column: 6 }}
                    renderItem ={ item => (
                            <List.Item key={item.id}>
                                <Card
                                    hoverable
                                    style={{ width: '200px', margin:'20px'}}
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
        </Container>
    );
};

SimliarMovie.propTypes = {
    similar: PropTypes.object.isRequired,
}

export default SimliarMovie;