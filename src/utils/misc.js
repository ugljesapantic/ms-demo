import * as moment from 'moment';
import { fbAuth } from '../App';
import { getIncrement } from './firebase';

export const passedTime = date => {
    if (!date) return;
    const diff = moment().diff(new Date(date), 'seconds');
    // TODO moment locale serbia cyrilic
    return moment.duration(-diff, 'second').humanize(true);    
}

export const createComposideChatKey = participantIds => participantIds.sort((a, b) => a < b ? -1 : 1).join('_');

export const decomposeChatKey = key => key.split('_');

export const getUnreadKey = id => `unread_${id}`;

export const getUnreadObject = (participantIds, isNew) => {
    return participantIds.reduce((acc, curr) => ({
        ...acc,
        [getUnreadKey(curr)]: isNew || (curr === fbAuth.currentUser.uid) ? 0 : getIncrement()
    }), {})
}

export const getChatTime = date => {
    let momentDate = moment(date.toDate());
    const format = moment().diff(momentDate, 'hours') < 0 ? 'HH:mm' : 'DD/mm/YYYY'
    return momentDate.format(format);
}