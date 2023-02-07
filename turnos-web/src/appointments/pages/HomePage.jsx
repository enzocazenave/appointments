import styles from '../../styles/appointments/pages/HomePage.module.css';
import { Link } from 'react-router-dom';
import image from '../../../assets/phone.png';
import { Instagram } from '../../svgs/Instagram';
import { Linkedin } from '../../svgs/Linkedin';
import { Mail } from '../../svgs/Mail';
import { ShopSuggest } from '../components';
import { useEffect, useState } from 'react';
import turnos from '../../api/turnos';
import { Loader } from '../../auth/components';

export const HomePage = () => {

    const [suggestedShops, setSuggestedShops] = useState([]);
    const [suggestedShopsLoaded, setSuggestedShopsLoaded] = useState(false);

    useEffect(() => {
        turnos.get(`/shops?random=true`).then(({ data }) => setSuggestedShops(data.shops));
    }, []);

    return (
        <>
            <div className={ styles.container }>
                <div className={ styles.containerText }>
                    <h1 className={ styles.title }>
                        Es fácil reservar un
                        <br/>
                        turno en
                        <span className={ styles.titleColor }> Turnate</span>.
                    </h1>

                    <p className={ styles.text }>
                        ¿Cómo de fácil? Simplemente tenes que buscar comercios 
                        que estén adheridos a <span className={ styles.textColor }>Turnate</span>, entrar a su perfil, hacer 
                        click en el botón de "Reservá tu turno" y seguir las 
                        instrucciones.
                    </p>
                </div>

                <div className={ styles.containerSuggest }>
                    {(suggestedShops.length > 0) 
                        ? (
                            suggestedShops.map(suggestedShop => (
                                <ShopSuggest 
                                    key={ suggestedShop._id }
                                    id={ suggestedShop._id } 
                                    title={ suggestedShop.title }
                                    image={ suggestedShop.image }
                                />
                            ))
                        )
                        : <Loader />
                    }
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
                        <Linkedin width={ 70 } height={ 45 } className={ styles.icon } />
                        <Mail width={ 60 } height={ 70 } className={ styles.icon } />
                    </div>
                </div>
            </div>
                
        </>
    )
}