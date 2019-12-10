import React, {useEffect, useState, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import http from '../../utils/http';
import { Post } from '../../components/Post';
import styled from 'styled-components';
import { LimitedWidthContainer } from '../../styles/utils';
import Button from '../../components/Button';
import { FeedContext, fbAuth, MyPostsContext } from '../../App';
import { createComposideChatKey, showSuccessToast } from '../../utils/misc';
import { Loading } from '../../components/Loading';
import { useIntl } from 'react-intl';

const PostDetailsContainer = styled(LimitedWidthContainer)`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
    margin: 1rem 0;

    /* TODO I can do better than this */
    ${({right}) => right ? 'margin-left: auto' : 'margin-right: auto'}
`

export const PostDetails = (props) => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const hist = useHistory();
    const feedContext = useContext(FeedContext);
    const myPostsContext = useContext(MyPostsContext);
    const intl = useIntl();

    useEffect(() => {
        const fetchData = async () => {
            const post = await http('getPost', 'GET', {id});
            setPost(post);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const selectedTags = feedContext.alive && feedContext.filters.tags ? feedContext.filters.tags.map(tag => tag.value) : [];

    const onDelete = async () => {
        setLoading(true);
        await http('deletePost', 'DELETE', {id});
        myPostsContext.set(c => ({
            posts: c.posts.filter(post => post._id !== id)
        }))
        showSuccessToast(intl.formatMessage({id: 'profile.post.delete'}))
        setLoading(false);
        hist.push('/profile');
    }

    const sendMessage = () => {
        const authorId = post.userUid;
        const myId = fbAuth.currentUser.uid;
        const compositeKey = createComposideChatKey([authorId, myId]);
        hist.push(`/chat/${compositeKey}`)
    }

    const isMine = post && post.userUid === fbAuth.currentUser.uid;

    // TODO Loading screen high order component
    return (
        <PostDetailsContainer>
            {!loading && <StyledButton  secondary text="Go back" onClick={() => hist.goBack()}/>}
            {loading ? <Loading /> : <Post selectedTags={selectedTags} post={post} details/>} 
            {!loading && <Actions>
                {isMine && <StyledButton right negative text="Delete" onClick={onDelete}/>}
                {!isMine && <StyledButton right primary text="Send message" onClick={sendMessage}/>}
            </Actions>}
        </PostDetailsContainer>
    )
}
