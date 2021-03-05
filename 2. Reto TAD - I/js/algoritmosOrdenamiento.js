let groupOne=[
    {order: 1, scrImg: "img/Grupo_1_IMG/Carpa.png", imgAsigned: ""},
    {order: 2, scrImg: "img/Grupo_1_IMG/Cabaña.png", imgAsigned: ""},
    {order: 3, scrImg: "img/Grupo_1_IMG/Casa.png", imgAsigned: ""},
    {order: 4, scrImg: "img/Grupo_1_IMG/Casa_Grande.png", imgAsigned: ""},
    {order: 5, scrImg: "img/Grupo_1_IMG/Mansion.png", imgAsigned: ""},
    {order: 6, scrImg: "img/Grupo_1_IMG/Edificio.png", imgAsigned: ""}
]

let groupTwo=[
    {order: 1, scrImg: "img/Grupo_2_IMG/Semilla.png", imgAsigned: ""},
    {order: 2, scrImg: "img/Grupo_2_IMG/Semilla_Creciendo.png", imgAsigned: ""},
    {order: 3, scrImg: "img/Grupo_2_IMG/Arbol_Saliendo.png", imgAsigned: ""},
    {order: 4, scrImg: "img/Grupo_2_IMG/Arbol_Adulto.png", imgAsigned: ""},
    {order: 5, scrImg: "img/Grupo_2_IMG/Arbol_Otoño.png", imgAsigned: ""},
    {order: 6, scrImg: "img/Grupo_2_IMG/Arbol_Seco.png", imgAsigned: ""}
]

let groupThree=[
    {order: 1, scrImg: "img/Grupo_3_IMG/Hormiga.png", imgAsigned: ""},
    {order: 2, scrImg: "img/Grupo_3_IMG/Raton.png", imgAsigned: ""},
    {order: 3, scrImg: "img/Grupo_3_IMG/Gato.png", imgAsigned: ""},
    {order: 4, scrImg: "img/Grupo_3_IMG/Oso.png", imgAsigned: ""},
    {order: 5, scrImg: "img/Grupo_3_IMG/Elefante.png", imgAsigned: ""},
    {order: 6, scrImg: "img/Grupo_3_IMG/Ballena.png", imgAsigned: ""}
]

let selectionGroup = new Array();
let selectedImages = new Array();
let userName;
let imgSelectedState = false;

function selectCheckedImages(){
    let groupSelected = document.getElementById("imgSelect").value;
    if(groupSelected != ""){
        imgSelectedState = onlyChekeable();
    }else{
        alert("Antes de indicar las imagenes a ordenar, seleccione un grupo de imagenes");
    }
    
}

function realizeProcess(){
    let algSelected = document.getElementById("algoritmoSeleccionado").value;
    let groupSelected = document.getElementById("imgSelect").value;
    let radioButtons = document.getElementsByName("order");
    let orderSelected = "";
    userName = document.getElementById("user_name").value;
    radioButtons.forEach(i => {
        if(i.checked){
            orderSelected = i.value;
        }
    });
    if((algSelected != "") && (groupSelected != "") && (orderSelected != "")){
        if(imgSelectedState === true){
            orderingProcess(algSelected,orderSelected);
        }else{
            alert("Elija las imagenes y presione el boton aceptar");
        }
    }else{
        alertError(algSelected,groupSelected,orderSelected);
    }
}

