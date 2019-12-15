import * as moment from 'moment';
import { fbAuth } from '../App';
import { getIncrement } from './firebase';
import { toast } from 'react-toastify';

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
    if (!date) return;
    let momentDate = moment(date.toDate());
    const format = moment().diff(momentDate, 'hours') < 24 ? 'HH:mm' : 'DD/MM/YYYY'
    return momentDate.format(format);
}

export const showSuccessToast = message => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        className: 'toast'
    });
}

export const showErrorToast = message => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        className: 'toast'
    });
}

export const showInfoToast = message => {
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        className: 'toast',
        autoClose: 20000
    });
}
