import React, { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';
import { fbFirestore, fbAuth } from '../../App';
import { decomposeChatKey, getUnreadObject } from '../../utils/misc';
import { StyledArea } from '../../styles/shared';
import IconButton from '../../components/IconButton';
import styled, {css} from 'styled-components';
import { querySnapshotToArray, withCreatedAt, getTimestamp, getIncrement } from '../../utils/firebase';

const StyledIconButton = styled(IconButton)`
    margin: auto;
    cursor: pointer;
`

const NewMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  ${StyledArea} {
      flex: 0 0 calc(100% - 160px);
      margin-left: 80px;
  }
`;

const ConversationContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MessagesList = styled.div`
    display: flex;
    flex-direction: column-reverse;
    flex: 1 1 0;
    overflow: auto;
    padding: 0.8rem 80px;
    background: lightgray;
`;

const Message = styled.div`
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    margin-bottom: 0.3rem;
    max-width: 80%;
    width: fit-content;
    background-color: white;
    ${({isMine}) => isMine && css`
        margin-left: auto;
        background-color: #005FFF;
        color: white;
    `}
`

const PaddingPlaceholder = styled.div`
  height: 0.8rem;
  min-height: 0.8rem;
  width: 100%;
`;

export const Conversation = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const getMessagesQuery = useCallback(() => fbFirestore.collection('chats').doc(id).collection('messages'), [id]);
    const getChatQuery = useCallback(() => fbFirestore.collection('chats').doc(id), [id]);


    const sendMessage = async () => {
        // Add some state for sending message
        setMessage('');
        const timestamp = getTimestamp()
        const dbo = {
            participantUid: fbAuth.currentUser.uid,
            text: message,
            timestamp
        }

        const batch = fbFirestore.batch();
        
        let newMessage = getMessagesQuery().doc();
        await batch.set(newMessage, dbo);

        const participantIds = decomposeChatKey(id);
        const unreadCount = getUnreadObject(participantIds)

        await batch.update(getChatQuery(), {
            lastMessageTime: timestamp,
            lastMessage: message,
            ...unreadCount
        });
        batch.commit();
    }

    const loadData = useCallback(async () => {
        // TODO actually only check if conv exists in the context, if not create...
        const query = fbFirestore.collection('chats').doc(id);
        // Make it live
        let conversation = await query.get();
        if (!conversation.data()) {
            const participantIds = decomposeChatKey(id);
            const newChat = {
                participants: participantIds,
                ...getUnreadObject(participantIds, true)
                // seenTime: participantIds.reduce((prev, curr) => ({...prev, [curr]: 0 }), {}),
            }
            await query.set(newChat);
            conversation = await query.get();
        }

        // TODO add info about 
        setLoading(false);
    }, [setLoading, id])

    useEffect(() => {
        loadData(() =>  http('getConversation', 'GET', {id}, null, true))
    }, [id, loadData])

    useEffect(() => {
        getMessagesQuery().orderBy('timestamp', 'desc').onSnapshot(doc => {
            setMessages(querySnapshotToArray(doc))
        })
    }, [setMessage, getMessagesQuery, getChatQuery])

    return (
        <ConversationContainer>
            <MessagesList>
                {messages.map(message => <Message 
                    isMine={message.participantUid === fbAuth.currentUser.uid}
                    key={message.id}
                >{message.text}</Message>)}
                <PaddingPlaceholder />
            </MessagesList>

            <NewMessageContainer>
                <StyledArea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    minRows={1}
                    name="message"
                    onKeyDown={e => e.key === "Escape" && setMessage('')}
                    placeholder={'Enter message...'}
                />
                {message && <StyledIconButton onClick={sendMessage} name='paper plane'/>}
            </NewMessageContainer>

        </ConversationContainer>
    )
}
