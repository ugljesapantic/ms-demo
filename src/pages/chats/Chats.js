import React, {useContext} from 'react'
import { Switch } from 'react-router-dom'
import UserRoute from '../../navigation/UserRoute';
import { Conversation } from '../conversation/Conversation';
import { ChatsContext, fbAuth } from '../../App';

import styled, {css} from 'styled-components';
import { LimitedWidthContainer } from '../../styles/utils';
import { Chat } from './Chat';
import responsive from '../../styles/responsive';

const ChatContainer = styled(LimitedWidthContainer)`
    padding: 1rem;
  display: flex;
  position: relative;
`;

const ChatList = styled.div`
    height: 100%;
    overflow: auto;
    flex: 1;

    ${responsive.tablet(css`
        flex: 0 0 300px;
    `)};

    background-color: white;
  border: 1px solid lightgray;
`

export const Chats = () => {
    const chatsContext = useContext(ChatsContext);
    
    return (
        <ChatContainer>
            <ChatList>
                {chatsContext.chats.map(chat => <Chat
                    chat={chat}
                    key={chat.id}
                />)}
            </ChatList>
            <Switch>
                <UserRoute path="/chat/:id">
                    <Conversation />
                </UserRoute>
            </Switch>
        </ChatContainer>
    )
}
