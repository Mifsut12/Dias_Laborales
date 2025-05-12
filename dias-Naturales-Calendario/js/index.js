// Javascript hecho para la implementacion de un calendario



// Variables a utilizar
//Valores individuales de cada fecha, por defecto tendran los valores por defecto.
let dia = new Date().getDay()
let mes = new Date().getMonth()

// Listado de meses y dias de la semana
let dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
//Año actual
let year = new Date().getFullYear()
//Nota: el formato es mm/dd
let festivos = ['1/1/','1/6/','2/28/','4/17/','4/18/','5/1/','9/15/','10/12/','11/1/','12/6/','12/8/','12/25/']





// Generar el calendario dado una fecha
function generacion(fechaNueva){
    
    fechaFormulario = new Date(document.getElementById("date").value)
    
    

    //Datos por defecto del calendario(Cabecera)
    calendario.innerHTML = `<p> L </p>
    <p> M </p>
    <p> X </p>
    <p> J </p>
    <p> V </p>
    <p> S </p>
    <p> D </p>`

    
   
    //Numero de dias a añadir al calendario(numero de dias al mes)
    //Al especificar el 0 en el més siguiente este cogera el dia antes de que empiece el mes siguiente, se usara ese dia como numero de dias del més actual
    let nDias = new Date(fechaNueva.getFullYear(), fechaNueva.getMonth() + 1, 0).getDate();

    //Dia en el que empieza el mes, se especifica que es el 1
    let primerDia = new Date(fechaNueva.getFullYear(), fechaNueva.getMonth(), 1).getDay();


   
    //Caso de que haya que incluir dias del mes anterior en la semana
    //Si el primer dia de la semana no es lunes
    if(primerDia != 1){
        //Caso de que sea domingo, debido a que en js los dias son 0 indexados
        if(primerDia == 0){
            primerDia = 7
        }

        //Obtener el nº de dias del més anterior, procedimiento identico al anterior(Linea 32) salvo que se cambia al mes actual para obtener el mes anterior.
        let nDias = new Date(fechaNueva.getFullYear(), fechaNueva.getMonth(), 0).getDate();

        //Hacerlo convertir un nº de 1 a 6 ya que es el rango de dias del mes anterior que pueden haber en la semana
        let diasARellenar = (primerDia % 8) - 1 
        //Obtener el 1er dia de la semana, + 1 ya que el ultimo dia es inclusive
        diasRestante = (nDias - diasARellenar) + 1


        for(let i = diasRestante; i < nDias + 1; i++){

            //Rellenar con los dias del mes anterior de esa semana, cada iteración va al dia siguiente del mes anterior


            calendario.innerHTML += `<p class = "mes-Distinto"> ${i} </p>`
        }


    }

    //Grueso del mes
    for(let i = 1; i <= nDias; i++){
        calendario.innerHTML += `<p> ${i} </p>`
    }

    //Caso de que se tenga que añadir dias del mes posterior.
    //Como cada fila tiene como máximo 7 elementos un més completo tiene 7n elementos, siendo n el numero de filas
    if(calendario.childElementCount % 7 != 0){
        //Pasar al més siguiente
        contador = 1
        //Añadir diás hasta que se complete la fila, haya un total de n elementos siendo n divisible por 7.
        while(calendario.childElementCount % 7 != 0){
            calendario.innerHTML += `<p class = "mes-Distinto"> ${contador} </p>`
            contador += 1
        }
    }

    //Convertir fecha a formato dd/mm/yyyy
    fecha.innerHTML = `Desde el dia ${fechaFormulario.toLocaleDateString()}(${dias[fechaFormulario.getDay()]}) la fecha a ${document.getElementById("ndias").value} dias habiles es ${fechaNueva.toLocaleDateString()} (${dias[fechaNueva.getDay()]})`

    //Información sobre la fecha para facilitar la vida al usuario
    mesYear.innerHTML = meses[fechaNueva.getMonth()] + " de " + fechaNueva.getFullYear()
    
    diaActual(fechaNueva.getDate())
    
    return null
}


function esFestivo(fechaAVerificar){
    fechaAVerificar = new Date(fechaAVerificar)
    
    for(let i = 0 ; i < festivos.length;i++){
        fechaVariable = festivos[i]
        fechaVariable += fechaAVerificar.getFullYear()
        fechaVariable = new Date(fechaVariable)

        

        if(fechaAVerificar.toDateString() === fechaVariable.toDateString()){

            return true
        }
    }

    return false
}

//Función que verifica si el dia es natural
function esHabil(fechaAVerificar){
    fechaAVerificar = new Date(fechaAVerificar)
    if((fechaAVerificar.getDay() == 6 || fechaAVerificar.getDay() == 0) || esFestivo(fechaAVerificar)){
        
        return false

    }else{
        return true
    }

}

//Función que calcula el dia 30 dias habiles despues(En Andalucía).
function diasNaturales(fechaAModificar){
    fechaAModificar = new Date(fechaAModificar)
    
    //El dia actual cuenta como habil
    let contador = 0

    //Procedimiento, avanzar al siguiente dia,verificar si se trata de un dia habil(No es fin de semana o es festivo).

    

    while(contador < Number(document.getElementById("ndias").value)){
        if(esHabil(fechaAModificar)){
            contador += 1
            
        }

        fechaAModificar.setDate(fechaAModificar.getDate() + 1)
    }

    fechaAModificar.setDate(fechaAModificar.getDate() - 1)
    
    generacion(fechaAModificar)



}


function obtenerDatos(){
    var fechaFormulario = document.getElementById("date").value
    diasNaturales(fechaFormulario)

}


//Función dedicada a marcar un dia en el calendario
function diaActual(diaABuscar){
    const dias = calendario.childNodes
    for(i = 0; i < dias.length;i++){
       
        if(dias[i].textContent == diaABuscar && dias[i].classList.length === 0){
            dias[i].classList.toggle("actual")
            break
        }
    }

    return null


}



//Obtener los elementos html
let fecha = document.querySelector("h1")

let mesYear = document.querySelector("h2")

let calendario = document.querySelector("div.calendario")





//Se genera un calendario con la fecha actual



formulario = document.getElementById("formulario")
document.getElementById("date").valueAsDate = new Date()
formulario.addEventListener("submit",obtenerDatos)






















