import * as moment from 'moment';

export const passedTime = date => {
    if (!date) return;
    const diff = moment().diff(new Date(date), 'seconds');
    // TODO moment locale serbia cyrilic
    return moment.duration(-diff, 'second').humanize(true);    
}