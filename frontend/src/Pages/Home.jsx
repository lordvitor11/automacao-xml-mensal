import React from "react";
import Button from '../Components/Button'

function Home() {
  return <>
    <section className='options'>
      <Button texto='Enviar XML' funcId='enviar' />
      <Button texto='Cadastrar Cliente' funcId='c-cliente' />
      <Button texto='Cadastrar Contabilidade' funcId='c-contabilidade' />
      <Button texto='Histórico de Envios' funcId='historico' />
    </section>
  </>
}

export default Home;
