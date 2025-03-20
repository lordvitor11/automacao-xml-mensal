import React from "react";
import { useNavigate } from 'react-router-dom'; 
import "../css/Button.css";

function Button({ texto, tipo, funcId, disabled, onClick }) {
  const navigate = useNavigate();

  const redirect = (event) => {
    const page = event.target.id;

    switch (page) {
      case 'home':
        navigate('/'); break;
      case 'enviar':
        navigate('/enviar'); break;
      case 'c-cliente':
        navigate('/cliente'); break;
      case 'c-contabilidade':
        navigate('/contabilidade'); break;
      case 'historico':
        navigate('/historico'); break;
      default:
        navigate('/notfound');
    }
  };

  const handleClick = onClick || redirect;
  const buttonType = tipo || 'button';
  const functionId = funcId || 'button';
  const buttonDisabled = disabled || false;

  return (
    <input 
      className={`button ${disabled ? 'disabled' : ''}`} 
      id={functionId} 
      onClick={handleClick} 
      type={buttonType} 
      value={texto} 
      disabled={buttonDisabled} 
    />
  );
}

export default Button;
