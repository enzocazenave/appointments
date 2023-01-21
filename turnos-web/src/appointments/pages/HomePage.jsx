import styles from '../../styles/appointments/pages/HomePage.module.css';
import { Link } from 'react-router-dom';
import image from '../../../assets/phone.png';
import { Instagram } from '../../svgs/Instagram';
import { Linkedin } from '../../svgs/Linkedin';
import { Mail } from '../../svgs/Mail';


export const HomePage = () => {
    return (
        <>
            <div className={ styles.container }>
                <div className={ styles.containerText }>
                    <h1 className={ styles.title }>
                        Es fácil reservar un
                        <br/>
                        turno en 
                        &nbsp;
                        <span className={ styles.titleColor }>
                            Turnate
                        </span>.
                    </h1>

                    <p className={ styles.text }>
                        ¿Cómo de fácil? Simplemente tenes que buscar comercios 
                        que estén adheridos a <span className={ styles.textColor }>Turnate</span>, entrar a su perfil, hacer 
                        click en el botón de "Reservá un turno" y seguir las 
                        instrucciones.
                    </p>
                </div>

                <div className={ styles.containerSuggest }>
                    <Link
                        to="/shop/1"
                        className={ styles.suggestItem }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png)',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: 'no-repeat'                        }}
                    >
                        <h3 className={ styles.suggestItemTitle }>
                            Sizo Gerard
                        </h3>
                    </Link>
                    <Link 
                        to="/shop/2"
                        className={ styles.suggestItem }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png)',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: 'no-repeat'                        }}
                    >
                        <h3 className={ styles.suggestItemTitle }>
                            Lavadero Mitre
                        </h3>
                    </Link>
                    <Link 
                        to="/shop/3"
                        className={ styles.suggestItem }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png)',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: 'no-repeat'                        }}
                    >
                        <h3 className={ styles.suggestItemTitle }>
                            Peladitos
                        </h3>
                    </Link>
                    <Link 
                        to="/shop/4"
                        className={ styles.suggestItem }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png)',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <h3 className={ styles.suggestItemTitle }>
                            Zion
                        </h3>
                    </Link>
                </div>
            </div>
            <div className={ styles.container }>
                <div className={ styles.secondContainer }>
                    <img 
                        className={ styles.containerImage }
                        src={ image } 
                    />

                    <div className={ styles.rightSecondContainer }>
                        <h1 className={ styles.secondTitle }>
                            Disponible para iOS y Android.
                        </h1>

                        <p className={ styles.secondText }>
                            Podes descargar la aplicación en las tiendas
                            nativas de ambos dispositivos.
                        </p>

                        <div className={ styles.buttons }>
                            <button className={ styles.button }>App Store</button>
                            <button className={ styles.button }>Play Store</button>
                        </div>
                    </div>
                </div>

                <div className={ styles.socialContainer }>
                    <span>
                        REDES SOCIALES
                    </span>

                    <div className={ styles.socialContainerIcons }>
                        <Instagram width={ 70 } height={ 70 } className={ styles.icon } />
                        <Linkedin width={ 55 } height={ 55 } className={ styles.icon } />
                        <Mail width={ 60 } height={ 70 } className={ styles.icon } />
                    </div>
                </div>
            </div>
                
        </>
    )
}