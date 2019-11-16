import React, {useState} from 'react'
import styled from 'styled-components';
import { Form, Message } from 'semantic-ui-react';
import useForm from '../../hooks/forms';
import Validator from 'validator';
import http from '../../utils/http';
import { fbAuth } from '../../App';

const Wrapper = styled.div`
  width: 100%;
`;

export const EditInfo = ({user}) => {
    const {values, onChange, onBlur, markError, errors, valid} = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
    }, [
        {name: 'firstname', test: x => !Validator.isEmpty(x.firstname), error: 'First name cant be empty'},
        {name: 'lastname', test: x => !Validator.isEmpty(x.lastname), error: 'Last name cant be empty'},
    ])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iProps={onChange,onBlur};
    const onUpdate = async () => {
        const token = await fbAuth.currentUser.getIdToken(true);
        setLoading(true);
        await http('updateSelf', 'PUT', {token}, values);
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
                <Form.Input label="Email" name="email" type="email" disabled value={user.email}/>
                <Form.Input error={markError.firstname && errors.firstname} label="First Name" name="firstname" type="text" {...iProps} value={values.firstname}/>
                <Form.Input error={markError.lastname && errors.lastname} label="Last Name" name="lastname" type="text" {...iProps} value={values.lastname}/>
                <Form.Button disabled={!valid} onClick={onUpdate}>Update</Form.Button>
            </Form>
        </Wrapper>
    )
}
