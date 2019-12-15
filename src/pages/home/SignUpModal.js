import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import { signUp } from '../../services/auth';
import Button from '../../components/Button';
import { useIntl } from 'react-intl';

const SignUpModal = () => {
    const intl = useIntl();
    const [open, setOpen] = useState(false)
    const {values, onChange, onBlur, markError, errors, valid} = useForm({
        firstname: '',
        lastname: '',
        password: '',
        email: ''
    }, [
        {name: 'email', test: x => Validator.isEmail(x.email), error: intl.formatMessage({id: 'auth.sign-up.error1'})},
        {name: 'password', test: x => !Validator.isEmpty(x.password), error: intl.formatMessage({id: 'auth.sign-up.error2'})},
        {name: 'firstname', test: x => !Validator.isEmpty(x.firstname), error: intl.formatMessage({id: 'auth.sign-up.error3'})},
        {name: 'lastname', test: x => !Validator.isEmpty(x.lastname), error: intl.formatMessage({id: 'auth.sign-up.error4'})},
    ])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iProps={values,onChange,onBlur}

    const signUpHandler = () => {
        setLoading(true);
        signUp(values)
            .then(() => {
                setOpen(false);
            })
            .catch(res => {
                let error;
                switch(res.code) {
                    case 'auth/email-already-in-use':
                        error = intl.formatMessage({id: 'auth.sign-up.error5'});
                        break;
                    case 'auth/weak-password':
                        error = intl.formatMessage({id: 'auth.sign-up.error6'});
                        break;
                    default:
                        debugger;
                        error = intl.formatMessage({id: 'auth.error'})
                        break;         
                }
                setError(error);
                setLoading(false);
            });
    }

    
    return (
        <LimitedWidthModal onClose={() => setOpen(false)} open={open} trigger={<Button onClick={() => setOpen(true)} text={intl.formatMessage({id: 'auth.sign-up'})} width='120px' bordered />}>
            <Modal.Header>{intl.formatMessage({id: 'auth.sign-up'})}</Modal.Header>
                <Modal.Content>
                    <Form error={!!error} loading={loading}>
                        <Message
                            error
                            header={intl.formatMessage({id: 'auth.error'})}
                            content={error}
                            />
                        <Form.Input error={markError.email && errors.email} label={intl.formatMessage({id: 'auth.email'})} name="email" type="email" placeholder='example@email.com' {...iProps}/>
                        <Form.Input error={markError.firstname && errors.firstname} label={intl.formatMessage({id: 'auth.first-name'})} name="firstname" type="text" {...iProps}/>
                        <Form.Input error={markError.lastname && errors.lastname} label={intl.formatMessage({id: 'auth.last-name'})} name="lastname" type="text" {...iProps}/>
                        <Form.Input error={markError.password && errors.password} label={intl.formatMessage({id: 'auth.password'})} name="password" type="password" {...iProps}/>
                        <Form.Button disabled={!valid} onClick={signUpHandler}>{intl.formatMessage({id: 'auth.sign-up'})}</Form.Button>
                    </Form>
                </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default SignUpModal
