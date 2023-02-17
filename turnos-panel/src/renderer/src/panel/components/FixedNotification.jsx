import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from '../../styles/panel/components/FixedNotification.module.css';
import { CircleCross } from '../../svgs';

export const FixedNotification = ({ error = 'Error' }) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false);
            }, 5000);
        }
    }, [visible]);

    return (
        <div className={ `
            ${styles.container}
            ${ visible ? styles.isVisible : styles.notVisible }
        ` }>
            <CircleCross />
            <span>{ error }</span>
        </div>
    )
}