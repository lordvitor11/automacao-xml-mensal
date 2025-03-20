import CreateConnect from './CreateConnect.mjs';

function ResetDatabase() {
    CreateConnect().then(db => {
        db.serialize(() => {
            db.run("DELETE FROM clientes", (err) => {
                if (err) {
                    console.error("Erro ao limpar clientes:", err.message);
                    return;
                }
                console.log("Tabela 'clientes' limpa.");
            });

            db.run("DELETE FROM contabilidades", (err) => {
                if (err) {
                    console.error("Erro ao limpar contabilidades:", err.message);
                    return;
                }
                console.log("Tabela 'contabilidades' limpa.");
            });

            db.run("DELETE FROM sqlite_sequence WHERE name='clientes'", (err) => {
                if (err) {
                    console.error("Erro ao resetar ID de clientes:", err.message);
                    return;
                }
                console.log("Auto-increment de 'clientes' resetado.");
            });

            db.run("DELETE FROM sqlite_sequence WHERE name='contabilidades'", (err) => {
                if (err) {
                    console.error("Erro ao resetar ID de contabilidades:", err.message);
                    return;
                }
                console.log("Auto-increment de 'contabilidades' resetado.");
            });

            console.log("Banco de dados resetado com sucesso.");
        });

        db.close();
    }).catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });
}

ResetDatabase();
