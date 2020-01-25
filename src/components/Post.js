import React from 'react'

import { useHistory } from 'react-router-dom'

import styled, {css} from 'styled-components';
import UserAvatar from './UserAvatar';
import { boxStyles, StyledTag, lightText } from '../styles/shared';
import { passedTime } from '../utils/misc';


const PostContainer = styled.div`
  ${boxStyles}
  display: flex;
  flex-direction: column;
    ${({details}) => !details && css`
        cursor: pointer;
    `}
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
    font-size: 1.2rem;
`;

const Time = styled.div`
  font-size: 12px;
  ${lightText}
`;

const Title = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    white-space: pre-wrap;
`

const Desciption = styled.div`
    white-space: pre-wrap;
    margin: 1rem 0;
`

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;    
`



export const Post = React.memo(({post, details, selectedTags}) => {
    let history = useHistory();
    return <PostContainer details={details} onClick={e => {
        e.stopPropagation();
        e.preventDefault();

        !details && history.push(`/feed/${post._id}`)
    }} >
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
            <Desciption>
                {post.description}
            </Desciption>
            <TagList>
                {post.tags.map(tag => <StyledTag matched={selectedTags.includes(tag._id)} key={tag._id}>{tag.name}</StyledTag>)}
            </TagList>
        </React.Fragment>}
    </PostContainer>
})
