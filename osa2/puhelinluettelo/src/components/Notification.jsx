const Notification = ({ message, success }) => {

    const result = success ? 'success' : 'error'

    if (message === null) {
        return null
    }

    return (
        <div className={result}>
            {message}
        </div>
    )

}

export default Notification