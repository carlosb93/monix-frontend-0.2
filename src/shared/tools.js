import moment from 'moment';

export const toTimestamp = strDate => {
    var datum = Date.parse(strDate);
    console.log(datum)
    return datum/1000;
    }

export const toDatetime = strDate => {
    var newDate = moment(new Date(strDate * 1000)).format('MM/DD/YYYY');
    return newDate
    }

export const toDatetimeFull = strDate => {
    var newDate = moment(strDate).format('YYYY-MM-DD HH:mm');
    return newDate
    }
export const toDatetimeShort = strDate => {
    var newDate = moment(strDate).format('YYYY-MM-DD');
    return newDate
    }
    
export const toTimestampFull = strDate => {
    var newDate = moment(strDate).valueOf();
    return newDate
    }