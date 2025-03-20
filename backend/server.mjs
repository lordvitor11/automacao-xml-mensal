import express from 'express';  
import cors from 'cors';  
const app = express();

import InsertInto from './database/InsertInto.mjs';
import Search from './database/SearchContabilidade.mjs';

app.use(cors());
app.use(express.json());

app.post('/api/contabilidade', (req, res) => {
  const { nome, email, emailSec } = req.body;

  InsertInto('contabilidades', {
    nome: nome,
    email: email,
    email_sec: emailSec != '' ? emailSec : ''
  }).then(id => {
    res.status(200).json({ status: 'Sucesso', mensagem: 'Contabilidade cadastrada com sucesso!' });

  }).catch(error => {
    switch (error) {
      case 2:   
        res.status(400).json({ status: 'Alerta', mensagem: 'Contabilidade já existe.' }); break;
      case 3:
        res.status(500).json({ status: 'Erro', mensagem: 'Tabela Inválida.' }); break;
      case 4:
        res.status(500).json({ status: 'Erro', mensagem: 'Erro genérico.' }); break;
    }
  });
});

app.post('/api/usuario', (req, res) => {
  const { user, nomeFantasia, cont } = req.body;

  InsertInto('clientes', {
    nome: nome,
    nomeFantasia: nomeFantasia,
    cont: cont
  }).then(id => {
    res.status(200).json({ status: 'Sucesso', mensagem: 'Contabilidade cadastrada com sucesso!' });

  }).catch(error => {
    switch (error) {
      case 2:   
        res.status(400).json({ status: 'Alerta', mensagem: 'Cliente já existe.' }); break;
      case 3:
        res.status(500).json({ status: 'Erro', mensagem: 'Tabela Inválida.' }); break;
      case 4:
        res.status(500).json({ status: 'Erro', mensagem: 'Erro genérico.' }); break;
    }
  });
});

app.post('/api/search', async (req, res) => {
  const { tabela, target } = req.body;
  
  Search(tabela, target)
    .then(response => {
      console.log(response);
      
      // Se a resposta for um objeto único, transforma em array
      const result = Array.isArray(response) ? response : [response];
      
      res.status(200).json({ array: result });
    })
    .catch(err => {
      res.status(400).json({ mensagem: 'Dados não encontrados' });
    });
});

app.listen(5000, () => {
  console.log('Backend rodando na porta 5000');
});
