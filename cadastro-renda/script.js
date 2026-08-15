const formulario = document.getElementById('formRenda');
const divResultado = document.getElementById('resultado');
//data hora
const dataHoraAtual = document.getElementById('dataAtual');
const dataHoraInput = document.getElementById('dataHoraInput');



formulario.addEventListener('submit', async function (evento) {

    evento.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const valor = document.getElementById('valor').value;

    const dadosRenda = {
        valor: parseFloat(valor),
        dataHora: document.getElementById('dataHoraInput').value
    }
    

    try {
        const resposta = await fetch(`http://localhost:8080/users/${userId}/rendas`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dadosRenda)
        });

        if(!resposta.ok){
            throw new Error('Erro ao cadastrar renda')
        }
        
        const rendaCriada = await resposta.json();

        divResultado.textContent = `Renda de R$ ${rendaCriada.valor} cadastrada com sucesso!`;
        divResultado.style.color = '#4caf50';

        formulario.reset();

        } catch (erro) {
        divResultado.textContent = 'Erro ao cadastrar renda. Verifique os dados e tente novamente.';
        divResultado.style.color = '#e57373';
        console.error(erro);
    }
    

});
dataHoraAtual.addEventListener('click', function(){
    const agora = new Date();
    const offsetEmMinutos = agora.getTimezoneOffset();
    //Multiplicamos pq o getTime busca o horario em milisegundos, ja o offset em minutos 1
    const dataLocal = new Date(agora.getTime() - offsetEmMinutos * 60000);
    const dataFormatada = dataLocal.toISOString().slice(0, 16); //so precisamos dos 16 primeiros caracteres

    dataHoraInput.value = dataFormatada;
    console.log(dataFormatada);
});

