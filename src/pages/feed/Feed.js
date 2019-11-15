import React, { useEffect, useState, useCallback, useContext } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import LoadMore from '../../components/LoadMore';
import styled from 'styled-components';
import SearchPosts from './SearchPosts';
import http from '../../utils/http';
import { FeedContext } from '../../App';

const FeedContainer = styled(LimitedWidthContainer)`
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: min-content;
`

const createQuery = filters => {
    const query = {
        ...filters.typeFilters
    };

    if (filters.tags) query.tags = filters.tags.map(tag => tag.value)
    return query;
}

const Feed = () => {
    const feedContext = useContext(FeedContext);
    const {posts, from, hasMore, filters, setFeedContext, alive} = feedContext;

    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const setFilters = useCallback(filters => setFeedContext(() => ({filters})), [setFeedContext])
    const loadMoreData = useCallback(() => http('searchPost', 'GET', {from, ...createQuery(filters)}), [from, filters]);

    useEffect(() => {
        if (!from) return;
        
        setLoading(true);
        const fetchData = async () => {
            const newPosts = await loadMoreData();
            if (newPosts.length < 10) setFeedContext(() => ({hasMore: false}));
            setFeedContext(c => ({posts: [...c.posts, ...newPosts]}));
            setLoading(false);
        }
        fetchData();
    }, [from, loadMoreData, setFeedContext]);

    // Loading new
    useEffect(() => {
        if (firstLoad) setFirstLoad(false);
        if (firstLoad && alive) {
            return;
        };
        setLoading(true);
        setFeedContext(() => ({
            posts: [],
            hasMore: true
        }));
        const queryFrom = new Date().toISOString()

        const fetchData = async () => {
            const newPosts = await http('searchPost', 'GET', {from: queryFrom, ...createQuery(filters)});
            if (newPosts.length < 10) setFeedContext(() => ({hasMore: false}));
            setFeedContext(() => ({posts: newPosts, alive: true}));
            setLoading(false);
        }
        fetchData();
    }, [filters, setFeedContext]);

    return (
        <FeedContainer>
            <CreateNewPost />
            <SearchPosts filters={filters} setFilters={setFilters} />
            <Posts posts={posts} />
            {hasMore && <LoadMore loading={loading} onClick={() => setFeedContext(() => ({from: posts[posts.length - 1].createdAt}))} />}
        </FeedContainer>
    )
}

export default Feed

