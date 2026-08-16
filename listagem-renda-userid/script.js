import { get, renderizarLista,carregarHeader } from "../api.js";
carregarHeader();
const divLista = document.getElementById('listaRendas');
const btnRenda = document.getElementById('btnBuscar');

btnRenda.addEventListener('click', async function () {
    const userId = document.getElementById('userId').value;
    try {
        const rendas = await get( 
            `http://localhost:8080/users/${userId}/rendas`,
            "nao foi possivel fazer a listagem");
        renderizarLista(divLista, rendas, function (elemento, renda){
            elemento.textContent = `R$${renda.valor} - ${renda.dataHora}`;
            elemento.style.color = '#4caf50';
        });
    } catch (erro) {
        divLista.textContent = 'Erro ao buscar rendas.'
        divLista.style.color = '#e57373';
        console.error(erro);
    }
});