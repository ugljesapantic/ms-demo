import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';
import useForm from '../../hooks/forms';
import { getFirestore, enhanceWith, CREATED_AT, USER_UID, USER_NAME } from '../../utils/firebase';

const CreateNewPost = () => {
    const [loading, setLoading] = useState(false)

    const {values, onChange, onBlur} = useForm({
        title: '',
        description: ''
    }, [])


    const createPostHandler = () => {
        setLoading(true);
        getFirestore()
            .collection('posts')
            .add(enhanceWith(values, USER_UID, USER_NAME, CREATED_AT))
            .then(() => setLoading(false))
    }

    const iProps={values,onChange,onBlur}
    
    return (
        <Form loading={loading}>
            <Form.Input label="Title" name="title" type="text" placeholder='title' {...iProps}/>
            <Form.Input label="Descrption" name="description" type="text" {...iProps}/>
            <Form.Button disabled={loading} onClick={createPostHandler}>Create</Form.Button>
        </Form>
    )
}

export default CreateNewPost
