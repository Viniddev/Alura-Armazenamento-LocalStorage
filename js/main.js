// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []       

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {   
    evento.preventDefault()            

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    if(existe){
        itemAtual.id = existe.id
        console.log(existe.id)
        
        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual
    }else{
        itemAtual.id = itens.length
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} ) 

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    novoItem.classList.add("shadow")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id


    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeletar(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeletar(id){
    const botao = document.createElement("button")
    botao.innerText = "X"

    botao.style.background = "#FEFAE0"
    botao.style.borderRadius = "50%"
    botao.style.border = "none"
    botao.style.width = "40px"
    botao.style.height = "40px"

    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return botao
}

function deletaElemento(objeto, idElemento){
    objeto.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === idElemento), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}