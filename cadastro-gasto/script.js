import { post } from "../api.js";

const formulario = document.getElementById('formGasto');
const divResultado = document.getElementById('resultado');

const dataHoraInput = document.getElementById('dataHora');
const btnDataHora = document.getElementById('btndataAtual');

formulario.addEventListener('submit', async function(evento){
    evento.preventDefault();

    const userId = document.getElementById('userId').value;
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    console.log(valor);
    const categoria = document.getElementById('categoria').value;

    const dadosGasto = {
        nome: nome,
        valor: parseFloat(valor),
        categoria: categoria,
        dataHora: document.getElementById('dataHora').value
    }

    try {
        const gastoCriado = await post(`http://localhost:8080/users/${userId}/gastos`, dadosGasto, "oi")
        
        divResultado.textContent = `Gasto de R$${dadosGasto.valor} cadastrada com sucesso!`;
        divResultado.style.color = '#4caf50';
        
        formulario.reset();
    } catch (erro) {
        divResultado.textContent = 'Erro ao cadastrar o gasto. Verifique os dados e tente novamente.';
        divResultado.style.color = '#e57373';
        console.error(erro);
    }
});
btnDataHora.addEventListener('click', function(){
    const agora = new Date();
    const offSet = agora.getTimezoneOffset();

    const dataLocal = new Date(agora.getTime() - offSet * 60000);
    const dataFormatada = dataLocal.toISOString().slice(0,16);
    dataHoraInput.value = dataFormatada;
    console.log(dataHoraInput.value);
});