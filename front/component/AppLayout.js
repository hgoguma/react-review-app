import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, Modal, Form, Button, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { LOG_IN_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({children}) => {


    // const ModalContent = styled(Modal)`
    // .ant-modal-content {
    //     position: relative;
    //     background-color: #00000000 !important;
    //     border: 0;
    //     border-radius: 4px;
    //     background-clip: padding-box;
    //     box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
    // }
    // `
    const { isLoggedIn, logInErrorReason } = useSelector(state => state.user);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const showModal = () => {
        setVisible(true);
    }
    
    const handleCancel = () => {
        setVisible(false);
    };

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [email]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [password]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setConfirmLoading(true);
        dispatch({
            type : LOG_IN_REQUEST,
            data : {
                email : email,
                password : password
            }
        });
        //로그인 성공시에 모달창 끄기 & 로그인 실패시 alert 창 띄우기
        console.log('디스패치 완료!');
        console.log('로그인 되었니?'+isLoggedIn);
        setVisible(false);   
    }, [email, password, isLoggedIn]);
    
    return (
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
            >
                <Menu.Item key="main"><Link href="/"><a>Main</a></Link></Menu.Item>
                {
                    !isLoggedIn && 
                    (
                        <Menu.Item key="login">
                            <a href="#" onClick={showModal}>로그인</a>
                        </Menu.Item>
                    )
                }
                {
                    !isLoggedIn && 
                    (
                        <Menu.Item key="signUp"><Link href="/signUp"><a>회원가입</a></Link></Menu.Item>
                    )
                }
                { 
                    isLoggedIn && 
                    <Menu.Item key="myPage"><Link href="/myPage"><a>마이페이지</a></Link></Menu.Item>
                }
            </Menu>
            <Modal
                title="로그인"
                visible={visible}
                confirmLoading={confirmLoading}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    onSubmitCapture={onSubmit}
                    name="login"
                    >
                    <Form.Item
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: '이메일을 입력해주세요',
                        }
                    ]}
                    >
                    <Input name="email" required value={email} onChange={onChangeEmail} placeholder="이메일" />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: '비밀번호를 입력해주세요',
                        }
                    ]}
                    >
                    <Input name="password" required value={password} onChange={onChangePassword} placeholder="비밀번호" type="password" />
                    </Form.Item>
                    <Form.Item  style={{ justifyContent: 'center', alignItems: 'center'}} >
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/* {children} */}

            
                {children}

            {/* <Row gutter={10} style={{marginTop:50}}>
                <Col xs={24} md={6}>
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                </Col>
            </Row> */}
        </div>
    );
};

export default AppLayout;