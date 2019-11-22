import React, { useEffect, useState, useCallback, useContext, useRef } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import LoadMore from '../../components/LoadMore';
import styled from 'styled-components';
import SearchPosts from './SearchPosts';
import http from '../../utils/http';
import { FeedContext } from '../../App';

const FeedContainer = styled.div`
    height: min-content;
    overflow: auto;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
`

const FeedContainerInner = styled(LimitedWidthContainer)`
    margin: 0 auto;
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
`

const createQuery = filters => {
    const query = {
        ...filters.typeFilters,
        from: filters.from
    };

    if (filters.tags) query.tags = filters.tags.map(tag => tag.value)
    return query;
}

const Feed = () => {
    const feedContext = useContext(FeedContext);
    const container = useRef()

    const {posts, hasMore, filters, set, alive, scroll, pagination} = feedContext;

    const [loading, setLoading] = useState(false);

    const setFilters = useCallback(filters => set(() => ({
        filters: {...filters, from: new Date().toISOString()},
        pagination: false,
    })), [set]);

    const loadMore = useCallback(() => set(c => ({
        filters: {...c.filters, from: posts[posts.length - 1].createdAt},
        pagination: true
    })), [set, posts])

    const loadData = useCallback(async (apiCall, pagination) => {
        setLoading(true);
        if (!pagination) {
            set(() => ({
                posts: [],
                hasMore: true
            }));
        }

        const newPosts = await apiCall();
        if (newPosts.length < 10) set(() => ({hasMore: false}));
        set(c => ({posts: [...c.posts, ...newPosts], alive: true}));
        setLoading(false);
    }, [setLoading, set])

    // TODO Consider extracting
    const isFirstRunX = useRef(true);

    useEffect(() => {
        if (isFirstRunX.current) {
            isFirstRunX.current = false;
            return;
        }

        loadData(() => http('searchPost', 'GET', {...createQuery(filters)}, null,  true), pagination);

    }, [filters, pagination, loadData]);

    const isFirstRunY = useRef(true);

    useEffect(() => {
        if (isFirstRunY.current) {
            isFirstRunY.current = false;
        }

        if (alive) return;

        set(() => ({filters: {from: new Date().toISOString()}}))
    }, [loadData, alive, set]);

    useEffect(() => {
        let listener = e => set(() => ({scroll: e.target.scrollTop}));
        const el = container.current;
        el.addEventListener('scroll', listener)
        return () => el.removeEventListener('scroll', listener);
    }, [set])

    const isFirstRunZ = useRef(true);

    useEffect(() => {
        if (isFirstRunZ.current) {
            isFirstRunZ.current = false;
            if (alive) {
                container.current.scrollTop = scroll;
            }
        }
    }, [scroll, alive])

    return (
        <FeedContainer ref={container}>
            <FeedContainerInner>
                <CreateNewPost />
                <SearchPosts filters={filters} setFilters={setFilters} />
                <Posts posts={posts} />
                {hasMore && <LoadMore loading={loading} onClick={loadMore} />}
            </FeedContainerInner>
        </FeedContainer>
    )
}

export default Feed

