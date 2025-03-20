import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/Button.css'

const HomeButton = () => {
    const navigate = useNavigate();
    return <>
        <input className='button' onClick={() => navigate('/') } type='button' value='Voltar' />
    </>
};

export default HomeButton;