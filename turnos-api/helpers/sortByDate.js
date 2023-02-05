const sortByDate = (a, b) => {
    const { year: yearFirst, month: monthFirst, day: dayFirst, hour: hourFirst, minute: minuteFirst } = a.appointment_date_start;
    const { year: yearSecond, month: monthSecond, day: daySecond, hour: hourSecond, minute: minuteSecond } = b.appointment_date_start;
    const firstAppointmentDate = new Date(yearFirst, monthFirst, dayFirst, hourFirst, minuteFirst, 0);
    const secondAppointmentDate = new Date(yearSecond, monthSecond, daySecond, hourSecond, minuteSecond, 0)
    return firstAppointmentDate - secondAppointmentDate;
}

module.exports = {
    sortByDate
}