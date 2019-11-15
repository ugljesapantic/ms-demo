import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import http from '../../utils/http';
import { Post } from '../../components/Post';
import styled from 'styled-components';
import { LimitedWidthContainer } from '../../styles/utils';
import Button from '../../components/Button';

const PostDetailsContainer = styled(LimitedWidthContainer)`
  padding-top: 2rem;
`;

export const PostDetails = (props) => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const hist = useHistory();

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
            <Button secondary text="Go back" onClick={() => hist.goBack()}/>
            {loading ? <div>Loading...</div> : <Post post={post} details/>} 
        </PostDetailsContainer>
    )
}
