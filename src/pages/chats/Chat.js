import React, {useContext} from 'react'
import styled from 'styled-components';
import { ChatsContext } from '../../App';
import UserAvatar from '../../components/UserAvatar';

const ChatContainer = styled.div`
    display: grid;
    height: 4rem;
    grid-template-columns: 4rem auto 5rem;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom: 1px solid lightgray;
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

const UndreadCount = styled.div`
  grid-column: 3;
  grid-row: 2;
  border-radius: 0.75rem;
  background-color: #06d755;
  color: white;
  width: min-content;
  min-width: 1.5rem;
  line-height: 1.5rem;
  height: 1.5rem;
  font-weight: bold;
  text-align: center;
  justify-self: center;
  font-size: 0.8rem;
  padding: 0 0.4rem;
`;

export const Chat = ({participants}) => {
    const chatsContext = useContext(ChatsContext)
    const participant = chatsContext.participants[participants[0]];
    const participantName = `${participant.firstname} ${participant.lastname}`;

    // TODO For now it works only with 1 participant
    return (
        <ChatContainer>
            <ChatAvatar>
                <UserAvatar name={`${participant.firstname} ${participant.lastname}`} uid={participant.id} />
            </ChatAvatar>
            <ParticipantName>
                {participantName}
            </ParticipantName>
            <LastMessageTime>
                11/33/1111
            </LastMessageTime>
            <LastMessage>
                poslendjadpfo asdflkn asdkfjn askdfjn askdfjn
            </LastMessage>
            <UndreadCount>
                7
            </UndreadCount>
        </ChatContainer>
    )
}
