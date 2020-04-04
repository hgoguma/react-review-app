import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Rate } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import 'moment-timezone';
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
            description={<div> 
                <p> <Moment date={review.createdAt} format="YYYY-MM-DD"> </Moment></p> 
                <p><Rate disabled defaultValue={ parseInt(review.rating) } /> </p>
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