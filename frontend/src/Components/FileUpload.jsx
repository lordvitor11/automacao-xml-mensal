import React, { useState } from 'react';
import '../css/FileUpload.css';

import Button from '../Components/Button';
import HomeButton from '../Components/HomeButton';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); 
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const hasItem = files.length > 0;
  const hasItemClass = files.length > 0 ? '' : 'invisible';
  const countItem = files.length;

  return (
    <div className="file-upload">
      <div
        className={`drop-area ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Arraste e solte arquivos aqui ou clique para selecionar.</p>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ color: '#007bff', cursor: 'pointer' }}>
          Selecionar arquivos
        </label>
      </div>

      <div className={`items ${hasItemClass}`}>
        <h3>Arquivos Selecionados ({countItem}):</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <Button texto='Enviar' tipo='submit' /> <br />
      <HomeButton />
    </div>
  );
  
};

export default FileUpload;
