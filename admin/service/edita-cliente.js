import { detalhaCliente, atualizaCliente } from "./cliente-service.js"

// Devemos chamar o script javascript edita-cliente.js em edita_cliente.html.

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

/* Colocar os dados do cliente escolhido nos campos a serem editados. O cliente escolhido é identificado pelo id */
detalhaCliente(id)
.then(dados => {
    inputNome.value = dados.nome
    inputEmail.value = dados.email
})

// <form class="flex flex--coluna" data-form> em cadastra-cliente.js
const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    atualizaCliente(id, inputEmail.value, inputNome.value)
    .then(function() {
        window.location.href = '../telas/edicao_concluida.html'
    })
})