var groupOne=[
    {order: 1, scrImg: "img/Grupo_1_IMG/Carpa.png"},
    {order: 2, scrImg: "img/Grupo_1_IMG/Cabaña.png"},
    {order: 3, scrImg: "img/Grupo_1_IMG/Casa.png"},
    {order: 4, scrImg: "img/Grupo_1_IMG/Casa_Grande.png"},
    {order: 5, scrImg: "img/Grupo_1_IMG/Mansion.png"},
    {order: 6, scrImg: "img/Grupo_1_IMG/Edificio.png"}
]

var groupTwo=[
    {order: 1, scrImg: "img/Grupo_2_IMG/Semilla.png"},
    {order: 2, scrImg: "img/Grupo_2_IMG/Semilla_Creciendo.png"},
    {order: 3, scrImg: "img/Grupo_2_IMG/Arbol_Saliendo.png"},
    {order: 4, scrImg: "img/Grupo_2_IMG/Arbol_Adulto.png"},
    {order: 5, scrImg: "img/Grupo_2_IMG/Arbol_Otoño.png"},
    {order: 6, scrImg: "img/Grupo_2_IMG/Arbol_Seco.png"}
]

var groupThree=[
    {order: 1, scrImg: "img/Grupo_3_IMG/Hormiga.png"},
    {order: 2, scrImg: "img/Grupo_3_IMG/Raton.png"},
    {order: 3, scrImg: "img/Grupo_3_IMG/Gato.png"},
    {order: 4, scrImg: "img/Grupo_3_IMG/Oso.png"},
    {order: 5, scrImg: "img/Grupo_3_IMG/Elefante.png"},
    {order: 6, scrImg: "img/Grupo_3_IMG/Ballena.png"}
]

var selectionGroup = new Array();
var userName = "";

function realizeProcess(){
    userName=document.getElementById("user_name").value;
    let algSelected = document.getElementById("algoritmoSeleccionado").value;
    let groupSelected = document.getElementById("imgSelect").value;
    let radioButtons = document.getElementsByName("order");
    let orderSelected = "";
    radioButtons.forEach(i => {
        if(i.checked){
            orderSelected = i.value;
        }
    });
    if((algSelected != "") && (groupSelected != "") && (orderSelected != "")){
        orderingProcess(algSelected,orderSelected);
    }else{
        alertError(algSelected,groupSelected,orderSelected);
    }
}

function selectGroup(){
    let groupSelection = document.getElementById("imgSelect").value;
    if(groupSelection === "1"){
        groupReorder(groupOne);
    }else if(groupSelection === "2"){
        groupReorder(groupTwo);
    }else if(groupSelection === "3"){
        groupReorder(groupThree);
    }
}

function groupReorder(array){
    selectionGroup = array;
    selectionGroup.sort(function() { return Math.random() - 0.5 });
    var input = document.getElementsByName('casillas[]');
    for (var i = 0; i < input.length; i++) {
        input[i].src = selectionGroup[i].scrImg;
    }
}

function orderingProcess(alg,order){
    if((alg === "1") && (order == "upward")){
        bubbleUp();
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante ordenamiento burbuja");
    }else if((alg === "1") && (order == "downward")){
        bubbleDown();
        alert("Se ordenará el grupo de imagenes de manera descendente mediante ordenamiento burbuja");
    }else if((alg === "2") && (order == "upward")){
        insertionUp();
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante ordenamiento por insersión");
    }else if((alg === "2") && (order == "downward")){
        insertionDown();
        alert("Se ordenará el grupo de imagenes de manera descendente mediante ordenamiento por insersión");
    }else if((alg === "3") && (order == "upward")){
        selectionUp();
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante ordenamiento por selección");
    }else if((alg === "3") && (order == "downward")){
        selectionDown();
        alert("Se ordenará el grupo de imagenes de manera descendente mediante ordenamiento por selección");
    }
    updateData();
}

