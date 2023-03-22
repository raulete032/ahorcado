
const arrayLetters= ["Q", "W", "E", "R", "T", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "Z", "X", "C", "V", "B", "N", "M"];
const arrayNumbers= ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


const tecladoNumbers= document.querySelector("#tecladoNumbers");
const tecladoLetters1= document.querySelector("#tecladoLetters1");
const tecladoLetters2= document.querySelector("#tecladoLetters2");
const tecladoLetters3= document.querySelector("#tecladoLetters3");
const inputSecretWord= document.querySelector("#secretWord");
const btnConfirmar= document.querySelector("#btnConfirmar");
btnConfirmar.addEventListener("click", startGame);
const palabraGuiones= document.querySelector("#wordDashes");
var resultado=[];
var numError=0;
const imgAhorcado= document.querySelector("#ImgAhorcado");
const btnRestart= document.querySelector("#restart");
btnRestart.addEventListener("click", reinicia);


generaTelcado();

function generaTelcado(){

    var btn=null;
    var txt="";
    //Números
    for(let i=0;i<arrayNumbers.length;i++){

        btn= document.createElement("button");
        txt= document.createTextNode(arrayNumbers[i]);
        btn.appendChild(txt);
        btn.disabled=true;
        btn.value=arrayNumbers[i];
        tecladoNumbers.appendChild(btn);
        btn.addEventListener("click", comprueba);
    }


    //Letras
    var lineaLetters=0;
    for(let i=0;i<arrayLetters.length;i++){

        if(arrayLetters[i]=="A")
            lineaLetters=1;
        if(arrayLetters[i]=="Z")
            lineaLetters=2;
        
        btn= document.createElement("button");
        txt= document.createTextNode(arrayLetters[i]);
        btn.disabled=true;
        btn.value=arrayLetters[i];
        btn.appendChild(txt);
        btn.addEventListener("click", comprueba);

        switch(lineaLetters){
            case 0:
                tecladoLetters1.appendChild(btn);
            break;
            case 1:
                tecladoLetters2.appendChild(btn);
            break;
            case 2:
                tecladoLetters3.appendChild(btn);
            break;
        }
    }
}




function startGame(){

    let btnsTeclado= document.querySelectorAll("#teclado button");
    palabraGuiones.innerHTML="";

    let secretWord= inputSecretWord.value;
    //CODIFICAR PALABRA?
    if(secretWord!=""){

        for(boton of btnsTeclado) //vuelvo a habilitar todos los botones
            boton.disabled=false;
        
        btnConfirmar.disabled=true; //deshabilito el de Confirmar
        secretWord= secretWord.toUpperCase();
        localStorage.setItem("secretWord", secretWord);
        
        inputSecretWord.value="";
    
        wordDashes();
    }
    else
        palabraGuiones.innerHTML="Escribe una palabra";
}


function wordDashes(){

    let word= localStorage.getItem("secretWord");

    for(char of word){
        if(char==" ")
            resultado.push(" ");
        else
            resultado.push("_");
    }

    for(char of resultado)
        palabraGuiones.innerHTML+=char;

}




function comprueba(){

    let teclaPulsada= this.value;

    let secretWord= localStorage.getItem("secretWord");

    let arrayPosiciones=[];
    arrayPosiciones= tieneLetras(secretWord, teclaPulsada);
    
    if(arrayPosiciones.length>0){
        pintaLetras(arrayPosiciones, secretWord, teclaPulsada);
        this.style.background="green";
        correcto();
    }
    else{
        error();
        this.style.background="red";
    }
        
}


function tieneLetras(secretWord, teclaPulsada){

    let array= [];

    for(let i=0;i<secretWord.length;i++){
        let char= secretWord.charAt(i);

        if(char==teclaPulsada)
            array.push(i);
    }
    return array;
}


function pintaLetras(array, secretWord, teclaPulsada){

    palabraGuiones.innerHTML="";
    for(let i=0;i<secretWord.length;i++){

        if(array.includes(i)){
            resultado[i]=teclaPulsada;
        }
       
    }


    for(char of resultado)
        palabraGuiones.innerHTML+=char;

}


function correcto(){

    let solucion= palabraGuiones.textContent;
    let sw=true;
    for(let i=0;i<solucion.length;i++){
        if(solucion.charAt(i)=="_")
            sw=false;
    }
        

    if(sw){ //ya no quedan guiones
        document.querySelector("#windLose").innerHTML="HAS GANADO";
        btnRestart.style.visibility="visible";
    }        


}


function error(){

    numError++;
    let secretWord= localStorage.getItem("secretWord");
    if(numError<8)
        imgAhorcado.src="./img/"+numError+".png";
    else{
        imgAhorcado.src="./img/"+numError+".png";
        document.querySelector("#windLose").innerHTML="HAS PERDIDO, la palabra era: " + secretWord;
        btnRestart.style.visibility= "visible";
        bloqueaTeclado();
    }

}


function bloqueaTeclado(){
    let btnsTeclado= document.querySelectorAll("#teclado button");
    for(boton of btnsTeclado)
        boton.disabled=true;

    btnConfirmar.disabled=false;
}


function reinicia(){
    resultado=[];
    numError=0;
    imgAhorcado.src="";
    palabraGuiones.innerHTML="";
    document.querySelector("#windLose").innerHTML="";
    btnRestart.style.visibility="hidden";

    let btnsTeclado= document.querySelectorAll("#teclado button");
    for(boton of btnsTeclado)
        boton.style.background="";
}