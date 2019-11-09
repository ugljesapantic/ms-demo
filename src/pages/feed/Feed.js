import React, { useEffect, useState } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import { querySnapshotToArray } from '../../utils/firebase';
import LoadMore from '../../components/LoadMore';
import styled from 'styled-components';
import SearchPosts from './SearchPosts';
import { fbFirestore } from '../../App';

const PAGE_SIZE = 25;


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
    const [postsCount, setPostsCount] = useState(PAGE_SIZE);
    const [filters, setFilters] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const query = fbFirestore
    .collection('posts')
    .limit(postsCount)
    .orderBy('createdAt', 'desc')

    useEffect(() => {
        let listener;
        let listeners = []
        if (filters.length) {
            filters.forEach(filter => {
                const filterListener = query
                    .where('tags', 'array-contains', filter)
                    .onSnapshot(doc => {
                        setFilteredPosts({...filteredPosts, [filter]: querySnapshotToArray(doc)});
                    });
                listeners.push(filterListener);
            })
        } else {
        listener = query.onSnapshot(doc => {
                setPosts(querySnapshotToArray(doc));
            });
        }
        return () => {
            if (listener) listener()
            listeners.forEach(listener => listener());
        };
    }, [postsCount, filters]);

    useEffect(() => {
        const filtPosts = [];
        Object.keys(filteredPosts).forEach(key => {
            filteredPosts[key].forEach(post => {
                const index = filtPosts.map(p => p.id).indexOf(post.id);
                if(index > 0) {
                    filtPosts[index] = {...filtPosts[index], count: filtPosts[index].count+1}
                } else {
                    filtPosts.push({
                        ...post,
                        count: 1
                    })
                }
            })
        })
        setPosts(filtPosts.sort((a,b) => b.count-a.count))
    }, [filteredPosts])

    return (
        <FeedContainer>
            <CreateNewPost />
            <SearchPosts setFilters={setFilters} />
            <Posts posts={posts} />
            {postsCount === posts.length && <LoadMore onClick={() => setPostsCount(postsCount + PAGE_SIZE)} />}
        </FeedContainer>
    )
}

export default Feed

