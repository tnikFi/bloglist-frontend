import styles from './notification.module.css'
import PropTypes from 'prop-types'

const Notification = ({text, color}) => {
    if (!text) return null

    return <div className={styles.notification} style={{color}} >
        {text}
    </div>
}

Notification.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
}

Notification.displayName = 'Notification'

export default Notification