/* OBS: Para executar o programa é necessário executar o json-server. Ver comentários ao final
do tópico LISTA DE CLIENTES. */
// -------------------------------------------------------------------------------------------------

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LISTA CLIENTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// listaClientes é chamado em exibe-clientes.js
export const listaClientes = () => {
    // fetch é um método global da interface da fetch API.
    // Por padrão a fetch já faz um get e devolve uma promise. Não precisa instanciar mais nada.
    // OBS: o endereço da requisição deve estar entre acentos graves.
    // Com a fetch API não precisamos usar o XMLHttpRequest.
    return fetch(`http://localhost:3000/profile`)
    .then(resposta => {
        // Se der tudo certo com a nossa requisição
        if(resposta.ok) {
            // 'resposta' é uma string e precisamos usar .json para transformá-la num objeto JS.
            return resposta.json()
        }
        throw new Error ("Não foi possível listar os clientes") // GET http://localhost:3000/profie 404 (Not Found)
    })
}

// json-server (em package.json) simula uma API para usar na nossa aplicação.
// Para localizar o endereço da nossa requisição (http://localhost:3000/profile) precisamos executar o json-server.
// Executar o json-server:
// 1) abrir o terminal do VS Code (Ctrl+J)
// 2) entrar na pasta 'admin', (dica: dar Ctrl+J com lista-cliente.html aberto)
// 3) comando: npm install (somente na primeira vez)
// 4) comando: npx json-server --watch db.json
// É necessário colocar o npx, pois o json-serve não está instalado globalmente na nossa máquina.
// Ctrl+C: parar a execução do json-server.
// Executar novamente: npx json-server --watch db.json. (não precisa mais fazer o npm install).
// Aparece uma carinha feliz quando ele é executado. Abrir o console do navegador para ver se leu os dados.


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRIA CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// criaCliente é chamado em cadastra-cliente.js
export const criaCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
        // Queremos enviar os dados 'nome' e 'email' para o servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Vamos criar no body novos dados chamados nome e email que vão receber os valores nome e email.
        // http://localhost:3000/profile é um endereço html, e portanto, possui um body como qualquer página html
        // onde é mostrado o conteúdo/informações. Vamos armazenar os dados 'nome' e 'email' do novo cliente
        // no body desta página html que serve como um servidor para armazenar informações. Com os métodos
        // GET e POST, nós pegamos dados desse servidor ou enviamos dados para ele.
        body: JSON.stringify({
            nome: nome,
            email: email,
        })

    })
    .then(resposta => {
        if (resposta.ok) {
            return resposta.body;
        }
        throw new Error ("Não foi possível criar um cliente") // GET http://localhost:3000/profie 404 (Not Found)
    })
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REMOVE CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// removeCliente é chamado em remove-cliente.js
export const removeCliente = function (id) {
    /* Cada cliente recebe um id em db.json. O $ serve para que o template literal reconheça
    'id' como um objeto JavaScript válido. */
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    })
    .then(resposta => {
        // Se o resultado da requisição não der certo
        if(!resposta.ok) {
            throw new Error ("Não foi possível deletar o cliente") // GET http://localhost:3000/profie 404 (Not Found)
        }
    })
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PEGAR DADOS DO CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// detalhaCliente será chamada em edita-cliente.js
// Vamos usar a id para pegar os dados apenas do cliente que queremos
export const detalhaCliente = function(id) {
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => {
        if (resposta.ok) {
            // 'resposta' é uma string e precisamos usar .json para transformá-la num objeto JS.
            return resposta.json()
        }

        throw new Error ("Não foi possível detalhar o cliente")
    })
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ATUALIZA CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// atualizaCliente será chamada em edita-cliente.js
// Vamos usar o método 'PUT' para substituir dados no localhost.
export const atualizaCliente = (id, email, nome) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    // Aqui, vamos fazer sem o 'if', para mostrar que seu uso não é obrogatório.
    .then(resposta => {
        return resposta.json()
    })
}



