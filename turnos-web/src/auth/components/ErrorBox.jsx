import { Error } from "../../svgs/Error";
import styles from '../../styles/auth/components/ErrorBox.module.css';

export const ErrorBox = ({ error }) => {
    return (
        <div className={ styles.container }>
            <Error width={ 20 } height={ 20 } />
            <span>{ error }</span>
        </div>   
    );   
}