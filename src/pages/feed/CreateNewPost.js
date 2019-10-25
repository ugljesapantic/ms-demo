import React, { useState } from 'react'
import useForm from '../../hooks/forms';
import { getFirestore, enhanceWith, CREATED_AT, USER_UID, USER_NAME } from '../../utils/firebase';
import Textarea from 'react-textarea-autosize';

import styled from 'styled-components';
import Dimmer from '../../components/Dimmer';
import Button from '../../components/Button';
import { boxStyles } from '../../styles/shared';


const StyledArea = styled(Textarea)`
    width: 100%;
    border: none;
    resize: none;
    border: 1px solid transparent;
    border-radius: 4px;
    line-height: 1.4rem;
    padding: 8px;
    margin-bottom: 8px;
    ::-webkit-scrollbar { 
        display: none; 
    }

    &:focus {
        border-color: #5a5a97;
        outline: none;
    }
`;

const Wrapper = styled.div`
   ${boxStyles}
`;

const CreateNewPost = () => {
    const [loading, setLoading] = useState(false);

    const {values, onChange, reset} = useForm({
        content: ''
    }, []);

    const createPostHandler = () => {
        setLoading(true);
        
        getFirestore()
            .collection('posts')
            .add(enhanceWith(values, USER_UID, USER_NAME, CREATED_AT))
            .then(() => {
                setLoading(false);
                reset();
            })
    }

    const iProps={values,onChange};

    return (
        <Dimmer loading={loading ? 1 : 0}>
            <Wrapper>
                <StyledArea
                    {...iProps}
                    value={values.content}
                    minRows={2}
                    name="content"
                    placeholder={'What are you thinking about? :D'}
                />

                <Button onClick={createPostHandler} dark text="Post" width="100%" />
            </Wrapper>
        </Dimmer>
    )
}

export default CreateNewPost
