import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';
import { Post } from '../../components/Post';
import styled from 'styled-components';
import { LimitedWidthContainer } from '../../styles/utils';

const PostDetailsContainer = styled(LimitedWidthContainer)`
  padding-top: 2rem;
`;

export const PostDetails = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const post = await http('getPost', 'GET', {id});
            setPost(post);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    return (
        <PostDetailsContainer>
            {loading ? <div>Loading...</div> : <Post post={post} details/>} 
        </PostDetailsContainer>
    )
}
