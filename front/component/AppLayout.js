import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, Modal, Form, Button, Input, Row, Col } from 'antd';

const AppLayout = ({children}) => {

    const { isLoggedIn, me } = useSelector(state => state.user);
    
    return (
        <div>
            <Menu
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key="main"><Link href="/"><a>Main</a></Link></Menu.Item>
                {
                    !isLoggedIn && 
                    (
                        <Menu.Item key="login" style={{ float : 'right'}}><Link href="/login"><a>로그인</a></Link></Menu.Item>
                    )
                }
                {
                    !isLoggedIn && 
                    (
                        <Menu.Item key="signUp" style={{ float : 'right'}} ><Link href="/signUp"><a>회원가입</a></Link></Menu.Item>
                    )
                }
                { 
                    isLoggedIn && 
                    <Menu.Item key="myPage" style={{ float : 'right'}}><Link href="/myPage"><a>마이페이지</a></Link></Menu.Item>
                }
            </Menu>
            
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