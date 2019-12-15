import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import { signIn, resetPassword } from '../../services/auth';
import Button from '../../components/Button';
import { useIntl } from 'react-intl';
import { showSuccessToast } from '../../utils/misc';
import styled from 'styled-components';

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ToggleText = styled.div`
    text-decoration: underline;
    cursor: pointer;
`


const SignInModal = () => {
    const {values: signInValues, onChange: signInOnChange, onBlur: signInOnBlur} = useForm({
        password: '',
        email: ''
    }, [])

    const {values: resetValues, onChange: resetOnChange, onBlur: resetOnBlur} = useForm({
        email: ''
    }, [])

    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const intl = useIntl();

    const signInProps={values: signInValues,onChange: signInOnChange,onBlur: signInOnBlur}
    const resetProps={values: resetValues,onChange: resetOnChange,onBlur: resetOnBlur}

    const signInHandler = () => {
        setLoading(true);
        signIn(signInValues)
            .then(() => setLoading(false))
            .catch(res => {
                let error;
                switch(res.code) {
                    case 'auth/wrong-password':
                    case 'auth/invalid-email':
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

    const resetHandler = () => {
        setLoading(true);
        resetPassword(resetValues)
            .then(() => {
                setLoading(false);
                setOpen(false);
                showSuccessToast(intl.formatMessage({id: 'auth.reset'}))
            })
            .catch(res => {
                let error;
                switch(res.code) {
                    default:
                        error = intl.formatMessage({id: 'auth.error'});
                        break;         
                }
                setError(error);
                setLoading(false);
            });
    }

    
    return (
        <LimitedWidthModal open={open} onClose={() => setOpen(false)} trigger={<Button onClick={() => setOpen(true)} width='120px' text={intl.formatMessage({id: 'auth.sign-in'})}/>}>
            <Modal.Header>{
                !reset ? intl.formatMessage({id: 'auth.sign-in'}) : intl.formatMessage({id: 'auth.sign-in.reset-password.title'})
            }</Modal.Header>
                <Modal.Content>
                    {!reset && <Form  error={!!error} loading={loading}>
                        <Message
                            error
                            header={error}
                            />
                        <Form.Input label={intl.formatMessage({id: 'auth.email'})} name="email" type="email" placeholder='example@email.com' {...signInProps}/>
                        <Form.Input label={intl.formatMessage({id: 'auth.password'})} name="password" type="password" {...signInProps}/>
                        <Actions>
                            <Form.Button onClick={signInHandler}>
                                {intl.formatMessage({id: 'auth.sign-in'})}
                            </Form.Button>
                            <ToggleText onClick={() => setReset(true)}>{intl.formatMessage({id: 'auth.sign-in.reset-password.link'})}</ToggleText>
                        </Actions>
                    </Form>}
                    {reset && <Form  error={!!error} loading={loading}>
                        <Message
                            error
                            header={intl.formatMessage({id: 'auth.error'})}
                            content={error}
                            />
                        <Form.Input label={intl.formatMessage({id: 'auth.email'})} name="email" type="email" placeholder='example@email.com' {...resetProps}/>
                        <Actions>
                            <Form.Button onClick={resetHandler}>
                                {intl.formatMessage({id: 'auth.sign-in.reset-password'})}
                            </Form.Button>
                            <ToggleText onClick={() => setReset(false)}>{intl.formatMessage({id: 'auth.sign-in'})}</ToggleText>
                        </Actions>
                    </Form>}
                </Modal.Content>
        </LimitedWidthModal>
    )
}

export default SignInModal
