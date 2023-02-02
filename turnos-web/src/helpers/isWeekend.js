import { getDay } from "date-fns";

export const isWeekend = (date, days) => {
    const day = getDay(date);
    return days.includes(day);
}