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
        border-color: ${({theme}) => theme.secondary};
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

    const resetAndUnfocus = () => {
        reset();
        document.activeElement.blur();
    }

    const createPostHandler = () => {
        setLoading(true);
        document.activeElement.blur();
        
        getFirestore()
            .collection('posts')
            .add(enhanceWith(values, USER_UID, USER_NAME, CREATED_AT))
            .then(() => {
                setLoading(false);
                resetAndUnfocus();
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
                    onKeyDown={e => e.key === "Escape" && resetAndUnfocus()}
                    placeholder={'What are you thinking about? :D'}
                />

                <Button onClick={createPostHandler} secondary text="Post" width="100%" />
            </Wrapper>
        </Dimmer>
    )
}

export default CreateNewPost
