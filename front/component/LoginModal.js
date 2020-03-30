import React, { useState, useCallback, useEffect } from 'react';
import { LOG_IN_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';



const Login = () => {
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
        console.log('로그인 되었니?'+isLoggedIn);
        console.log('미미미'+me);
        
        //setVisible(false);   
    }, [email, password, isLoggedIn, me && me.id ]);

    return (
        <>
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
        </>
    )
}




