const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = []

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(nome.value, quantidade.value)
    
    nome.value = ""
    quantidade.value = ""
   
})

function criaElemento(objeto, quantidade){

    const novoItem = document.createElement("li")
    novoItem.classList.add("item")
    novoItem.classList.add("shadow")


    const numeroDeItens = document.createElement("strong")
    numeroDeItens.innerHTML = quantidade
    novoItem.appendChild(numeroDeItens)
    
    novoItem.innerHTML += objeto
    lista.appendChild(novoItem)

    const itemAtual = {
        "nome" : objeto,
        "quantidade": quantidade
    }

    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens))
}

// Verifica se há dados no Local Storage
if(localStorage.getItem('itens')) {
    // Se houver dados, adiciona-os à página
    var item =JSON.parse(localStorage.getItem('itens'));
    for(var i = 0; i<item.length; i++){
        criaElemento(item[i].nome, item[i].quantidade)
    }
}
