import React from 'react';
import { Card, Avatar } from 'antd';
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
            description={<div>{review.content} || {review.createdAt} </div>}
            />
        </Card>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.object.isRequired,
}

export default ReviewCard;