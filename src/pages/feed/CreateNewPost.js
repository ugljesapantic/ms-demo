import React, { useState } from 'react'
import useForm from '../../hooks/forms';
import Textarea from 'react-textarea-autosize';

import styled, {withTheme} from 'styled-components';
import Dimmer from '../../components/Dimmer';
import Button from '../../components/Button';
import { boxStyles } from '../../styles/shared';
import TagInput from '../../components/TagInput';
import http from '../../utils/http';
import { withUserUid } from '../../utils/firebase';
import { PostTypeSelect } from '../../components/PostTypeSelect';


const StyledArea = styled(Textarea)`
    width: 100%;
    border: none;
    resize: none;
    border: 1px solid transparent;
    border-radius: 4px;
    line-height: 1.4rem;
    padding: 8px;
    ::-webkit-scrollbar { 
        display: none; 
    }

    &:focus {
        border-color: ${({theme}) => theme.secondary};
        outline: none;
    }
`;

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

const Wrapper = styled.div`
   ${boxStyles}
`;


const CreateNewPost = ({theme}) => {
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState(null);


    const {values, onChange, reset} = useForm({
        content: ''
    }, []);

    const resetAndUnfocus = () => {
        reset();
        setTags([]);
        setFilters(null)
        document.activeElement.blur();
    }

    const createPostHandler = async () => {
        setLoading(true);
        await http('createPost', 'POST', null, withUserUid({
            ...values,
            ...filters,
            tags: tags.map(t => t.value)
        }));
        resetAndUnfocus();
        setLoading(false);
    };

    const iProps={values,onChange};

    return (
        <Dimmer loading={loading ? 1 : 0}>
            <Wrapper>
                <StyledArea
                    {...iProps}
                    value={values.content}
                    minRows={1}
                    name="content"
                    onKeyDown={e => e.key === "Escape" && resetAndUnfocus()}
                    placeholder={'What are you thinking about? :D'}
                />
                {values.content && <TagInput 
                    onChange={e => setTags(e)}
                    placeholder="Add your tags"
                    value={tags}
                />}
                <PostTypeSelect 
                    show={!!tags.length}
                    setFilters={setFilters}
                />
                {!!tags.length && <StyledButton onClick={createPostHandler} secondary text="Post" width="100%" />}
            </Wrapper>
        </Dimmer>
    )
}

export default withTheme(CreateNewPost)
