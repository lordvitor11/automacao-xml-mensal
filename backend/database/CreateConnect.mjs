import fs from 'fs';
import sqlite3 from 'sqlite3';

function ccDatabase() {
    return new Promise((resolve, reject) => {
        const bancoExiste = fs.existsSync('./database/database.db');

        const db = new sqlite3.Database('./database/database.db', (err) => {
            if (err) {
                console.error("Erro ao conectar ao banco:", err.message);
                reject(err);
                return;
            }

            console.log(bancoExiste ? "Banco de dados encontrado. Conectado com sucesso!" : "Banco de dados não existia. Criando um novo...");

            db.serialize(() => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS contabilidades (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nome TEXT NOT NULL,
                        email TEXT NOT NULL UNIQUE,
                        email_sec TEXT
                    )
                `, (err) => {
                    if (err) {
                        console.error("Erro ao criar tabela contabilidades:", err.message);
                        reject(err);
                        return;
                    }
                });

                db.run(`
                    CREATE TABLE IF NOT EXISTS clientes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nome TEXT NOT NULL,
                        nome_fantasia TEXT NOT NULL UNIQUE,
                        contabilidade_id INTEGER,
                        FOREIGN KEY (contabilidade_id) REFERENCES contabilidades(id)
                    )
                `, (err) => {
                    if (err) {
                        console.error("Erro ao criar tabela clientes:", err.message);
                        reject(err);
                        return;
                    }

                    console.log("Tabelas verificadas/criadas com sucesso!");
                    resolve(db);
                });
            });
        });
    });
}

export default ccDatabase;
