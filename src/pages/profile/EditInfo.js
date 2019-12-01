import React, {useState} from 'react'
import styled from 'styled-components';
import { Form, Message } from 'semantic-ui-react';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import http from '../../utils/http';
import { useIntl } from 'react-intl';

const Wrapper = styled.div`
  width: 100%;
`;

export const EditInfo = ({user}) => {
    const {values, onChange, onBlur, markError, errors, valid} = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
    }, [
        {name: 'firstname', test: x => !Validator.isEmpty(x.firstname), error: intl.formatMessage({id: 'auth.sign-up.error3'})},
        {name: 'lastname', test: x => !Validator.isEmpty(x.lastname), error: intl.formatMessage({id: 'auth.sign-up.error4'})},
    ])

    const [loading, setLoading] = useState(false);
    const [error] = useState(null);

    const intl = useIntl();

    const iProps={onChange,onBlur};
    const onUpdate = async () => {
        setLoading(true);
        await http('updateSelf', 'PUT', null, values, true);
        setLoading(false);
    }

    return (
        <Wrapper>
            <Form error={!!error} loading={loading}>
                <Message
                    error
                    header='Error occured'
                    content={error}
                    />
                <Form.Input label={intl.formatMessage({id: 'auth.email'})} name="email" type="email" disabled value={user.email}/>
                <Form.Input error={markError.firstname && errors.firstname} label={intl.formatMessage({id: 'auth.first-name'})} name="firstname" type="text" {...iProps} value={values.firstname}/>
                <Form.Input error={markError.lastname && errors.lastname} label={intl.formatMessage({id: 'auth.last-name'})} name="lastname" type="text" {...iProps} value={values.lastname}/>
                <Form.Button disabled={!valid} onClick={onUpdate}>{intl.formatMessage({id: 'auth.update'})}</Form.Button>
            </Form>
        </Wrapper>
    )
}
