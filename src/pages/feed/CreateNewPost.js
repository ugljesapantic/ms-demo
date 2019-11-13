import React, { useState } from 'react'
import useForm from '../../hooks/forms';
import Textarea from 'react-textarea-autosize';

import styled, {withTheme} from 'styled-components';
import Button from '../../components/Button';
import { boxStyles } from '../../styles/shared';
import TagInput from '../../components/TagInput';
import http from '../../utils/http';
import { withUserUid } from '../../utils/firebase';
import { PostTypeSelect } from '../../components/PostTypeSelect';
import { PARTNER_TYPE } from '../../utils/consts';
import { LimitedWidthModal } from '../../styles/utils';
import CornerIconButton from '../../components/CornerIconButton';


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

const defaultPostState = {
    type: PARTNER_TYPE.value,
    subType: null,
};

const CreateNewPost = ({theme}) => {
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [typeFilters, setTypeFilters] = useState(defaultPostState);
    const [open, setOpen] = useState(false);

    const {values, onChange, reset} = useForm({
        title: '',
        description: ''
    }, []);

    const resetEverything = () => {
        reset();
        setTags([]);
        setTypeFilters(defaultPostState);
        setOpen(false)
    }

    const createPostHandler = async () => {
        setLoading(true);
        await http('createPost', 'POST', null, withUserUid({
            ...values,
            ...typeFilters,
            tags: tags.map(t => t.value)
        }));
        resetEverything();
        setLoading(false);
    };

    const iProps={values,onChange};

    return (
        <LimitedWidthModal
            open={open}
            trigger={<CornerIconButton name='plus' onClick={() => setOpen(true)} />}>
            <Wrapper>
                <StyledArea
                    {...iProps}
                    value={values.title}
                    minRows={1}
                    name="title"
                    onKeyDown={e => e.key === "Escape" && resetEverything()}
                    placeholder={'Title...'}
                />
                <StyledArea
                    {...iProps}
                    value={values.description}
                    minRows={1}
                    name="description"
                    onKeyDown={e => e.key === "Escape" && resetEverything()}
                    placeholder={'Description...'}
                />
                {/* TODO Add title & desciption */}
                {values.title && <TagInput 
                    onChange={e => setTags(e)}
                    placeholder="Add your tags"
                    value={tags}
                />}
                <PostTypeSelect 
                    show={!!tags.length}
                    filters={typeFilters}
                    setFilters={setTypeFilters}
                />
                {!!tags.length && <StyledButton onClick={createPostHandler} secondary text="Post" width="100%" />}
            </Wrapper>
        </LimitedWidthModal>
    )
}

export default withTheme(CreateNewPost)
