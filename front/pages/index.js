import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Input, Card, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { LOAD_REVIEW_REQUEST } from '../reducers/review';
import { HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import ReviewForm from '../component/ReviewForm';

const Main = () => {
    const disaptch = useDispatch();

    //리뷰 가져오기
    // useEffect(() => {
    //     disaptch({
    //         type : LOAD_REVIEW_REQUEST,
    //     });
    // }, [])


    return (
        <Row gutter={16} style={{marginTop:30}}>
            <Col span={8} >
                리뷰 남기기
                <ReviewForm />
            </Col>
            <Col span={8}>
                <Input.Search size="middle" placeholder="검색하세요" />
                <Card style={{marginTop:30}}
                    key="key"
                    cover=""
                    actions={[
                    <HeartOutlined />,
                    <MessageOutlined />,
                    <EllipsisOutlined />
                    ]}
                    title="제목"
                >
                    <Card.Meta
                    title="날짜"
                    description="내용"
                    />
                </Card>
            </Col>
            <Col span={8} />
        </Row>
    )
    
}

export default Main;