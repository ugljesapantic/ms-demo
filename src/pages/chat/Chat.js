import React, {useContext} from 'react'
import { Switch } from 'react-router-dom'
import UserRoute from '../../navigation/UserRoute';
import { Conversation } from '../conversation/Conversation';
import { ChatsContext } from '../../App';

export const Chat = () => {
    const chatsContext = useContext(ChatsContext);

    console.log(chatsContext)

    return (
        <div>
            chaaats
            <Switch>
                <UserRoute path="/chat/:id">
                    <Conversation />
                </UserRoute>
            </Switch>
        </div>
    )
}