function onlyChekeable(){
    let inputCheck = document.getElementsByName('imagenesSeleccionadas[]');
    let aux = selectedImages.slice();
    let input = document.getElementsByName('casillas[]');
    let orders = new Array();
    let actualSize = selectedImages.length;

    for (let i = 0; i < actualSize; i++) {
        selectedImages.pop();
    }

    for (let i = 0; i < inputCheck.length; i++) {
        if(inputCheck[i].checked === true){
            orders.push(input[i].id);
        }
    }
    for (let i = 0; i < selectionGroup.length; i++) {
        let index = orders.indexOf(selectionGroup[i].imgAsigned);
        if(index != -1){
            selectedImages.push(selectionGroup[i]);
        }
    }

    if(orders.length === 0 && aux.length > 0){
        selectedImages = aux;
        alert("Por favor elija al menos una de las imagenes en el grupo");
    }

    if(selectedImages.length === 0){
        alert("Por favor elija al menos una de las imagenes en el grupo");
        return false;
    }else{
        if(orders.length > 1){
            let listSelection = "";
            for (let i = 0; i < selectedImages.length; i++) {
                if((i+1) != selectedImages.length){
                    listSelection +=selectedImages[i].order +",";
                }else{
                    listSelection +=selectedImages[i].order;
                }
                
            }
            alert("Se eligieron las imagenes " + listSelection);
        }else if(orders.length === 1){
            alert("Se eligio la imagen " + selectedImages[0].order);
        }
        return true;
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
    selectionGroup = array.slice();
    let same = true;
    while(same === true){
        selectionGroup.sort(function() { return Math.random() - 0.5 });
        let input = document.getElementsByName('casillas[]');
        for (let i = 0; i < input.length; i++) {
            input[i].src = selectionGroup[i].scrImg;
            selectionGroup[i].imgAsigned = input[i].id;
        }
        same = equality(selectionGroup,array);
    }
}

function equality(arrayN1,arrayN2){
    let equalNumberUpWard = 0;
    let equalNumberDownWard = 0;
    for (let i = 0; i < arrayN1.length; i++) {
        if(arrayN1[i].order === arrayN2[i].order){
            equalNumberUpWard++;
        }
    }
    let j = arrayN1.length - 1;
    for (let i = 0; i < arrayN1.length; i++) {
        if(arrayN1[i].order === arrayN2[j].order){
            equalNumberDownWard++;
        }
        j--;
    }
    if(equalNumberUpWard === arrayN1.length || equalNumberDownWard === arrayN1.length){
        return true;
    }else{
        return false
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
    }else if((alg === "4") && (order == "upward")){
        selectedImages = mergeSortUp(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante ordenamiento por mezcla");
    }else if((alg === "4") && (order == "downward")){
        selectedImages = mergeSortDown(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera descendente mediante ordenamiento por mezcla");
    }else if((alg === "5") && (order == "upward")){
        QuickSortUp(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante ordenamiento rápido");
    }else if((alg === "5") && (order == "downward")){
        QuickSortDown(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera descendente mediante ordenamiento rápido");
    }else if((alg === "6") && (order == "upward")){
        ShellSortUp(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera ascendente mediante el metodo de ordenamiento shell");
    }else if((alg === "6") && (order == "downward")){
        ShellSortDown(selectedImages);
        alert("Se ordenará el grupo de imagenes de manera descendente mediante el metodo de ordenamiento shell");
    }
    updateData();
}

function bubbleUp(){
    for (let i = 0; i < selectedImages.length; i++) {
       for (let j = 0; j < selectedImages.length - 1 - i; j++) {
        (selectedImages[j].order > selectedImages[j + 1].order) ? [selectedImages[j], selectedImages[j + 1]] = [selectedImages[j + 1], selectedImages[j]] : '';
       }
    }
}

function bubbleDown(){
    for (let i = 0; i < selectedImages.length; i++) {
        for (let j = 0; j < selectedImages.length - 1 - i; j++) {
         (selectedImages[j].order < selectedImages[j + 1].order) ? [selectedImages[j], selectedImages[j + 1]] = [selectedImages[j + 1], selectedImages[j]] : '';
        }
     }
}

function insertionUp(){
    let j,temporal;
    for (let i = 1; i < selectedImages.length; i++) {
        j = i;
        temporal = selectedImages[i];
        while((j > 0) && (selectedImages[j - 1].order > temporal.order)){
            selectedImages[j] = selectedImages[j - 1];
            j--;
        }
        selectedImages[j] = temporal;
    }
}

function insertionDown(){
    let j,temporal;
    for (let i = 1; i < selectedImages.length; i++) {
        j = i;
        temporal = selectedImages[i];
        while((j > 0) && (selectedImages[j - 1].order < temporal.order)){
            selectedImages[j] = selectedImages[j - 1];
            j--;
        }
        selectedImages[j] = temporal;
    }
}

function selectionUp(){
	for(let i = 0; i < selectedImages.length; ++i){
		let j = elementoMenorValor = i;
        for(++j; j <selectedImages.length; ++j){
            (selectedImages[j].order < selectedImages[elementoMenorValor].order) && (elementoMenorValor = j);
        }
        [selectedImages[i], selectedImages[elementoMenorValor]] = [selectedImages[elementoMenorValor],selectedImages[i]];
	}
}

function selectionDown(){
    for(let i = 0; i < selectedImages.length; ++i){
		let j = elementoMenorValor = i;
        for(++j; j <selectedImages.length; ++j){
            (selectedImages[j].order > selectedImages[elementoMenorValor].order) && (elementoMenorValor = j);
        }
        [selectedImages[i], selectedImages[elementoMenorValor]] = [selectedImages[elementoMenorValor],selectedImages[i]];
	}
}

function mergeSortUp(array,half = array.length/2){
    if(array.length < 2){
      return array;
    }
    const left = array.splice(0,half);
    return mergerUp( mergeSortUp(left),mergeSortUp(array));
}

function mergerUp(left, right) {
    const arr = new Array();
    while (left.length && right.length) {
        if (left[0].order < right[0].order) {
            arr.push( left.shift());
        } else {
            arr.push( right.shift());
        }
    }
    return [ ...arr, ...left, ...right ];
}

function mergeSortDown(array,half = array.length/2){
    if(array.length < 2){
      return array;
    }
    const left = array.splice(0,half);
    return mergerDown(mergeSortDown(left),mergeSortDown(array));
}

function mergerDown(left, right) {
    const arr = new Array();
    while (left.length && right.length) {
        if (left[ 0 ].order > right[ 0 ].order) {
            arr.push( left.shift()); 
        } else {
            arr.push( right.shift());
        }
    }
    return [ ...arr, ...left, ...right ];
}

function QuickSortUp(arrayOrder){
    arrayOrder = quickSort(arrayOrder, 0, arrayOrder.length - 1);
    function quickSort(array, left, right) {
        let index;
        if (array.length > 1) {
            index = partition(array, left, right);
            if (left < index - 1) {
                quickSort(array, left, index - 1);
            }
            if (index < right) {
                quickSort(array, index, right);
            }
        }
        return array;
    }
    function swap(array, leftIndex, rightIndex){
        var temp = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = temp;
    }
    function partition(array, left, right) {
        let pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;
        while (i <= j) {
            while (array[i].order < pivot.order) {
                i++;
            }
            while (array[j].order > pivot.order) {
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
}

function QuickSortDown(arrayOrder){
    arrayOrder = quickSort(arrayOrder, 0, arrayOrder.length - 1);
    function quickSort(array, left, right) {
        let index;
        if (array.length > 1) {
            index = partition(array, left, right);
            if (left < index - 1) {
                quickSort(array, left, index - 1);
            }
            if (index < right) {
                quickSort(array, index, right);
            }
        }
        return array;
    }
    function swap(array, leftIndex, rightIndex){
        var temp = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = temp;
    }
    function partition(array, left, right) {
        let pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;
        while (i <= j) {
            while (array[i].order > pivot.order) {
                i++;
            }
            while (array[j].order < pivot.order) {
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
}

function ShellSortUp(array) {
	let n = array.length;
	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))	{
		for (let i = gap; i < n; i += 1)  {
			let temp = array[i];
			let j;
			for (j = i; j >= gap && array[j-gap].order > temp.order; j-=gap)  {
				array[j] = array[j-gap];
			}
			array[j] = temp;
		}
	}
}

function ShellSortDown(array){
    let n = array.length;
	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))	{
		for (let i = gap; i < n; i += 1)  {
			let temp = array[i];
			let j;
			for (j = i; j >= gap && array[j-gap].order < temp.order; j-=gap)  {
				array[j] = array[j-gap];
			}
			array[j] = temp;
		}
	}
}

function updateData(){
    let list  = document.getElementById("myList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (let i = 0; i < selectedImages.length; i++) {
        let node = document.createElement("div");
        node.className = "col s2";
        let image = document.createElement("img");
        image.className = "responsive-img circle";
        image.src= selectedImages[i].scrImg;
        node.appendChild(image);
        document.getElementById("myList").appendChild(node);
    }
    lastSize = selectedImages.length;
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