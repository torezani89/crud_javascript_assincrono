// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CADASTRA CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import {criaCliente} from "../service/cliente-service.js"
/* Precisei separar o script de cadastrar cliente do cliente-service.js, pois vamos trabalhar com elementos html
que não existem no lista_cliente.html, e geraria erro ao rodar o cliente-service.*/

// <form class="flex flex--coluna" data-form> em cadastra_cliente.html
const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', function(evento) {

    evento.preventDefault();

    // Procurar os elementos do formulario:
    const nome = evento.target.querySelector('[data-nome]').value
    const email = evento.target.querySelector('[data-email]').value
    // Podemos procurar diretamente no elemento (form) usando evento.target, ao invés de procurar pelo document.

    // criaCliente insere os dados do novo cliente no body do endereço da nossa requisição:
    // http://localhost:3000/profile
    criaCliente(nome,email)
    // Ir para a tela de cadastro concluído, após criar o cliente.
    .then(function() {
        window.location.href = '../telas/cadastro_concluido.html'
    })

    // Não esqueça de chamar o script em cadastra_cliente.html após o fechamento do <body>:
    // <script type="module" src="../service/cliente-service.js"></script>

})