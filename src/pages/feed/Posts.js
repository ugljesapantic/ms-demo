import React from 'react';
import styled from 'styled-components';
import { boxStyles } from '../../styles/shared';
import UserAvatar from '../../components/UserAvatar';
import { passedTime } from '../../utils/misc';

const PostContainer = styled.div`
  ${boxStyles}
  display: flex;
  flex-direction: column;
`;  

const PostHeader = styled.div`
  display: flex;
align-items: center;
`;

const NameAndTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

const Name = styled.div`
    font-weight: 600;
`;

const Time = styled.div`
  font-size: 12px;
`;

const Content = styled.pre`
    margin-top: 10px;
    font-family: 'Roboto';
`

const Post = ({post}) => <PostContainer>
    <PostHeader>
        <UserAvatar name={post.user} />
        <NameAndTime>
            <Name>{post.user}</Name>
            {/* TODO add tooltip with time */}
            <Time>{passedTime(post.createdAt)}</Time>
        </NameAndTime>
    </PostHeader>
    <Content>
        {post.content}
    </Content>
</PostContainer>

const Posts = ({posts}) => {
    return (
        <React.Fragment>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </React.Fragment>
    )
}

export default Posts
