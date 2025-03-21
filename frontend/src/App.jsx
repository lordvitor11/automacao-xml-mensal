import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
import './App.css';

import HomePage from './Pages/Home';
import EnviarPage from './Pages/Enviar';
import NotFoundPage from './Pages/NotFound';
import ContabilidadePage from './Pages/Contabilidade';
import ClientePage from './Pages/Cliente';
import HistoricoPage from './Pages/Historico';
import SummaryPage from './Pages/EnviarNext';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} /> 
        <Route path='/enviar' element={<EnviarPage />} />
        <Route path='/notfound' element={<NotFoundPage />} />
        <Route path='/contabilidade' element={<ContabilidadePage />} />
        <Route path='/cliente' element={<ClientePage />} />
        <Route path='/historico' element={<HistoricoPage />} />
        <Route path="/resumo" element={<SummaryPage />} />
        <Route path="/sucesso" element={<h2>E-mail enviado com sucesso!</h2>} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </>
  );
}

export default App;
