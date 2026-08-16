import { get, renderizarLista } from "../api.js";

const btnBuscar = document.getElementById('btnBuscar');
const divLista = document.getElementById('listaGastos');

btnBuscar.addEventListener('click', async function () {
    const userId = document.getElementById('userId').value;
    try {
        const gastos = await get(
            `http://localhost:8080/users/${userId}/gastos`, 
            "nao foi possivel fazer a listagem"
        );
        renderizarLista(divLista, gastos, function(elemento, gasto){
            elemento.textContent = `R$${gasto.valor} - ${gasto.dataHora}`;
            elemento.style.color = '#4caf50';
        });
    } catch (erro) {
        divLista.textContent = 'Erro ao buscar gastos';
        divLista.style.color = '#e57373';
        console.error(erro);
    }
});

