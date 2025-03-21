import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnviarNext = () => {
    const [userId, setUserId] = useState("");
    const [files, setFiles] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            fetchFiles(storedUserId);
        }
    }, []);

    const fetchFiles = async (userId) => {
        try {
            const response = await axios.get(`/api/files/${userId}`);
            setFiles(response.data.files);
        } catch (error) {
            console.error("Erro ao buscar arquivos:", error);
        }
    };

    const handleRemoveFile = async (fileName) => {
        try {
            await axios.delete(`/api/files/${userId}/${fileName}`);
            setFiles(files.filter((file) => file.name !== fileName));
        } catch (error) {
            console.error("Erro ao remover arquivo:", error);
        }
    };

    const handleConfirm = async () => {
        if (!userEmail) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        try {
            await axios.post("/api/send-email", {
                userEmail,
                userId,
                files,
            });
            alert("E-mail enviado com sucesso!");
            navigate("/sucesso");
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
        }
    };

    return (
        <div>
            <h2>Resumo dos Arquivos Enviados</h2>
            <ul>
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <li key={index}>
                            {file.name}
                            <button onClick={() => handleRemoveFile(file.name)}>Remover</button>
                        </li>
                    ))
                ) : (
                    <p>Nenhum arquivo enviado.</p>
                )}
            </ul>

            <input
                type="email"
                placeholder="Digite seu e-mail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <button onClick={handleConfirm}>Confirmar e Enviar E-mail</button>
        </div>
    );
};

export default EnviarNext;
