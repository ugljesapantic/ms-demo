import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components';
import { ChatsContext, fbAuth } from '../../App';
import UserAvatar from '../../components/UserAvatar';
import { getUnreadKey, getChatTime } from '../../utils/misc';
import { UnreadCount } from '../../styles/shared';

const ChatContainer = styled(NavLink)`
    display: grid;
    height: 5rem;
    grid-template-columns: 4rem auto 5rem;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid lightgray;
    color: black;
    &:hover {
        background: #f3f3f3;
        color: black;
    }

    &:hover:not(.active) {
        background: #f3f3f3;
    }

    &.active {
        background: lightgray;
    }
`;

const ChatAvatar = styled.div`
    grid-column: 1;
    grid-row: 1/3;
    justify-self: center;
`

const ParticipantName = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const LastMessageTime = styled.div`
  grid-column: 3;
  grid-row: 1;
  justify-self: center;
  font-size: 0.8rem;
`;

const LastMessage = styled.div`
    grid-column: 2;
    grid-row: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.9rem;
`;


export const Chat = ({chat}) => {
    const chatsContext = useContext(ChatsContext)
    
    const otherParticipant = chatsContext.participants[chat.participants.filter(id => fbAuth.currentUser.uid !== id)[0]];
    const otherParticipantName = `${otherParticipant.firstname} ${otherParticipant.lastname}`;
    const myUnreadCount = chat[getUnreadKey(fbAuth.currentUser.uid)];

    // TODO For now it works only with 1 participant
    return (
        <ChatContainer activeClassName='active' to={`/chat/${chat.id}`} >
            <ChatAvatar>
                <UserAvatar name={otherParticipantName} uid={otherParticipant.id} />
            </ChatAvatar>
            <ParticipantName>
                {otherParticipantName}
            </ParticipantName>
            <LastMessageTime>
                {getChatTime(chat.lastMessageTime)}
            </LastMessageTime>
            <LastMessage>
                {chat.lastMessage}
            </LastMessage>
            {!!myUnreadCount && <UnreadCount>
                {myUnreadCount}
            </UnreadCount>}
        </ChatContainer>
    )
}
