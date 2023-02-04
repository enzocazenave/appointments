export const formatDate = (date) => {

    const { day, month, year, hour, minute } = date;

    return [
        `${ day }/${ month + 1 }/${ year }`,
        `${ hour }:${ minute === 0 ? '00' : minute }`
    ]
}