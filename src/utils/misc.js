import * as moment from 'moment';

export const passedTime = serverTimestamp => {
    if (!serverTimestamp) return;
    const diff = moment().diff(serverTimestamp.toDate(), 'seconds');
    // TODO moment locale serbia cyrilic
    return moment.duration(-diff, 'second').humanize(true);    
}