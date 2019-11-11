import React, { useEffect, useState, useCallback } from 'react'
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
    const [from, setFrom] = useState(null);
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const params = {from, ...query};

    useEffect(() => {
        if (!from) return;

        setLoading(true);
        const fetchData = async () => {
            const newPosts = await http('searchPost', 'GET', params);
            if (newPosts.length < 10) setHasMore(false);
            setPosts(posts => [...posts, ...newPosts]);
            setLoading(false);
        }
        fetchData();
    }, [from, params]);

    // Loading new
    useEffect(() => {
        if (!query) return;

        setLoading(true);
        setPosts([]);
        const queryFrom = new Date().toISOString()
        
        const fetchData = async () => {
            const newPosts = await http('searchPost', 'GET', {from: queryFrom, ...query});
            if (newPosts.length < 10) setHasMore(false);
            setPosts(newPosts);
            setLoading(false);
        }
        fetchData();
    }, [query]);

    let setFilters = useCallback(query => setQuery(query), [])
    
    return (
        <FeedContainer>
            <CreateNewPost />
            <SearchPosts setFilters={setFilters} />
            <Posts posts={posts} />
            {hasMore && <LoadMore loading={loading} onClick={() => setFrom(posts[posts.length - 1].createdAt)} />}
        </FeedContainer>
    )
}

export default Feed

