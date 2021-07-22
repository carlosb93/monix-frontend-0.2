import moment from 'moment';

export const toTimestamp = strDate => {
    var datum = Date.parse(strDate);
    return datum/1000;
    }

export const toDatetime = strDate => {
    var newDate = moment(new Date(strDate * 1000)).format('MM/DD/YYYY');
    return newDate
    }