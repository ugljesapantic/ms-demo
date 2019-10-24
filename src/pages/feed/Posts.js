import React from 'react'

const Post = ({post}) => <div style={{border: '1px solid red'}} >
    <div>{post.name}</div>
    <div>{post.title}</div>
    <div>{post.description}</div>
</div>

const Posts = ({posts}) => {
    return (
        <React.Fragment>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </React.Fragment>
    )
}

export default Posts
