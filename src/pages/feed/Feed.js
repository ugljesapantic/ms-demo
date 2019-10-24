import React, { useEffect, useState } from 'react'
import { LimitedWidthContainer } from '../../styles/utils';
import CreateNewPost from './CreateNewPost';
import Posts from './Posts';
import { getFirestore, querySnapshotToArray } from '../../utils/firebase';
import LoadMore from '../../components/LoadMore';

const PAGE_SIZE = 25;

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
        <LimitedWidthContainer>
            <CreateNewPost />
            <Posts posts={posts} />
            <LoadMore onClick={() => setPostsCount(postsCount + PAGE_SIZE)} />
        </LimitedWidthContainer>
    )
}

export default Feed

