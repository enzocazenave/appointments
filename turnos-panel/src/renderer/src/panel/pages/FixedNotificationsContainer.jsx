import { useContext, useEffect } from 'react';
import { UiContext } from '../../contexts/UiContext';
import styles from '../../styles/panel/pages/FixedNotificationsContainer.module.css';
import { CircleCheck, CircleCross } from '../../svgs';

const FixedNotification = ({ id, type, text, removeNotification, location, duration }) => {

    useEffect(() => {
        setTimeout(() => {
            removeNotification(id, location);
        }, duration);
    }, []);

    return (
        <div className={`
            ${ styles.notificationContainer }
            ${ (type === 'error') ? styles.notificationContainerError : styles.notificationContainerSuccess }
        `}>
            <div className={ styles.notificationBox }>
                { (type === 'error') 
                    ? <CircleCross width={ 20 } height={ 20 } />
                    : <CircleCheck width={ 20 } height={ 20 } />
                }
                <span className={ styles.notificationText }>
                    { text }
                </span>
            </div>
            <div 
                className={ styles.notificationProgressBar }
                style={{
                    animationDuration: `${ duration / 1000 }s`
                }}
            ></div>
        </div>
    )
}

export const FixedNotificationsContainer = () => {

    const { notifications, removeNotification } = useContext(UiContext);

    return (
        <div className={ styles.container }>
            <div className={ styles.locations }>
                {notifications?.left?.map(notification => (
                    <FixedNotification
                        key={ notification.id }
                        id={ notification.id }
                        type={ notification.type } 
                        text={ notification.text } 
                        removeNotification={ removeNotification }
                        duration={ notification.duration }
                        location="left"
                    />
                ))}
            </div>
            <div className={ styles.locations }>
                {notifications?.center?.map(notification => (
                    <FixedNotification 
                        key={ notification.id }
                        id={ notification.id }
                        type={ notification.type } 
                        text={ notification.text } 
                        removeNotification={ removeNotification }
                        duration={ notification.duration }
                        location="center"
                    />
                ))}
            </div>
            <div className={ styles.locations }>
                {notifications?.right?.map(notification => (
                    <FixedNotification 
                        key={ notification.id }
                        id={ notification.id }
                        type={ notification.type } 
                        text={ notification.text } 
                        removeNotification={ removeNotification }
                        duration={ notification.duration }
                        location="right"
                    />
                ))}
            </div>
        </div>
    )
}
