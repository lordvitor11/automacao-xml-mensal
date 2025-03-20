import React from "react";
import '../css/Input.css';

function Input({ label, tipo, id = 'input', onInput = null, onClick = null }) {
    return <>
        <section className="input-container">
            <input onKeyUp={onInput} onClick={onClick} className="input" id={id} placeholder={label} name="input" type={tipo} />
        </section>
    </>
}

export default Input;