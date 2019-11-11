import React, { useEffect, useState } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import LoadMore from '../../components/LoadMore';
import styled from 'styled-components';
import SearchPosts from './SearchPosts';
import http from '../../utils/http';

const FeedContainer = styled(LimitedWidthContainer)`
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: min-content;

    > * {
        width: 100%;
    }
`

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [from, setFrom] = useState(new Date().toISOString());
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const newPosts = await http('searchPost', 'GET', {from});
            if (newPosts.length < 10) setHasMore(false);
            setPosts(posts => [...posts, ...newPosts]);
            setLoading(false);
        }
        fetchData();
    }, [from]);
    
    return (
        <FeedContainer>
            <CreateNewPost />
            <SearchPosts setFilters={() => {}} />
            <Posts posts={posts} />
            {hasMore && <LoadMore loading={loading} onClick={() => setFrom(posts[posts.length - 1].createdAt)} />}
        </FeedContainer>
    )
}

export default Feed

