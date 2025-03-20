import CreateConnect from './CreateConnect.mjs';

function InsertInto(tabela, dados) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await CreateConnect();
            
            let query = "";
            let valores = [];

            if (tabela === "contabilidades") {
                // Verifica se o e-mail já existe antes de inserir
                db.get(`SELECT id FROM contabilidades WHERE email = ?`, [dados.email], (err, row) => {
                    if (err) {
                        console.error("Erro ao verificar e-mail:", err.message);
                        reject(5); // Erro genérico
                        return;
                    }

                    if (row) {
                        console.log("E-mail já cadastrado.");
                        reject(2); // E-mail duplicado
                        return;
                    }

                    // Se o e-mail não existe, insere o registro
                    query = `INSERT INTO contabilidades (nome, email, email_sec) VALUES (?, ?, ?)`;
                    valores = [dados.nome, dados.email, dados.email_sec || null];

                    db.run(query, valores, function (err) {
                        if (err) {
                            console.error("Erro ao inserir dados:", err.message);
                            reject(5); // Erro genérico
                        } else {
                            console.log(`Registro inserido na tabela ${tabela} com ID: ${this.lastID}`);
                            resolve(1); // Sucesso
                        }
                    });
                });
            } else if (tabela === "clientes") {
                // Verifica se o nome_fantasia já existe antes de inserir
                db.get(`SELECT id FROM clientes WHERE nome_fantasia = ?`, [dados.nome_fantasia], (err, row) => {
                    if (err) {
                        console.error("Erro ao verificar nome fantasia:", err.message);
                        reject(5); // Erro genérico
                        return;
                    }

                    if (row) {
                        console.log("Nome fantasia já cadastrado.");
                        reject(3); // Nome fantasia duplicado
                        return;
                    }

                    // Se o nome fantasia não existe, insere o registro
                    query = `INSERT INTO clientes (nome, nome_fantasia, contabilidade_id) VALUES (?, ?, ?)`;
                    valores = [dados.nome, dados.nome_fantasia, dados.contabilidade_id];

                    db.run(query, valores, function (err) {
                        if (err) {
                            console.error("Erro ao inserir dados:", err.message);
                            reject(5); // Erro genérico
                        } else {
                            console.log(`Registro inserido na tabela ${tabela} com ID: ${this.lastID}`);
                            resolve(1); // Sucesso
                        }
                    });
                });
            } else {
                console.log("Tabela inválida.");
                reject(4); // Tabela inválida
            }

            // Fecha a conexão com um pequeno delay para garantir que todas as queries rodem antes
            setTimeout(() => db.close(), 100);
        } catch (error) {
            reject(5); // Erro genérico
        }
    });
}

export default InsertInto;
