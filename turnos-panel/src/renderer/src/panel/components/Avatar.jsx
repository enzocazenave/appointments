export const Avatar = ({ 
    src = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg', 
    width = '25px', 
    height = '25px', 
    circle = true 
}) => {
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