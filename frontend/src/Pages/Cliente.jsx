import React, { useState  } from 'react';

import Input from '../Components/Input';
import Button from '../Components/Button';
import HomeButton from '../Components/HomeButton';
import Select from '../Components/Select';

const Cliente = () => {
    const [validUser, setValidUser] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [validCont, setValidCont] = useState(false);
    const [user, setUser] = useState('');
    const [nomeFantaisa, setNomeFantaisa] = useState('');
    const [cont, setCont] = useState('');
    const [mensagem, setMensagem] = useState('');
    // const [options, setOptions] = useState([]);

    const HandleInput = (event) => {
        const element = event.target;
        switch (element.id) {
            case 'user':
                setValidUser(element.value !== '');
                setUser(element.value); break;
            case 'pass':
                setValidPass(element.value !== ''); 
                setNomeFantaisa(element.value); break;
            case 'contabilidade':
                setValidCont(element.value !== '');
                setCont(element.value); break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, nomeFantaisa, cont }),
        })
        .then(response => response.json())
        .then(data => {
            setMensagem(data.mensagem);
        })
        .catch(error => {
            setMensagem("Erro ao enviar dados. Tente novamente.");
            console.error("Erro ao fazer requisição:", error);
        });
    };

    const isFormValid = validUser && validPass && validCont;

    return (
        <section className='center'>
            <h1>Cadastro de Cliente</h1>
            <Input label='Nome' id='user' onInput={HandleInput} />
            <Input label='Nome fantasia' id='pass' onInput={HandleInput} />
            <Select HandleInput={HandleInput} />
            <Button texto='Cadastrar' tipo='submit' disabled={!isFormValid} onClick={handleSubmit} /> <br />
            <HomeButton />
        </section>
    );
};

export default Cliente;