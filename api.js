//post
async function post(url, dados,message){
    const resposta = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    if(!resposta.ok) throw new Error(message);
    return resposta.json();    
}
export{ post };

//para gets
async function get(url, message) {
    const resposta = await fetch(url)
    
    if(!resposta.ok){throw new Error(message)}

    const listas = await resposta.json();
    return listas;
}
export{ get };

//para listas
function renderizarLista(container, itens, montarConteudo){
    container.innerHTML = '';
    if(itens.length === 0){
        container.textContent = 'Nenhum elemento cadastrada';
        return;
    }

    itens.forEach(function(item){
        const elemento = document.createElement('div');
        elemento.className = 'item-listado';
        elemento.textContent =`R$${item.valor} - ${item.dataHora}`;
        container.appendChild(elemento);
    });
}
export { renderizarLista };

//layout
async function carregarHeader() {
    const resposta = await fetch ('../layout/index.html');
    const html = await resposta.text(); //transforma em texto puro html
    document.getElementById('header-placeholder').innerHTML = html;
}
export{ carregarHeader }