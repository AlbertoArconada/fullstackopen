import React from "react";
import './Notification.css';

const Notification = ({message, type}) => {
    if(message === null) {
        return null
    }

    if(type === null) {
        type = 'success'
    }

    const NotificationStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={NotificationStyle} className={type}>
            {message}
        </div>
    )
}

export default Notification