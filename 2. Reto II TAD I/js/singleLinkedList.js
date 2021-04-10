let ingresoInput = new Array();
let ingresoImagenes = new Array();
let ingresoTexto = new Array();

const capturaValorInputAnonima = function() {
    let valoresNodos = document.getElementById("nodos").value;
    if(valoresNodos != ""){
        alert("Valores añadidos");
        var array3 = valoresNodos.split(",");
        document.getElementById("nodosIngresados").innerHTML = array3;
        array3.forEach(i => {
            ingresoInput.push(i);
        });
    }else{
        alert("El campo de ingreso está vacío");
    }
};

function cargueImagenes(eventoSeleccionar) {
    let files = eventoSeleccionar.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        /* Cargue de sólo imagenes */
        if (f.type.match('image.*')) {
            document.getElementById("nameImage").className = "file-path validate";
        }else{
            alert("Todos los archivos seleccionados deben ser imagenes");
            document.getElementById("nameImage").className = "";
            document.getElementById("list").className = "";
            return;
        }
    }

    for (let i = 0, f; f = files[i]; i++) {
        let cargueImagenes = new FileReader;
        /* Capturar información de la imagen: tipo, nombre, tamaño */
        cargueImagenes.onload = (function(imagenSeleccionada) {
            return function(imagen) {
                /* Crear etiqueta HTML en el DOM */
                let span = document.createElement('span');
                /* Escribimos en la etiqueta span: cargamos la imagen */
                span.innerHTML = ['<img class ="thumb" width ="100px" heigth="100px" src= " ',
                    imagen.target.result, ' "title=" ', escape(imagenSeleccionada.name),
                    ' "/> '
                ].join('');
                document.getElementById("list").insertBefore(span, null);
                ingresoImagenes.push(span.innerHTML);
            };
        })(f);
        /* Función de la API FileReader
        Hace la lectura del contenido de un objeto Blob
        Trabaja con el atributo result que devuelve los datos del fichero, en este caso la imagen seleccionada */
        cargueImagenes.readAsDataURL(f);
    }
    alert("Imagenes seleccionadas correctamente");
}

document.getElementById('files').addEventListener('change', cargueImagenes, false);

/* Cargue de archivo txt */
let input = myInput;
let infoArchivo = new FileReader;
input.addEventListener('change', onChange);

function onChange(event) {
    /* event es el evento clic de selección */
    /* targer es el tipo de archivo seleccionado */
    /* files[0] sólo permite el cargue de un archivo */
    let archivo = event.target.files[0];
    if(archivo.type.match('text.*')){
        alert("Documento de texto subido con exito");
        document.getElementById("nameText").className = "file-path validate";
        /* readAsText se utiliza para leer el contenido de ls archivos */
        infoArchivo.readAsText(archivo);
        /* Permite ejecutar la función onload despues de cargar el archivo */
        infoArchivo.onload = onLoad;
    }else{
        document.getElementById("nameText").className = "";
        alert("No se ingreso un documento de texto");
    }
    
}

/* Lectura del contenido del archivo */
function onLoad() {
    let contenidoTxt = infoArchivo.result;
    var array3 = contenidoTxt.split("\n");
    var datos = new Array();
    array3.forEach(i => {
        datos.push(i.trim());
    });
    document.getElementById("ver").innerHTML = datos;
    array3.forEach(i => {
        ingresoTexto.push(i.trim());
    });
}

class NodeClass {

    constructor(valor) {
        this.valor = valor;
        this.next = null;
    }
}

class listasSimples {
    constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }

    /* Métodos de la lista: añadir, eliminar, buscar, actualizar valor */
    añadirNodoF(valor) {
        /* Instancia de la clase NodeClass */
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    añadirNodoI(valor) {
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    eliminarNodoF() {
        if (!this.head) return undefined;
        let nodoVisitado = this.head;
        let nuevaColaLista = nodoVisitado;
        while (nodoVisitado.next) {
            nuevaColaLista = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        this.tail = nuevaColaLista;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return nodoVisitado;
    }
    eliminarNodoI() {
        if (!this.head) return undefined;
        let cabezaactual = this.head;
        this.head = cabezaactual.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return cabezaactual;
    }

    getPosicionPuntero(index) {
        if (index < 0 || index >= this.length) return new NodeClass("Puntero Erroneo");
        let contadorPuntero = 0;
        let nodoVisitado = this.head;
        while (contadorPuntero != index) {
            nodoVisitado = nodoVisitado.next;
            contadorPuntero++;
        }
        return nodoVisitado;
    }

    modificarValorNodo(index, valor) {
        let encontrarNodo = this.getPosicionPuntero(index);
        if (encontrarNodo) {
            encontrarNodo.valor = valor;
            return true;
        }
        return false;
    }

    removerNodoPorPosicion(index) {
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado = null;
        if (index < 0 || index >= this.length) return new NodeClass("Puntero Erroneo");
        if (index === 0) this.head = nodoVisitado.next;
        else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitado;
                nodoVisitado = nodoVisitado.next;
            };
            nodoAnteriorAlVisitado.next = nodoVisitado.next;
        };
        this.length--;
        return nodoVisitado;
    }

    insertarNodoPorPosicion(valor, index) {
        let newNode = new NodeClass(valor);
        let nodoVisitado = this.head;
        let inicio = 0;
        let nodoAnteriorAlVisitado;
        if (index < 0 || index >= this.length) return null;
        if (index == inicio){
            this.añadirNodoI(valor);
        } else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitado;
                nodoVisitado = nodoVisitado.next;
            }
            newNode.next = nodoVisitado;
            nodoAnteriorAlVisitado.next = newNode;
        }
        this.length++;
    }
    
    removerNodoPorValor(valor) {
        let valorInt = parseInt(valor);
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado = null;
        while (nodoVisitado != null) {
            if (nodoVisitado.valor === valor || nodoVisitado.valor === valorInt) {
                if (!nodoAnteriorAlVisitado){
                    this.head = nodoVisitado.next;
                }else{
                    nodoAnteriorAlVisitado.next = nodoVisitado.next;
                }
                this.length--;
                return nodoVisitado;
            }
            nodoAnteriorAlVisitado = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        return null;
    }

    invertirOrdenLista() {
        let inicialCabeza = this.head;
        let inicialCola = this.tail;

        let nodoAnterior;
        let nodoActual = this.head;
        let nodoSiguiente;
        while (nodoActual != null) {
            nodoSiguiente = nodoActual.next;
            nodoActual.next = nodoAnterior;
            nodoAnterior = nodoActual;
            nodoActual = nodoSiguiente;
        }
        
        this.head = inicialCola;
        this.tail = inicialCabeza;
        return nodoAnterior;
    }

    imprimirArrayList() {
        let arregloNodos = [];
        let nodoVisitado = this.head;
        while (nodoVisitado) {
            arregloNodos.push(nodoVisitado.valor);
            nodoVisitado = nodoVisitado.next;
        }
        return arregloNodos;
    }
}
let instClass = new listasSimples();
instClass.añadirNodoI(8);
instClass.añadirNodoI(7);
instClass.añadirNodoI(6);
instClass.añadirNodoI(5);
instClass.añadirNodoI(4);
instClass.añadirNodoI(3);
instClass.añadirNodoI(2);
instClass.añadirNodoI(1);
document.getElementById("listaPorDefault").innerHTML = instClass.imprimirArrayList();

