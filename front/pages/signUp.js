import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input, Tooltip, Button, Card, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SIGN_UP_REQUEST, CHECK_EMAIL_REQUEST } from '../reducers/user';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const signUp = () => {
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
    };

    const dispatch = useDispatch();
    const { checkEmailResult } = useSelector(state => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');

    const MySwal = withReactContent(Swal);

    const onChangeEmail = useCallback((e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
        
    }, [email]);

    const onBlurEmail = useCallback((e) => {
        //중복 이메일 체크하기
        dispatch({
            type : CHECK_EMAIL_REQUEST,
            data : {
                email : e.target.value
            }
        });
        setEmail(e.target.value);
    }, [email]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [password]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
    }, [passwordCheck]);

    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, [nickname]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : SIGN_UP_REQUEST,
            data : {
                email : email,
                password : password,
                nickname : nickname
            }
        });

        //sweet alert 창 띄워주기?
        MySwal.fire({
            title: '회원가입',
            text : '회원가입이 완료되었습니다.',
            icon : 'success',
            confirmButtonText: '확인',
        }).then(() => { //메인 화면으로
            setTimeout(() => {
                Router.push('/');
            }, 1000);
        })        
    } ,[email, password, passwordCheck, nickname]);


    return (
        <Row gutter={10} style={{marginTop:50, minHeight: '50vh'}} >
            <Col xs={24} md={6}>
            </Col>
            <Col xs={24} md={12} type="flex" justify="center" align="center">
                <div className="site-card-border-less-wrapper">
                    <Card title="회원가입" bordered="false">
                        <Form
                        onSubmitCapture={onSubmit}
                        {...formItemLayout}
                        name="register"
                        >
                        <Form.Item
                        name="email"
                        label="이메일"
                        rules={[
                            {
                            required: true,
                            message: '이메일을 입력해주세요',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    var emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                                    if(emailRegExp.test(getFieldValue('email'))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('이메일이 형식에 맞지 않습니다.');
                                }
                            }),
                        ]}
                        >
                        <Input name="email" required value={email} onChange={onChangeEmail} onBlur={onBlurEmail} placeholder="이메일 입력" />
                        {
                            checkEmailResult && <div style={{color:'red'}}>중복된 이메일이 있습니다.</div>
                        }
                        </Form.Item>
                        <Form.Item
                        name="password"
                        label={
                            <span>
                            비밀번호&nbsp;
                            <Tooltip title="숫자와 문자를 포함해 6~12자 이내로 입력해주세요">
                                <QuestionCircleOutlined />
                            </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                            required: true,
                            message: '비밀번호를 입력해주세요',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    var regExp = /^[A-Za-z0-9]{6,12}$/;
                                    if(regExp.test(getFieldValue('password'))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('비밀번호가 형식에 맞지 않습니다.');
                                },
                            }),
                        ]}
                        >
                        <Input.Password required value={password} onChange={onChangePassword} placeholder="비밀번호 입력" />
                        </Form.Item>
                        <Form.Item
                        name="confirm"
                        label="비밀번호 재입력"
                        dependencies={['password']}
                        rules={[
                            {
                            required: true,
                            message: '비밀번호를 재입력해주세요',
                            },
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('비밀번호가 일치하지 않습니다.');
                            },
                            }),
                        ]}
                        >
                        <Input.Password required value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호 재입력" />
                        </Form.Item>
                        <Form.Item
                        name="nickname"
                        label="닉네임"
                        rules={[{ required: true, message: '닉네임을 입력해주세요', whitespace: true }]}
                        >
                        <Input required value={nickname} onChange={onChangeNickname} placeholder="닉네임 입력" />
                        </Form.Item>
                        <Form.Item  style={{ justifyContent: 'center', alignItems: 'center'}} >
                            <Button type="primary" htmlType="submit">
                                가입하기
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
            <Col xs={24} md={6}>
            </Col>
        </Row>
    )
}

export default signUp;