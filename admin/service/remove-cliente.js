import {removeCliente} from '../service/cliente-service.js'

// <tbody data-tabela>
const tabela = document.querySelector('[data-tabela]')
tabela.addEventListener('click', async (evento) => {
    // O alvo do evento é o botão de excluir, identificado pela class abaixo.
    let ehBotaoDeletar = evento.target.className == 'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar) {
        // Deletar o cliente da API (db.json) e a linha no html que mostra os dados dele.
        // Encontar o elemento pai mais próximo da <td> que tem o botão de deletar, que é a <tr> que queremos deletar.
        const linhaCliente = evento.target.closest('[data-id]')
        const id = linhaCliente.dataset.id
        // Remover o cliente do servidor db.json
        // Utilizando 'async/await' não precisamos usar o método .then.
        await removeCliente(id)
        // Remover o elemento html <tr> que é a linha que contém o cliente.
        linhaCliente.remove()
    }
})