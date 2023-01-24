import { useState } from 'react';
import { useAuthContext } from '../../hooks';
import styles from '../../styles/appointments/pages/ProfilePage.module.css';
import { Profile } from '../../svgs/Profile';
import { Save } from '../../svgs/Save';
import { Loader } from '../../auth/components/Loader';
import { Modal } from '../components';

const { 
    container,
    avatar,
    noEditableContainer,
    noEditableItem,
    noEditableItemLabel,
    noEditableItemInput,
    editableContainer,
    editableItem,
    editableItemLabel,
    editableItemInput,
    saveButton,
    disabled,
    modalContainer,
    modalHeader,
    modalHeaderTitle,
    modalHeaderText,
    modalInput,
    modalButtons,
    modalButton,
    modalButtonCancel,
    errorSpan
} = styles;

const ModalEmailChange = ({ setIsModalOpen, isModalOpen, email, emailValue, setEmailValue }) => {

    const [code, setCode] = useState('');
    const { isLoadingEmailChange, changeUserEmailConfirm } = useAuthContext();
    const [error, setError] = useState('');

    const handleVerifyCode = () => {
        changeUserEmailConfirm(code, emailValue).then((res) => {
            if (res) {
                setIsModalOpen(false);
                setCode('');
                return;
            }

            setError('El código de verificación es inválido, vuelve a intentarlo nuevamente.')
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setEmailValue(email);
    }

    return (
        <Modal isOpen={ isModalOpen }>
            <div className={ modalContainer }>
                <div className={ modalHeader }>
                    <h1 className={ modalHeaderTitle }>Cambiar correo electrónico</h1>
                    <p className={ modalHeaderText }>Fue enviado un código de verificación al correo { emailValue }</p>
                </div>
                <input
                    type="number"
                    className={ modalInput }
                    placeholder="_ _ _ _ _ _"
                    value={ code }
                    onChange={ (e) => {
                        if (code.length === 6 && e.nativeEvent.data) return;
                        setCode(e.target.value);
                    }}
                />
                <span className={ errorSpan }>{ error }</span>
                <div className={ modalButtons }>
                    {
                        (!isLoadingEmailChange) 
                        ? (
                            <>
                                {
                                    (!error) && (
                                        <button 
                                            className={ `${ modalButton } ${code.length < 6 ? disabled : ''}` }
                                            disabled={ code.length < 6 || isLoadingEmailChange }
                                            onClick={ handleVerifyCode }
                                        >
                                            Verificar
                                        </button>
                                    )
                                }
                                    
                                <button 
                                    className={ modalButtonCancel }
                                    onClick={ handleCancel }
                                    disabled={ isLoadingEmailChange }
                                >
                                    {(error) ? 'Cerrar' : 'Cancelar'}
                                </button>
                            </>
                        )
                        : <Loader />
                    }
                </div>
            </div>
        </Modal>
    )
}

export const ProfilePage = () => {

    const { user: { name, surname, dni, email }, changeUserEmail, isLoadingEmailChange } = useAuthContext();
    const [emailValue, setEmailValue] = useState(email);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = () => {
        changeUserEmail(emailValue).then(res => {
            if (res) setIsModalOpen(true);
        }).catch(error => console.log(error));
    }

    return (
        <div className={ container }>
            <div className={ avatar }>
                <Profile width={ 118 } height={ 118 } />
            </div>

            <div className={ noEditableContainer }>
                <div className={ noEditableItem }>
                    <label htmlFor="name" className={ noEditableItemLabel }>Nombre</label>
                    <input 
                        name="name" 
                        type="text" 
                        className={ noEditableItemInput }
                        value={ name }
                        readOnly
                        disabled
                    />
                </div>
                <div className={ noEditableItem }>
                    <label htmlFor="name" className={ noEditableItemLabel }>Apellido</label>
                    <input 
                        name="name" 
                        type="text" 
                        className={ noEditableItemInput } 
                        value={ surname }
                        readOnly
                        disabled
                    />
                </div>
                <div className={ noEditableItem }>
                    <label htmlFor="name" className={ noEditableItemLabel }>DNI</label>
                    <input 
                        name="name" 
                        type="text" 
                        className={ noEditableItemInput } 
                        value={ dni }
                        readOnly
                        disabled
                    />
                </div>
            </div>

            <h2>Elementos con posibilidad de edición</h2>

            <div className={ editableContainer }>
                <div className={ editableItem }>
                    <label htmlFor="name" className={ editableItemLabel }>Correo electrónico</label>
                    <input 
                        name="name" 
                        type="text" 
                        className={ editableItemInput } 
                        value={ emailValue }
                        onChange={ (e) => setEmailValue(e.target.value) }
                    />
                </div>
            </div>

            <button 
                className={ `${ saveButton } ${(emailValue === email || isLoadingEmailChange) ? disabled : ''}` }
                disabled={ emailValue === email || isLoadingEmailChange }
                onClick={ handleSave }
            >
                <Save fill={ '#F0F0F0' } stroke={ '#DDD' } width={ 20 } height={ 20 } />
                Guardar
            </button>

            { isLoadingEmailChange && <Loader /> }

            { isModalOpen && 
                (
                    <ModalEmailChange 
                        setIsModalOpen={ setIsModalOpen } 
                        isModalOpen={ isModalOpen }
                        email={ email } 
                        emailValue={ emailValue } 
                        setEmailValue={ setEmailValue } 
                    /> 
                )
            }    
        </div>
    )
}