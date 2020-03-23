import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form, Button, Select, Rate, DatePicker } from 'antd';
import { UPLOAD_REVIEW_REQUEST } from '../reducers/review';

const ReviewForm = () => {
    const { Option } = Select;
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(3);
    const [content, setContent] = useState('');

    const onChangeCategory = useCallback((e) => {
        setCategory(e);
    }, [category]);
    

    //DatePicker
    const onChangeDateTime = useCallback((date, dateString) => {
        setDateTime(dateString);
    }, [dateTime]);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, [title]);

    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, [content]);

    //별점 매기기
    const desc = ['최악', '별로', '무난', '좋음', '아주 좋음'];
    
    const onChangeRating = useCallback((value) => {
        setRating(value);
    }, [rating]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : UPLOAD_REVIEW_REQUEST,
            data : {
                category : category,
                date : dateTime,
                title : title,
                rating : rating,
                content : content
            }
        });
    }, [category, dateTime, title, rating, content]);

    return (
        <>
        <Form style={{ margin: '10px 10px 20px' }} encType="multipart/form-data" onSubmitCapture={onSubmit} >
            <Form.Item required>
                <Select defaultValue="카테고리" style={{ width: 120 }} onChange={onChangeCategory}>
                    <Option value="movie" name="movie">영화</Option>
                    <Option value="drama" name="drama">드라마</Option>
                    <Option value="musical" name="musical">뮤지컬</Option>
                    <Option value="play" name="play">연극</Option>
                    <Option value="concert" name="concert">공연</Option>
                </Select>
            </Form.Item>
            <Form.Item required>
                <DatePicker placeholder="날짜" name="dateTime" onChange={onChangeDateTime} />
            </Form.Item>
            <Form.Item required>
                <Input placeholder="제목" name="title" value={title} onChange={onChangeTitle} />
            </Form.Item>
            <Form.Item required>
            <span>
                <Rate tooltips={desc} onChange={onChangeRating} name="rating" value={rating} />
                {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
            </span>
            </Form.Item>
            <Form.Item required>
                <Input.TextArea placeholder="내용" name="content" style={{height:'300px'}} value={content} onChange={onChangeContent} />
            </Form.Item>
            <Form.Item>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit">기록</Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default ReviewForm;