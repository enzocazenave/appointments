export const Avatar = ({ src, type, width = '25px', height = '25px', circle = true }) => {
    return (
        <img 
            style={{
                width,
                height,
                borderRadius: circle ? '50%' : '.5rem',
                objectFit: 'cover'
            }} 
            src={ src } 
        />
    )
}