function bubbleUp(){
    var aux;
    for (let i = 0; i< selectionGroup.length; i++) {
       for (let j = 0; j < selectionGroup.length; j++) {
           if(selectionGroup[i].order < selectionGroup[j].order){
               aux = selectionGroup[i];
               selectionGroup[i] = selectionGroup[j];
               selectionGroup[j] = aux;
           }
       }
    }
}

function bubbleDown(){
    var input = document.getElementsByName('casillas[]');
    var aux;
    for (let i = 0; i< selectionGroup.length; i++) {
       for (let j = 0; j < selectionGroup.length; j++) {
           if(selectionGroup[i].order > selectionGroup[j].order){
               aux = selectionGroup[i];
               selectionGroup[i] = selectionGroup[j];
               selectionGroup[j] = aux;
           }
       }
    }
}

function insertionUp(){
    var v;
    var j;
    for (let i = 1; i < selectionGroup.length; i++) {
        v = selectionGroup[i];
        j = i - 1;
        while( (j>=0) && (selectionGroup[j].order>v.order) ){
            selectionGroup[j+1] = selectionGroup[j];
			j = j - 1;
        }
        selectionGroup[j+1] = v;
    }
}

function insertionDown(){
    var v;
    var j;
    for (let i = 1; i < selectionGroup.length; i++) {
        v = selectionGroup[i];
        j = i - 1;
        while( (j>=0) && (selectionGroup[j].order<v.order) ){
            selectionGroup[j+1] = selectionGroup[j];
			j = j - 1;
        }
        selectionGroup[j+1] = v;
    }
}

function selectionUp(){
    var aux;
    var min;
	for(let i = 0; i < (selectionGroup.length - 1); i++){
		min=i;
		for(let j=i+1;j<selectionGroup.length;j++){
			if(selectionGroup[j].order < selectionGroup[min].order){
				min=j;
			}
		}
        aux = selectionGroup[i];
        selectionGroup[i] = selectionGroup[min];
        selectionGroup[min] = aux;
	}
}

function selectionDown(){
    var aux;
    var min;
	for(let i = 0; i < (selectionGroup.length - 1); i++){
		min=i;
		for(let j=i+1;j<selectionGroup.length;j++){
			if(selectionGroup[j].order > selectionGroup[min].order){
				min=j;
			}
		}
        aux = selectionGroup[i];
        selectionGroup[i] = selectionGroup[min];
        selectionGroup[min] = aux;
	}
}

function updateData(){
    var input = document.getElementsByName('casillas[]');
    for (var i = 0; i < input.length; i++) {
        input[i].src = selectionGroup[i].scrImg;
    }
}

function alertError(alg,group,order){
    if ((alg === "") && (group === "") && (order === "")){
        alert("Usuario " + userName + " ha dejado todas las casillas en blanco\nElija las opciones y intente nuevamente");
    }else if((alg === "") && (group !== "") && (order !== "")){
        alert("Usuario " + userName + " le ha faltado elegir el algoritmo de ordenamiento\nIntente nuevamente");
    }else if((alg !== "") && (group === "") && (order !== "")){
        alert("Usuario " + userName + " le ha faltado elegir el grupo de imagenes\nIntente nuevamente");
    }else if((alg !== "") && (group !== "") && (order === "")){
        alert("Usuario " + userName + " le ha faltado elegir el modo de ordenamiento\nIntente nuevamente");
    }else if((alg === "") && (group === "") && (order !== "")){
        alert("Usuario " + userName + " le ha faltado elegir el modo de ordenamiento y el grupo de imagenes\nIntente nuevamente");
    }else if((alg !== "") && (group === "") && (order === "")){
        alert("Usuario " + userName + " le ha faltado elegir el grupo de imagenes y el modo de ordenamiento\nIntente nuevamente");
    }else if((alg === "") && (group !== "") && (order === "")){
        alert("Usuario " + userName + " le ha faltado elegir el algoritmo de ordenamiento y el modo de ordenamiento\nIntente nuevamente");
    }
}