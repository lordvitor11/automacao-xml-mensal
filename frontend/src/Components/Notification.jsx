import React from 'react';
import '../css/Notification.css'


const Notification = ({ titulo, descricao, tipo }) => {
    const alertType = tipo || 'default';

    return (
        <div className='popup'>
            <h1>{titulo}</h1>
            <p>{descricao}</p>
        </div>
    );
};

export default Notification;