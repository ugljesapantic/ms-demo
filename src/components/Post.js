import React from 'react'

import { useHistory } from 'react-router-dom'

import styled, {css} from 'styled-components';
import UserAvatar from './UserAvatar';
import { boxStyles } from '../styles/shared';
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
`;

const Time = styled.div`
  font-size: 12px;
`;

const Title = styled.pre`
    margin-top: 10px;
    font-family: 'Roboto';
`

const Desciption = styled.pre`
    white-space: pre-wrap;
    font-family: 'Roboto';
`

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;    
`

// TODO cssIf(matched)``
const Tag = styled.div`
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 1rem;
    background-color: ${({matched}) => matched ? 'lightgreen' : 'lightgray'};
`


export const Post = React.memo(({post, details, selectedTags}) => {
    let history = useHistory();
    return <PostContainer details={details} onClick={() => !details && history.push(`/feed/${post._id}`)} >
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
                {post.tags.map(tag => <Tag matched={selectedTags.includes(tag._id)} key={tag._id}>{tag.name}</Tag>)}
            </TagList>
        </React.Fragment>}
    </PostContainer>
})
