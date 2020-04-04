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

const Cast = ( {cast} ) => {
    return (
        <Container>
            <h2>주요 출연진</h2>
            <Row justify="center">
                <List
                    dataSource={cast}
                    grid={{ gutter: 8, column: 6 }}
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
        </Container>
    );
};

Cast.propTypes = {
    cast: PropTypes.object.isRequired,
}

export default Cast;