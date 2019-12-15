import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import { signIn } from '../../services/auth';
import Button from '../../components/Button';
import { useIntl } from 'react-intl';


const SignInModal = () => {
    const {values, onChange, onBlur} = useForm({
        password: '',
        email: ''
    }, [])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intl = useIntl();

    const iProps={values,onChange,onBlur}

    const signInHandler = () => {
        setLoading(true);
        signIn(values)
            .then(() => setLoading(false))
            .catch(res => {
                let error;
                switch(res.code) {
                    case 'auth/wrong-password':
                        error = intl.formatMessage({id: 'auth.sign-in.error1'});
                        break;
                    default:
                        error = intl.formatMessage({id: 'auth.error'});
                        break;         
                }
                setError(error);
                setLoading(false);
            });
    }

    
    return (
        <LimitedWidthModal trigger={<Button width='120px' text={intl.formatMessage({id: 'auth.sign-in'})}/>}>
            <Modal.Header>{intl.formatMessage({id: 'auth.sign-in'})}</Modal.Header>
                <Modal.Content>
                    <Form error={!!error} loading={loading}>
                        <Message
                            error
                            header={intl.formatMessage({id: 'auth.error'})}
                            content={error}
                            />
                        <Form.Input label={intl.formatMessage({id: 'auth.email'})} name="email" type="email" placeholder='example@email.com' {...iProps}/>
                        <Form.Input label={intl.formatMessage({id: 'auth.password'})} name="password" type="password" {...iProps}/>
                        <Form.Button onClick={signInHandler}>
                            {intl.formatMessage({id: 'auth.sign-in'})}
                        </Form.Button>
                    </Form>
                </Modal.Content>
        </LimitedWidthModal>
    )
}

export default SignInModal
