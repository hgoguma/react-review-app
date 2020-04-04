import React from 'react';
import { Card, Avatar, Rate } from 'antd';
import PropTypes from 'prop-types';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ReviewCard = ( { review } ) => {
    return (
        <Card style={{margin:'30px'}}
            actions={[
                <LikeOutlined key="like" />,
                <MessageOutlined key="message" />,  
            ]}
        >
            <Card.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={review.title}
            description={<div> <p>{review.createdAt}</p> 
            <p><Rate disabled defaultValue={review.rating} /> </p>
            <p> {review.content} </p> 
            </div> }
            />
        </Card>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.object.isRequired,
}

export default ReviewCard;