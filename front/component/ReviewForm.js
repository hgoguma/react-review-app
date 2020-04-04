import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, Rate } from 'antd';
import { UPLOAD_REVIEW_REQUEST } from '../reducers/review';

const ReviewForm = () => {
    const movie = useSelector(state => state.movie);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(3);
    const [content, setContent] = useState('');


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
                movieId : movie.data.id,
                title : title,
                rating : rating,
                content : content,
            }
        });
    }, [movie.data.id, title, rating, content]);

    return (
        <>
        <Form style={{ margin: '10px 10px 20px' }} onSubmitCapture={onSubmit} >
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
                <Button type="primary" style={{ textAlign: 'center' }} htmlType="submit">작성</Button>
            </Form.Item>
        </Form>
        </>
    );
};

ReviewForm.propTypes = {
    movieId: PropTypes.number.isRequired,
}

export default ReviewForm;