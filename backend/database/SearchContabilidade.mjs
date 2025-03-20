import CreateConnect from './CreateConnect.mjs';

function Search(tabela, id = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await CreateConnect();

            if (!["contabilidades", "clientes"].includes(tabela)) {
                reject("Tabela inválida. Escolha 'contabilidades' ou 'clientes'.");
                return;
            }

            let query = `SELECT id, nome FROM ${tabela}`;
            let valores = [];

            if (id !== null) {
                query += ` WHERE id = ?`;
                valores.push(id);
            }

            db.all(query, valores, (err, rows) => {
                if (err) {
                    console.error(`Erro ao buscar dados na tabela ${tabela}:`, err.message);
                    reject(err);
                } else {
                    resolve(rows.length === 1 ? rows[0] : rows);
                }
            });

            db.close();
        } catch (error) {
            reject(error);
        }
    });
}

export default Search;
