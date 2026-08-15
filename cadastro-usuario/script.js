const formulario = document.getElementById('formCadastro');
const divResultado = document.getElementById('resultado');

//clicou no botao
formulario.addEventListener('submit', async function (evento) {
    //Força a pagina a nao recarregar
    evento.preventDefault();

    //pega o valores
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    //formando o objeto, mesmo formato do DTO
    const dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha
    }

    //Se tudo der certo
    try{
        const resposta = await fetch('http://localhost:8080/users',{

            method: 'POST', //metodo post
            headers:{
                'Content-Type' : 'application/json' //avisa que o body e json
            },
            body: JSON.stringify(dadosUsuario) //converte o objeto js para json
        }); //fetch fim

        if(resposta.status !== 201){
            throw new Error('erro ao cadastrar usuario')
        }

        //converte o json de volta a js
        const usuarioCriado = await resposta.json();

        //exibi a mensagem de saucesso com nome da pessoa
        divResultado.textContent = `Usuário ${usuarioCriado.nome} Cadastrado com sucesso!`;
        divResultado.style.color = '#4caf50'; //verde

        //depois do sucesso, reseta o formulario
        formulario.reset();
    } catch(erro){
        // Cai aqui se o fetch falhar (API fora do ar, CORS, erro 400/500, etc)
        divResultado.textContent = 'Erro ao cadastrar. Verifique os dados e tente novamente.';
        divResultado.style.color = '#e57373'; // vermelho, indicando erro

        // Mostra o erro detalhado no console, só pra debug (usuário não vê isso)
        console.error(erro);
    }
}); //fim do botao event