import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import Notification from '../Components/Notification';
import HomeButton from '../Components/HomeButton';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Contabilidade = () => {
    const [nomeValid, setNomeValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [emailSec, setEmailSec] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const redirect = () => {
      navigate('/');
    };

    const HandleInput = (event) => {
        const element = event.target;

        switch (element.id) {
            case 'nome':
                setNomeValid(element.value !== ''); 
                setNome(element.value); break;
            case 'femail':
                setEmailValid(element.value !== ''); 
                setEmail(element.value); break;
            case 'semail':
                setEmailSec(element.value); break;
        }
    }

    const showNotification = () => {
        setIsVisible(!isVisible);

        setTimeout(() => {
            setIsVisible(false);
            if (status == 'Sucesso') {
                setTimeout(() => {
                    redirect();
                }, 500);
            }
        }, 3000);
    }

    const HandleSubmit = (e) => {
        fetch('http://localhost:5000/api/contabilidade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, emailSec }),
        })
        .then(response => response.json())
        .then(data => {
            setMensagem(data.mensagem);
            setStatus(data.status);
            showNotification();
        })
        .catch(error => {
            setMensagem("Erro ao enviar dados. Tente novamente.");
            console.error("Erro ao fazer requisição:", error);
        });
    };

    const isFormValid = nomeValid && emailValid;

    return (
        <section className='center'>
            <h1>Cadastro de Contabilidade</h1>

            {isVisible && (
                <Notification titulo={status} descricao={mensagem} />
            )}
            <Input label='Nome' id='nome' onInput={HandleInput} />
            <Input label='E-mail' id='femail' onInput={HandleInput} />
            <Input label='E-mail secundário' id='semail' onInput={HandleInput} />
            <Button texto='Cadastrar' tipo='submit' disabled={!isFormValid} onClick={HandleSubmit} /> <br />
            <HomeButton /> <br />
        </section>
    );
};

export default Contabilidade;