import styles from '../../styles/panel/components/CommerceStatus.module.css';
import { Cash, CircleCheck, CircleCross } from '../../svgs';

const SvgsConfig = {
    width: 12,
    height: 12
}

export const CommerceStatus = ({ payed = false }) => {
    return (
        <div className={ styles.status }>
            <Cash stroke={ (payed) ? '#00cc8f' : '#ff2825' } />

            <div className={ styles.rightZone }>
                <h3 className={ styles.statusTitle }>Estado de comercio</h3>

                <div className={ styles.statusContainer }>
                    {(payed)
                        ? (<>
                            <CircleCheck {...SvgsConfig} />
                            <span className={ styles.statusText }>Mes de febrero pago</span>
                        </>)
                        : (<>
                            <CircleCross { ...SvgsConfig } />
                            <span className={ styles.statusTextError }>Restan 7 días para pagar el mes de febrero</span>
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}
