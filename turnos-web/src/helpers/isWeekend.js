import { getDay } from "date-fns";

export const isWeekend = (date) => {
    const day = getDay(date);
    return day !== 0;
}