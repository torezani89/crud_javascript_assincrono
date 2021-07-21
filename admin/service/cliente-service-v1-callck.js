// Usando Callback para trabalhar com dados de API

const criaNovaLinha = function(nome, email) {
    // Os dados (nome, email) vêm de 'data' em http.onload, que é um array que contém os dados dos clientes.
    
        const linhaNovoCliente = document.createElement('tr')
    
        // Uma Template Literal precisa estar entre crases.
        const conteudo = `
            <td class="td" data-td>${nome}</td>
            <td>${email}</td>
            <td>
                <ul class="tabela__botoes-controle">
                    <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
                    <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                </ul>
            </td>
        `
    
        linhaNovoCliente.innerHTML = conteudo
    
        return linhaNovoCliente
    }
    
    // <tbody data-tabela>
    const tabela = document.querySelector('[data-tabela]')
    
    const listaClientes = function() {
    
        const promise = new Promise((resolve, reject) => {
            
            // Objeto XMLHTTPRequest: faz a comunicação entre a minha aplicação e o servidor que contém os dados.
            const http = new  XMLHttpRequest()
    
            // Abrir a comunicação entre a minha aplicação e a API (Método Open).
            // Primeiro argumento: ação a ser executada pelo servidor (“pegar”).
            // Segundo argumento: o alvo da ação.
            http.open('GET', 'http://localhost:3000/profile')
    
            // O que fazer com a resposta que o servidor vai enviar de volta.
            // Ao ler, executar a função. CUIDADO: não estamos declarando uma variável (var, let, const).
            http.onload = function() {
                // Pegar o resultado que servidor me devolveu. Precisamos usar o método parse, pois o http.response retorna 
                // o resultado (dados dos clientes) em formato string. O parse transforma essa string num objeto interpretável pelo JavaScript.
                const data = JSON.parse(http.response)
                data.forEach(element => {
                    tabela.appendChild(criaNovaLinha(element.nome, element.email))
                });
            
                // Mostrar dados mais antigos (Sequência de operações assíncronas). CALLBACK
                const http2 = new  XMLHttpRequest()
                http2.open('GET', 'http://localhost:3000/profile/semanaPassada')
                http2.onload = function() {
                    // código omitido...
            
                    const http3 = new  XMLHttpRequest()
                    http3.open('GET', 'http://localhost:3000/profile/mesPassado')
                    http3.onload = function() {
                        // código omitido...
                    }
                    http3.send()
                    // e assim sucessivamente (http4, http5...)
            
                }
            
                http2.send()
            }            
    
            // Enviar a requisição
            http.send()
    
        })
        // console.log(promise) // para testar se o promise está sendo retornado. Não se esqueça depois de chamar
        // listaCliente() para fazer o teste.
        return promise
    
    }
    
    listaClientes()
    .then(data => {
    // Quando a Promise tem sucesso e é resolvida, resolve(JSON.parse(http.response)) é executado,
    // então o valor da expressão JSON.parse(http.response) é passado para a próxima função, que será a .then (esta em que estamos).
    // Então, o data dentro do .then nada mais é do que o JSON.parse(http.response).
        data.forEach(element => {
            tabela.appendChild(criaNovaLinha(element.nome, element.email))
        })
    })

// json-server (em package.json) simula uma API para usar na nossa aplicação.
// Para localizar o endereço da nossa requisição (http://localhost:3000/profile) precisamos executar o json-server.
// Executar o json-server:
// 1) abrir o terminal do VS Code (Ctrl+J),
// 2) entrar na pasta 'admin', (dica: dar Ctrl+J com lista-cliente.html aberto)
// 3) comando: npm install (somente na primeira vez),np
// 4) comando: npx json-server --watch db.json.
// É necessário colocar o npx, pois o json-serve não está instalado globalmente na nossa máquina.
// Ctrl+C: parar a execução do json-server.
// Executar novamente: npx json-server --watch db.json. (não precisa mais fazer o npm install).
// Aparece uma carinha feliz quando ele é executado. Abrir o console do navegador para ver se leu os dados.
    