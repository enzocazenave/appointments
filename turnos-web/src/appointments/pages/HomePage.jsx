import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/appointments/pages/HomePage.module.css';
import { ArrowDown } from '../../svgs/ArrowDown';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const arrayOfSomeShops = [
    {
        id: 1,
        name: 'Sizo Gerard',
        img: 'https://b2743180.smushcdn.com/2743180/wp-content/uploads/sites/10/2022/03/descarga-2.jpeg?lossy=1&strip=1&webp=1'
    },
    {
        id: 2,
        name: 'Lavadero Mitre',
        img: 'https://lavaderodeautoscarwash.com/wp-content/uploads/2020/09/Carwash-mas-conocidos-de-Buenos-Aires-lavaderos-en-caba.jpg'
    },
    {
        id: 3,
        name: 'Peladitos',
        img: 'https://media.quincemil.com/imagenes/2022/05/28012746/Peluqueria_M%C3%A1gica-8-640x360.jpg'
    }
]

export const HomePage = () => {

    const [arrayElement, setArrayElement] = useState(0);

    const handleNextOrPreviousPage = (type) => {
        if (type == 'next') {
            if (arrayElement + 1 === arrayOfSomeShops.length) return;
            return setArrayElement((currentValue) => currentValue + 1);
        }

        if (arrayElement - 1 < 0) return;
        setArrayElement((currentValue) => currentValue - 1);
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.backgroundContainer }>
                <h1 className={ styles.title }>Turnate</h1>
                <h2 className={ styles.subTitle }>Reservá turnos de forma rápida y en tiempo real en tus comercios favoritos.</h2>
                <h3 className={ styles.subSubTitle }>A continuación te mostramos algunos de los comercios adheridos a nosotros.</h3>
                <ArrowDown width={ 50 } height={ 50 } />

                
                <div className={ styles.secondContainer }>
                    <button onClick={() => handleNextOrPreviousPage('previous')}>{'<'}</button>

                    <SwitchTransition>
                        <CSSTransition 
                            classNames="fade" key={ arrayOfSomeShops[arrayElement].name } 
                            addEndListener={ (node, done) => node.addEventListener('transitionend', done, false) }
                        >
                            <Link 
                                to={ `/shop/${ arrayOfSomeShops[arrayElement].id }` }
                                className={ styles.dataContainer }
                                style={{
                                    background: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${ arrayOfSomeShops[arrayElement].img })`
                                }}
                            >
                                <span>
                                    { arrayOfSomeShops[arrayElement].name }
                                </span>
                                <p>Haz click para más información</p>
                            </Link>
                        </CSSTransition>
                    </SwitchTransition>
                    
                    <button onClick={() => handleNextOrPreviousPage('next')} >{'>'}</button>
                </div>

                <span>{arrayElement + 1}/{ arrayOfSomeShops.length }</span>
            </div>

            <div className={ styles.textContainer }>
                <img className={ styles.background } src={ '../../../../assets/circle-scatter-haikei.svg' } />
                <span className={ styles.text }>Software de gestión de turnos para comercios y clientes.</span>
            </div>
        </div>
    )
}
