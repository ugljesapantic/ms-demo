import * as moment from 'moment';

export const passedTime = date => {
    if (!date) return;
    const diff = moment().diff(new Date(date), 'seconds');
    // TODO moment locale serbia cyrilic
    return moment.duration(-diff, 'second').humanize(true);    
}

export const createComposideChatKey = participantIds => participantIds.sort((a, b) => a < b ? -1 : 1).join('_');

export const decomposeChatKey = key => key.split('_');