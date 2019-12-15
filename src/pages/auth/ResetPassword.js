import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import { LimitedWidthModal } from '../../styles/utils';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import { savePassword, confirmResetPasswordCode } from '../../services/auth';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom'


const ResetPasswordModal = ({code}) => {
    const intl = useIntl();
    const [open, setOpen] = useState(true);
    const history = useHistory();
    const {values, onChange, onBlur, markError, errors, valid} = useForm({
        password: ''
    }, [
        {name: 'password', test: x => !Validator.isEmpty(x.password), error: intl.formatMessage({id: 'auth.sign-up.error2'})},
    ])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iProps={values,onChange,onBlur}

    const savePasswordHandler = () => {
        setLoading(true);
        confirmResetPasswordCode(code)
            .then(email => savePassword({...values, code, email}))
            .then(() => history.push('/'))
            .catch(res => {
                let error;
                switch(res.code) {
                    case 'auth/weak-password':
                        error = intl.formatMessage({id: 'auth.sign-up.error6'});
                        break;
                    case 'auth/invalid-action-code':
                        error = intl.formatMessage({id: 'auth.invalid-code'});
                        break;
                    default:
                        error = intl.formatMessage({id: 'auth.error'})
                        break;         
                }
                setError(error);
                setLoading(false);
            });
    }

    
    return (
        <LimitedWidthModal onClose={() => setOpen(false)} open={open} >
            <Modal.Header>{intl.formatMessage({id: 'auth.password.new'})}</Modal.Header>
                <Modal.Content>
                    <Form error={!!error} loading={loading}>
                        <Message
                            error
                            header={error}
                            />
                        <Form.Input error={markError.password && errors.password} label={intl.formatMessage({id: 'auth.password'})} name="password" type="password" {...iProps}/>
                        <Form.Button disabled={!valid} onClick={savePasswordHandler}>{intl.formatMessage({id: 'auth.password.save'})}</Form.Button>
                    </Form>
                </Modal.Content>
        </LimitedWidthModal>
        
    )
}

export default ResetPasswordModal
