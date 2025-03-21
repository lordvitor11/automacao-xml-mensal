import React from "react";
import Button from '../Components/Button'

function Home() {
  return <>
    <h1>Automação XML Mensal</h1>
    <section className='options'>
      <Button imgUrl='/assets/enviar-xml.png' funcId='enviar' style={true} />
      <Button imgUrl='/assets/cadastrar-cliente.png' funcId='c-cliente' style={true} />
      <Button imgUrl='/assets/cadastrar-contabilidade.png' funcId='c-contabilidade' style={true} />
      <Button imgUrl='/assets/consultar-historico.png' funcId='historico' style={true} />
    </section>
  </>
}

export default Home;
