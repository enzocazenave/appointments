import {
    background,
    container
} from '../../styles/appointments/components/Modal.module.css';

export const Modal = ({ children, isOpen = false }) => {
    return (
        <>
            {
                (isOpen) && (
                    <div className={ background }>
                        <div className={ container }>
                            { children }
                        </div>
                    </div>
                )
            }
        </>
    )
}