import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { UserIcon } from '../../svgs/UserIcon';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useForm } from '../../hooks';

const initialForm = {
    shop: ''
}

export const Navbar = () => {

    const { shop, onInputChange } = useForm(initialForm);

    return (
        <div className={ styles.container }>
            <div className={ styles.brand }>
                <Calendar width={ 35 } fill="rgb(244, 233, 233)" height={ 35 } />
                <span className={ styles.brandText }>Turnate</span>
            </div>

            <div className={ styles.searchBar }>
                <input 
                    className={ styles.searchBarInput } 
                    type="text" 
                    placeholder="Buscá tu comercio"
                    name="shop"
                    value={ shop }
                    onChange={ onInputChange }
                />
                <MagnifyingGlass width={ 20 } height={ 20 } />
            </div>

            <div className={ styles.user }>
                <UserIcon width={ 25 } height={ 25 } fill="rgb(244,233,233)" />
                <span className={ styles.username }>Enzo Cazenave</span>
            </div>
        </div>
    )
}