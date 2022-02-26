import { detalhaCliente, atualizaCliente } from "./cliente-service.js"

// Devemos chamar o script edita-cliente.js em edita_cliente.html.

/* Em <a href="../telas/edita_cliente.html" (no template literal em exibe-cliente.js) adicionamos ?id=${id}
que é uma 'query string' que coloca o 'id' do cliente clicado na url da página. Essa identificação será
utilizada para editar clientes.*/

/* Pega a URL da página em que estamos. Também pega outras informações, como seacrhParams, que traz vários métodos
que podemos utilizar no objeto window.location. Vamos utilizar o método 'get' para pegar o 'id' do cliente.
Dê um console.log(pegaURL) e veja a lista completa dos métodos possíveis de usar. */
const pegaURL = new URL(window.location)
const id = pegaURL.searchParams.get('id')

const inputNome = document.querySelector('[data-nome]')
const inputEmail = document.querySelector('[data-email]')

try {
    /* Colocar os dados do cliente escolhido nos campos a serem editados. O cliente escolhido é identificado pelo id */
    detalhaCliente(id)
    .then(dados => {
        inputNome.value = dados.nome
        inputEmail.value = dados.email
    /*
    Também pode ser feito com async/await:
    const dados = await detalhaCliente(id)
    inputNome.value = dados.nome
    inputEmail.value = dados.email
    */
    })
}
catch (erro) {
    console.log(erro)
    window.location.href = "..telas/erro.html"
}

// <form class="flex flex--coluna" data-form> em cadastra_cliente.html
// O selector de atributos deve estar em colchetes [].
const formulario = document.querySelector('[data-form]')

// Ao submeter o form, atualizaCliente() em cliente-service.js será chamada, passando os parâmetros abaixo.
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    // Não é necesário usar try/catch.
    try {
        atualizaCliente(id, inputEmail.value, inputNome.value)
        .then(function() {
            window.location.href = '../telas/edicao_concluida.html'
        })
    }
/*
Também poderia ser feito com async/await:
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    try {
        await atualizaCliente(id, inputEmail.value, inputNome.value)
        window.location.href = '../telas/edicao_concluida.html'

    }
})
*/
    catch (erro) {
        console.log(erro)
        window.location.href = "../telas/erro.html"
    }
})