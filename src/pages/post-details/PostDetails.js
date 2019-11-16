import React, {useEffect, useState, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import http from '../../utils/http';
import { Post } from '../../components/Post';
import styled from 'styled-components';
import { LimitedWidthContainer } from '../../styles/utils';
import Button from '../../components/Button';
import { FeedContext } from '../../App';

const PostDetailsContainer = styled(LimitedWidthContainer)`
  padding-top: 2rem;
`;

export const PostDetails = (props) => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const hist = useHistory();
    const feedContext = useContext(FeedContext);

    useEffect(() => {
        const fetchData = async () => {
            const post = await http('getPost', 'GET', {id});
            setPost(post);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const selectedTags = feedContext.alive && feedContext.filters.tags ? feedContext.filters.tags.map(tag => tag.value) : [];

    return (
        <PostDetailsContainer>
            <Button style={{marginBottom: '20px'}} secondary text="Go back" onClick={() => hist.goBack()}/>
            {loading ? <div>Loading...</div> : <Post selectedTags={selectedTags} post={post} details/>} 
        </PostDetailsContainer>
    )
}
