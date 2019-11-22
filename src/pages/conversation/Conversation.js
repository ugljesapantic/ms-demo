import React, { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';
import { fbFirestore } from '../../App';
import { decomposeChatKey } from '../../utils/misc';
// const decomposeKey = (key: string) => key.split('_');
// const newChat = {
//     participants: participantIds,
//     unreadMessages: participantIds.reduce((prev, curr) => ({...prev, [curr]: [] }), {})
// }


export const Conversation = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true)

    const loadData = useCallback(async (apiCall) => {
        const query = fbFirestore.collection('chats').doc(id);
        // Make it live
        let conversation = await query.get();
        if (conversation.data()) {
            // Set conv
            console.log(conversation.data())
            return;
        }

        const participantIds = decomposeChatKey(id);
        // TODO Add info about participants...
        const newChat = {
            participants: participantIds,
            unreadMessages: participantIds.reduce((prev, curr) => ({...prev, [curr]: [] }), {})
        }
        console.log(newChat)
        await query.set(newChat);
        conversation = await query.get();
        console.log(conversation, 'ssssssss')
        setLoading(false);
    }, [setLoading])

    useEffect(() => {
        loadData(() =>  http('getConversation', 'GET', {id}, null, true))
    }, [id, loadData])
    return (
        <div>
            blaaaa
        </div>
    )
}
