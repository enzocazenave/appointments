export const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        backgroundColor: isSelected ? '#009669' : '#00CC8F',
        borderRadius: '4px',
        opacity: 0.8,
        color: '#F0F0F0'
    }

    return {
        style
    }
}