import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import { signIn } from '../../services/auth';
import Button from '../../components/Button';


const SignInModal = () => {
    const {values, onChange, onBlur} = useForm({
        password: '',
        email: ''
    }, [])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iProps={values,onChange,onBlur}

    const signInHandler = () => {
        setLoading(true);
        signIn(values).catch(res => {
            let error;
            switch(res.code) {
                case 'auth/wrong-password':
                    error = 'Email or password are incorrect';
                    break;
                default:
                    error = 'An error occured, please try later';
                    break;         
            }
            setError(error);
            setLoading(false);
        });
    }

    
    return (
        <LimitedWidthModal trigger={<Button width={120} text='Sign in'/>}>
            <Modal.Header>Sign in</Modal.Header>
                <Modal.Content>
                    <Form error={!!error} loading={loading}>
                        <Message
                            error
                            header='Error occured'
                            content={error}
                            />
                        <Form.Input label="Email" name="email" type="email" placeholder='example@email.com' {...iProps}/>
                        <Form.Input label="Password" name="password" type="password" {...iProps}/>
                        <Form.Button onClick={signInHandler}>Sign in</Form.Button>
                    </Form>
                </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default SignInModal
