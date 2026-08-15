import { post } from "../api.js";

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
        //converte o json de volta a js
        const usuarioCriado = await post(`http://localhost:8080/users`, dadosUsuario, "erro ao cadastrar usuario");

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