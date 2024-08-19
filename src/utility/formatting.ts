import { DayValue } from '../types/days';

export const convertUTCToLocale = (utcDateStr: string) => {
    // Convert to a Date object (interpreted as UTC)
    const utcDate = new Date(utcDateStr);

    // The Date object automatically converts to local time
    // console.log(utcDate.toString()); // Outputs the local date and time
    return utcDate;
};

export const createDateFromString = (value: DayValue) => {
    const parsed = value.date.split('-');
    return new Date(
        parseInt(parsed[0]),
        parseInt(parsed[1]) - 1,
        parseInt(parsed[2])
    );
};
