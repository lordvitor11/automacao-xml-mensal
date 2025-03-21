import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar um ID único
import "../css/FileUpload.css";

import Button from "../Components/Button";
import HomeButton from "../Components/HomeButton";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [userId, setUserId] = useState("");

  // Gera um ID único para cada usuário e salva no localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(Array.from(event.dataTransfer.files));
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Nenhum arquivo selecionado!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "x-user-id": userId, // Envia o identificador único do usuário
        },
      });

      if (response.ok) {
        setUploadStatus("Arquivos enviados com sucesso!");
        setFiles([]);
      } else {
        setUploadStatus("Erro ao enviar os arquivos.");
      }
    } catch (error) {
      setUploadStatus("Erro ao conectar com o servidor.");
      console.error("Erro no upload:", error);
    }
  };

  return (
    <div className="file-upload">
      <div
        className={`drop-area ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Arraste e solte arquivos aqui ou clique para selecionar.</p>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ color: "#007bff", cursor: "pointer" }}>
          Selecionar arquivos
        </label>
      </div>

      {files.length > 0 && (
        <div className="items">
          <h3>Arquivos Selecionados ({files.length}):</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Button texto="Enviar" tipo="button" onClick={handleUpload} /> <br />
      {uploadStatus && <p>{uploadStatus}</p>}
      <HomeButton />
    </div>
  );
};

export default FileUpload;
