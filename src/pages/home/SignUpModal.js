import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';

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

    const iProps={values,onChange,onBlur}

    // TODO Autofocus on CDM
    return (
        <LimitedWidthModal trigger={<Button primary>Sign up</Button>}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
            <Form>
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
                <Button type='submit'>Submit</Button>
            </Form>
            </Modal.Content>
        </LimitedWidthModal>
    )
}

export default SignUpModal
