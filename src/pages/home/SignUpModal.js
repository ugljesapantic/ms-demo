import React, { useState, useContext } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import { signUp } from '../../services/auth';

const SignUpModal = () => {
    const {values, onChange, onBlur, markError} = useForm({
        firstname: '',
        lastname: '',
        password: '',
        email: ''
    }, [
        {name: 'email', test: x => Validator.isEmail(x.email), error: 'Not valid email'},
        {name: 'password', test: x => Validator.isEmail(x.password), error: 'Password cant be empty'},
    ])

    const [loading, setLoading] = useState(false);

    const iProps={values,onChange,onBlur}

    const signUpHandler = () => {
        setLoading(true);
        signUp(values);
    }

    
    return (
        <LimitedWidthModal trigger={<Button primary>Sign up</Button>}>
            <Modal.Header>Sign up</Modal.Header>
            <Modal.Content>
            <Form loading={loading}>
                <Form.Field error={markError.email}>
                    <label>Email</label>
                    <input name="email" type="email" placeholder='example@email.com' {...iProps}/>
                </Form.Field>
                <Form.Field >
                    <label>First Name</label>
                    <input name="firstname" placeholder='First Name' {...iProps}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input name="lastname" placeholder='Last Name' {...iProps}/>
                </Form.Field>
                <Form.Field >
                    <label>Password</label>
                    <input name="password" type="password" {...iProps}/>
                </Form.Field>
                <Button type='submit' onClick={signUpHandler}>Sign up</Button>
            </Form>
            </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default SignUpModal