function crearLista(){
    alert("Se creará la lista con los valores ingresados");
    ingresoInput.forEach(i => {
        instClass.añadirNodoF(i);
    });
    ingresoImagenes.forEach(i => {
        instClass.añadirNodoF(i);
    });
    ingresoTexto.forEach(i => {
        instClass.añadirNodoF(i);
    });
    document.getElementById("nuevaLista").innerHTML = instClass.imprimirArrayList();
}

/* Añadir nodo al final de los valores ingresados en el campo input plit(",")
    Añadir nodo al final que contenga el nombre de las imagenes seleccionadas
    Añadir nodo al final que muestre el contenido del archivo txt seleccionado, donde cada linea 
    es un valor de nodo diferente split("\n")*/



/* validar el algoritmo de selección de lista desplegable y checkbox */
let seleccion;
function showSelected(){
    seleccion = document.getElementById("functionSelected").value;
    if (seleccion === "1") {
        alert("Seleccionada Opción Añadir Nodo");
    } else if (seleccion === "2") {
        alert("Seleccionada Opción Eliminar nodo");
    } else if (seleccion === "3") {
        alert("Seleccionada Consultar valor de nodo");
    } else if (seleccion === "4") {
        alert("Seleccionada Eliminar nodo en determinada posición");
    } else if (seleccion === "5") {
        alert("Seleccionada Eliminar nodo que contenga el valor");
    } else if (seleccion === "6") {
        alert("Seleccionada Modificar valor de un nodo determinado");
    } else if (seleccion === "7") {
        alert("Seleccionada Añadir nodo en determinada posición");
    } else if (seleccion === "8") {
        alert("Seleccionada Invertir orden de la lista");
    }
}

function listaResultante(){
    let radioButtons = document.getElementsByName("order");
    let orderSelected = "";
    radioButtons.forEach(i => {
        if(i.checked){
            orderSelected = i.value;
        }
    });
    if (seleccion === "1") {
        let value = document.getElementById("valorN").value;
        if(orderSelected === "begin"){
            alert("Se ingresará el valor indicado al inicio de la lista");
            instClass.añadirNodoI(value);
        }else if(orderSelected === "end"){
            alert("Se ingresará el valor indicado al final de la lista");
            instClass.añadirNodoF(value);
        }
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "2") {
        if(orderSelected === "begin"){
            alert("Se eliminará el nodo al inicio de la lista");
            instClass.eliminarNodoI();
        }else if(orderSelected === "end"){
            alert("Se eliminará el nodo al final de la lista");
            instClass.eliminarNodoF();
        }
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "3") {
        let puntero = document.getElementById("posicionN").value;
        alert("Se encontrara el valor en el puntero " + puntero);
        document.getElementById("listaResultado").innerHTML = instClass.getPosicionPuntero(puntero).valor;
    } else if (seleccion === "4") {
        let puntero = document.getElementById("posicionN").value;
        alert("Se eliminará el nodo en el puntero " + puntero);
        instClass.removerNodoPorPosicion(puntero);
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "5") {
        let valor = document.getElementById("valorN").value;
        alert("Se eliminará el nodo que contenga el valor " + valor);
        instClass.removerNodoPorValor(valor);
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "6") {
        let valor = document.getElementById("valorN").value;
        let puntero = document.getElementById("posicionN").value;
        alert("Se modificará el nodo en el puntero " + puntero + " con el valor " + valor);
        instClass.modificarValorNodo(puntero,valor);
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "7") {
        let valor = document.getElementById("valorN").value;
        let puntero = document.getElementById("posicionN").value;
        alert("Se añadirá el nodo con valor" + valor + "en el puntero " + puntero);
        instClass.insertarNodoPorPosicion(valor,puntero);
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    } else if (seleccion === "8") {
        alert("Se invertirá el orden de la lista");
        instClass.invertirOrdenLista();
        document.getElementById("listaResultado").innerHTML = instClass.imprimirArrayList();
    }
}