import styles from './notification.module.css'

const Notification = ({text, color}) => {
    if (!text) return null

    return <div className={styles.notification} style={{color}} >
        {text}
    </div>
}

export default Notification