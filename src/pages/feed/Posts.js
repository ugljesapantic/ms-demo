import React from 'react';
import { Post } from '../../components/Post';


const Posts = ({posts}) => {
    return (
        <React.Fragment>
            {posts.map(post => <Post key={post._id} post={post} />)}
        </React.Fragment>
    )
}

export default Posts
