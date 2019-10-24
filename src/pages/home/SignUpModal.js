import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import { signUp } from '../../services/auth';
import Button from '../../components/Button';

const SignUpModal = () => {
    const {values, onChange, onBlur, markError, errors, valid} = useForm({
        firstname: '',
        lastname: '',
        password: '',
        email: ''
    }, [
        {name: 'email', test: x => Validator.isEmail(x.email), error: 'Not valid email'},
        {name: 'password', test: x => !Validator.isEmpty(x.password), error: 'Password cant be empty'},
        {name: 'firstname', test: x => !Validator.isEmpty(x.firstname), error: 'First name cant be empty'},
        {name: 'lastname', test: x => !Validator.isEmpty(x.lastname), error: 'Last name cant be empty'},
    ])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iProps={values,onChange,onBlur}

    const signUpHandler = () => {
        setLoading(true);
        signUp(values).catch(res => {
            let error;
            switch(res.code) {
                case 'auth/email-already-in-use':
                    error = 'Email already exists';
                    break;
                case 'auth/weak-password':
                    error = 'Password should be at least 6 characters';
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
        <LimitedWidthModal trigger={<Button text='Sign up' width={120} bordered />}>
            <Modal.Header>Sign up</Modal.Header>
                <Modal.Content>
                    <Form error={!!error} loading={loading}>
                        <Message
                            error
                            header='Error occured'
                            content={error}
                            />
                        <Form.Input error={markError.email && errors.email} label="Email" name="email" type="email" placeholder='example@email.com' {...iProps}/>
                        <Form.Input error={markError.firstname && errors.firstname} label="First Name" name="firstname" type="text" {...iProps}/>
                        <Form.Input error={markError.lastname && errors.lastname} label="Last Name" name="lastname" type="text" {...iProps}/>
                        <Form.Input error={markError.password && errors.password} label="Password" name="password" type="password" {...iProps}/>
                        <Form.Button disabled={!valid} onClick={signUpHandler}>Sign up</Form.Button>
                    </Form>
                </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default SignUpModal
