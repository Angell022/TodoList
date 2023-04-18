const fecha = document.querySelector("#fecha");
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#new-task')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST
let id // para que inicie en 0 cada tarea tendra un id diferente
const lista1 = document.querySelector('#lista1')

// funcion de agregar tarea 
function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado  y si es true, si no es false 
    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck
    const LINE = realizado ? lineThrough : '' //lo subraya
    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)
}

function tareaRealizada(element) {
    element.classList.toggle(check) //marca el boton
    element.classList.toggle(uncheck) //desmarca el boton
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

// crear un evento para habilitar el boton añadir 
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }
})
// crear un evento para escuchar el enter en cualquier parte de la pantalla
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value = ''
        id++
        }
    }
    
})

lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value

    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}

