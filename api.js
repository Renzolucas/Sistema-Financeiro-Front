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