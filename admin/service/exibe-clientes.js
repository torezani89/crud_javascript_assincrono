import {listaClientes} from "../service/cliente-service.js"

/* Vamos exibir os clientes na tela. Para isso, vamos usar as informações armazenadas na API e criar uma
linha da tabela para cada cliente que existir na API chamando criaNovaLinha e passando os dados de
nome, email e id que estão armazenados na API (ver db.json). A id não será exibida na tela, mas servirá apenas
para identificar o cliente para fins de editá-lo ou deletá-lo. */
const criaNovaLinha = (nome, email, id) => {

    const linhaNovoCliente = document.createElement('tr')

    // Uma Template Literal precisa estar entre crases.
    const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
    `

    linhaNovoCliente.innerHTML = conteudo
    /* Cria um data-attribute chamado 'data-id' e atribui o valor de 'id' que está em db.json e é criado para
    cada cliente. Observe que id não será mostrado no template literal ao criar a nova linha <tr>, ele será apenas
    uma data-attribute para identificar a linha pela id do cliente. */
    linhaNovoCliente.dataset.id = id

    return linhaNovoCliente
}

// <tbody data-tabela>
const tabela = document.querySelector('[data-tabela]')

/*
listaClientes()
.then(data => {
// Quando o fetch tem sucesso na requisição, ele retorna uma promise (response).
// O próximo passo é pegar a resposta desta Promise retornada pela requisição da fetch e iterar
// sobre ela com forEach para chamar a function criaNovaLinha para cada elemento dela.
// O 'data' dentro do .then nada mais é do que a resposta.json() retornada pelo fecth.
    data.forEach((elemento) => {
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
    })
})
*/

// Vamos fazer o forEach sobre o retorno de listaClientes() utilizando o async/await
// Vamos usar também o try/catch, mas não é obrigatório.
async function renderiza() {
    try {
        const resultadolistaClientes = await listaClientes()
        resultadolistaClientes.forEach(element => {
            tabela.appendChild(criaNovaLinha(element.nome, element.email, element.id))
        })
    }
    catch(erro) {
        console.log(erro)
        // window.location.href = "../telas/erro.html"
    }
}

/* Sem usar async/await:
TypeError: resultadolistaClientes.forEach is not a function
Isso ocorre por que o JS tentará executar o forEach sobre resultadolistaClientes antes de concluir a execução de listaClientes()
cujo retorno/resultado é justamente o array de clientes sobre o qual precisamos iterar com o forEach */

renderiza()