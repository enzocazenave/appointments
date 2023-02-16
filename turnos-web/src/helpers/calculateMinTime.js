export const calculateMinTime = (currentDate, selecteDate, minDate, maxDate) => {
    const { appointment_date } = selecteDate;

    if (currentDate < appointment_date) return {
        minute: minDate?.minute,
        hour: minDate?.hour
    } 

    if (currentDate.getHours() > minDate?.hour) return {
        minute: currentDate.getMinutes(),
        hour: currentDate.getHours()
    }

    return {
        minute: minDate?.minute,
        hour: minDate?.hour
    } ;
}