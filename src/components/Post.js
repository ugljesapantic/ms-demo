import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import { boxStyles } from '../styles/shared';
import { passedTime } from '../utils/misc';


const PostContainer = styled(Link)`
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

const Title = styled.pre`
    margin-top: 10px;
    font-family: 'Roboto';
`


export const Post = React.memo(({post, details}) => <PostContainer to={`/feed/${post._id}`} >
    <PostHeader>
        <UserAvatar name={post.user} uid={post.userUid} />
        <NameAndTime>
            <Name>{post.user}</Name>
            {/* TODO add tooltip with time */}
            <Time>{passedTime(post.createdAt)}</Time>
        </NameAndTime>
    </PostHeader>
    <Title>
        {post.title}
    </Title>
    {details && <React.Fragment>
        <Title>
            {post.description}
        </Title>
    </React.Fragment>}
</PostContainer>)
