import React, { useEffect, useCallback, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';
import { fbFirestore, fbAuth, ChatsContext } from '../../App';
import { decomposeChatKey, getUnreadObject, getUnreadKey } from '../../utils/misc';
import { StyledArea } from '../../styles/shared';
import IconButton from '../../components/IconButton';
import styled, {css} from 'styled-components';
import { querySnapshotToArray, getTimestamp } from '../../utils/firebase';
import responsive from '../../styles/responsive';
import UserAvatar from '../../components/UserAvatar';

import { useHistory } from 'react-router-dom'
import useDevice from '../../hooks/responsive';


const StyledIconButton = styled(IconButton)`
    margin: auto;
`

const StyledBackButton = styled(IconButton)`
    margin: 0 1rem;
`

const MobileHeader = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  border: 1px solid lightgray;
  background: #f3f3f3;
`;

const ConversationName = styled.div`
  margin-left: 1rem;
`;

const NewMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  background: lightgray;

  ${StyledArea} {
      flex: 0 0 calc(100% - 5rem);
      margin-left: 1rem;
  }
`;

const ConversationContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: white;

    ${responsive.tablet(css`
        position: static;
        background: inherit;
    `)}
`

const MessagesList = styled.div`
    display: flex;
    flex-direction: column-reverse;
    flex: 1 1 0;
    overflow: auto;
    padding: 0.8rem;
    background: white;
`;

const Message = styled.div`
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    margin-bottom: 0.3rem;
    max-width: 80%;
    width: fit-content;
    background-color: lightgray;
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
    const hist = useHistory();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(null);
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
        let chat = await query.get();
        if (!chat.exists) {
            const participantIds = decomposeChatKey(id);
            const newChat = {
                participants: participantIds,
                ...getUnreadObject(participantIds, true),
                lastMessageTime: null
                // seenTime: current timestamp???s
            }
            await query.set(newChat);
            chat = await query.get();
        }

        setChat(chat.data())
        setLoading(false);
    }, [setLoading, setChat, id])

    useEffect(() => {
        loadData(() =>  http('getConversation', 'GET', {id}, null, true))
    }, [id, loadData])

    useEffect(() => {
        const unsubscribe = getMessagesQuery().orderBy('timestamp', 'desc').onSnapshot(doc => {
            setMessages(querySnapshotToArray(doc));
            getChatQuery().update({
                [getUnreadKey(fbAuth.currentUser.uid)]: 0
            })
        })

        return () => unsubscribe();
    }, [setMessage, getMessagesQuery, getChatQuery]);

    // TODO copy pasted, see if there is solution to reu
    const chatsContext = useContext(ChatsContext);
    const {isMobile} = useDevice();

    // TODO Uniform loading screen
    if (!chat) return <ConversationContainer>Loading...</ConversationContainer>

    // TODO a lot of defensive code, cause by participants loaded async in other component
    const otherParticipant = chatsContext.participants[chat.participants.filter(id => fbAuth.currentUser.uid !== id)[0]];
    const otherParticipantName = otherParticipant && `${otherParticipant.firstname} ${otherParticipant.lastname}`;

    return (
        <ConversationContainer>
            {otherParticipant && isMobile && <MobileHeader>
                <StyledBackButton size='large' onClick={() => hist.push('/chat')} name='arrow left'/>
                <UserAvatar name={otherParticipantName} uid={otherParticipant.id} />
                <ConversationName> {otherParticipantName} </ConversationName>
            </MobileHeader>}
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
                {message && <StyledIconButton size='large' onClick={sendMessage} name='paper plane'/>}
            </NewMessageContainer>

        </ConversationContainer>
    )
}
