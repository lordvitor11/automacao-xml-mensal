import express from 'express';  
import cors from 'cors';  
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from "uuid";

import InsertInto from './database/InsertInto.mjs';
import Search from './database/SearchContabilidade.mjs';

const app = express();
app.use(cors());
app.use(express.json());

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Garante que a pasta "uploads" exista
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Middleware para criar uma pasta única por usuário
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.headers["x-user-id"] || uuidv4(); // Identificador único
    const userFolder = path.join(UPLOADS_DIR, userId);

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    req.userFolder = userFolder; // Salva o caminho da pasta do usuário
    req.userId = userId; // Guarda o ID do usuário para resposta
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/contabilidade', (req, res) => {
  const { nome, email, emailSec } = req.body;

  InsertInto('contabilidades', {
    nome: nome,
    email: email,
    email_sec: emailSec !== '' ? emailSec : ''
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
    nome: user,
    nomeFantasia: nomeFantasia,
    cont: cont
  }).then(id => {
    res.status(200).json({ status: 'Sucesso', mensagem: 'Cliente cadastrado com sucesso!' });
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
      
      const result = Array.isArray(response) ? response : [response];
      
      res.status(200).json({ array: result });
    })
    .catch(err => {
      res.status(400).json({ mensagem: 'Dados não encontrados' });
    });
});

app.post("/api/upload", upload.array("files"), (req, res) => {
  res.json({ 
    message: "Upload realizado com sucesso!", 
    userId: req.userId, 
    files: req.files 
  });
});

// Rota para listar os arquivos de um usuário
app.get("/api/files/:userId", (req, res) => {
  const userId = req.params.userId;
  const userFolder = path.join(UPLOADS_FOLDER, userId);

  if (!fs.existsSync(userFolder)) {
    return res.json({ files: [] });
  }

  const files = fs.readdirSync(userFolder).map((file) => ({
    name: file,
    path: `/uploads/${userId}/${file}`,
  }));

  res.json({ files });
});

app.delete("/api/files/:userId/:fileName", (req, res) => {
  const { userId, fileName } = req.params;
  const filePath = path.join(UPLOADS_FOLDER, userId, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.json({ message: "Arquivo removido com sucesso!" });
  }

  res.status(404).json({ message: "Arquivo não encontrado." });
});

// Rota para envio de e-mail
app.post("/api/send-email", async (req, res) => {
  const { userEmail, userId, files } = req.body;
  const userFolder = path.join(UPLOADS_FOLDER, userId);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seuemail@gmail.com",
      pass: "suasenha", // Use variáveis de ambiente para segurança!
    },
  });

  const mailOptions = {
    from: "seuemail@gmail.com",
    to: userEmail,
    subject: "Seus arquivos foram enviados!",
    text: "Segue os arquivos anexados.",
    attachments: files.map((file) => ({
      filename: file.name,
      path: path.join(userFolder, file.name),
    })),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
});

app.listen(5000, () => {
  console.log('Backend rodando na porta 5000');
});

