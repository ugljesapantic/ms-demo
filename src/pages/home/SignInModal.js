import React, { useState, useContext } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import { signIn } from '../../services/auth';
import { AuthContext } from '../../App';
import { getFirebase } from '../../utils/firebase';

const SignInModal = () => {
    const {values, onChange, onBlur, markError} = useForm({
        password: '',
        email: ''
    }, [
        {name: 'email', test: x => Validator.isEmail(x.email), error: 'Not valid email'},
        {name: 'password', test: x => Validator.isEmail(x.password), error: 'Password cant be empty'},
    ])

    const [loading, setLoading] = useState(false);

    const iProps={values,onChange,onBlur}

    const signInHandler = () => {
        setLoading(true);
        signIn(values);
    }

    
    return (
        <LimitedWidthModal trigger={<Button primary>Sign in</Button>}>
            <Modal.Header>Sign in</Modal.Header>
            <Modal.Content>
            <Form loading={loading}>
                <Form.Field error={markError.email}>
                    <label>Email</label>
                    <input name="email" type="email" placeholder='example@email.com' {...iProps}/>
                </Form.Field>
                <Form.Field >
                    <label>Password</label>
                    <input name="password" type="password" {...iProps}/>
                </Form.Field>
                <Button type='submit' onClick={signInHandler}>Sign in</Button>
            </Form>
            </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default SignInModal
