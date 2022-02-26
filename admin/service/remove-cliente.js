import {removeCliente} from '../service/cliente-service.js'

// <tbody data-tabela>
const tabela = document.querySelector('[data-tabela]')
tabela.addEventListener('click', async (evento) => {
    // O alvo do evento é o botão de excluir, identificado pela class abaixo.
    let ehBotaoDeletar = evento.target.className == 'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar) {
        // Não é obrigatório usar try/catch.
        try {
            /* Para deletar a linha <tr> da table que mostra os dados do cliente, precisamos pegar
            o elemento pai <tr> da <td> que contém o botão deletar clicado. */
            const linhaCliente = evento.target.closest('[data-id]')
            const id = linhaCliente.dataset.id
            // Remover o cliente do servidor db.json.
            // Utilizando 'async/await' não precisamos usar o método .then.
            await removeCliente(id)
            // Remover o elemento html <tr> que é a linha que contém o cliente.
            linhaCliente.remove()
        }
        catch(erro) {
            console.log(erro)
            // Redireciona o usuário para uma página de aviso de erro.
            window.location.href = '../telas/erro.html'
        }
    }
})