import React, { useEffect, useState } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import { getFirestore, querySnapshotToArray } from '../../utils/firebase';
import LoadMore from '../../components/LoadMore';
import styled from 'styled-components';

const PAGE_SIZE = 25;


const FeedContainer = styled(LimitedWidthContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    > * {
        margin: 1rem 0;
        width: 100%;
    }
`

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [postsCount, setPostsCount] = useState(PAGE_SIZE);

    useEffect(() => {
        const listener = getFirestore()
            .collection('posts')
            .limit(postsCount)
            .orderBy('createdAt', 'desc')
            .onSnapshot(doc => {
                setPosts(querySnapshotToArray(doc));
            });
        return () => listener();
    }, [postsCount]);

    return (
        <FeedContainer>
            <CreateNewPost />
            <Posts posts={posts} />
            {postsCount === posts.length && <LoadMore onClick={() => setPostsCount(postsCount + PAGE_SIZE)} />}
        </FeedContainer>
    )
}

export default Feed

