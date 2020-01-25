import React, { useState, useContext } from 'react'
import useForm from '../../hooks/forms';

import styled, {withTheme} from 'styled-components';
import Button from '../../components/Button';
import { boxStyles, StyledArea } from '../../styles/shared';
import TagInput from '../../components/TagInput';
import http from '../../utils/http';
import { withUserUid } from '../../utils/firebase';
import { PostTypeSelect } from '../../components/PostTypeSelect';
import { LimitedWidthModal } from '../../styles/utils';
import CornerIconButton from '../../components/CornerIconButton';
import { useIntl } from 'react-intl';
import { showSuccessToast } from '../../utils/misc';
import { MyPostsContext } from '../../App';


const StyledButton = styled(Button)`
  margin-top: 8px;
`;

const Wrapper = styled.div`
   ${boxStyles}
`;

const CreateNewPost = ({theme}) => {
    const [tags, setTags] = useState([]);
    const [typeFilters, setTypeFilters] = useState({});
    const [open, setOpen] = useState(false);
    const myPostsContext = useContext(MyPostsContext);
    const intl = useIntl()

    const {values, onChange, reset} = useForm({
        title: '',
        description: ''
    }, []);

    const resetEverything = () => {
        reset();
        setTags([]);
        setTypeFilters({});
    }

    const createPostHandler = async () => {
        setOpen(false);
        resetEverything();
        const post = await http('createPost', 'POST', null, withUserUid({
            ...values,
            ...typeFilters,
            tags: tags.map(t => t.value)
        }));

        myPostsContext.set((c) => ({...c, posts: [...c.posts, post]}))
        showSuccessToast(intl.formatMessage({id: 'feed.post.created'}))
    };

    const iProps={values,onChange};

    return (
        <LimitedWidthModal
            open={open}
            onClose={() => setOpen(false)}
            trigger={<CornerIconButton primary size="huge" onClick={() => setOpen(true)} name='plus'/>}>
            <Wrapper>
                <StyledArea
                    {...iProps}
                    value={values.title}
                    minRows={1}
                    name="title"
                    onKeyDown={e => e.key === "Escape" && resetEverything()}
                    placeholder={intl.formatMessage({id: 'feed.post.title'})}
                />
                {values.title && <StyledArea
                    {...iProps}
                    value={values.description}
                    minRows={1}
                    name="description"
                    onKeyDown={e => e.key === "Escape" && resetEverything()}
                    placeholder={intl.formatMessage({id: 'feed.post.description'})}
                />}
                {/* TODO Add title & desciption */}
                {values.description && <TagInput 
                    onChange={e => setTags(e || [])}
                    placeholder={intl.formatMessage({id: 'feed.post.add-tags'})}
                    value={tags}
                />}
                {!!tags.length && <PostTypeSelect 
                    show={!!tags.length}
                    filters={typeFilters}
                    setFilters={setTypeFilters}
                />}
                <StyledButton disabled={!typeFilters.subType} onClick={createPostHandler} secondary text={intl.formatMessage({id: 'feed.post.new'})} width="100%" />
            </Wrapper>
        </LimitedWidthModal>
    )
}

export default withTheme(CreateNewPost)
