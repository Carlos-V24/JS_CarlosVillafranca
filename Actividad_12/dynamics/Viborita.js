//Genera el terreno
for (var i = 0; i < 10; i++) {
  var Columna =  document.createElement("div");
  Columna.classList.add("columna");
  document.getElementsByClassName("terreno")[0].appendChild(Columna);
}
for (var i = 0; i < 10; i++) {
  for (var n = 0; n < 10; n++) {
    var Celda =  document.createElement("div");
    Celda.classList.add("celda");
    document.getElementsByClassName("terreno")[0].children[i].appendChild(Celda);
  }
}
/*Funcion para extraer el valor de una cookie
  Este es la funcion de w3schooL.com*/
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//Genera un numero aleatorio
function NumRandom(){
  return Math.round(Math.random()*9);
}
//Funcion para generar manzanas
function GenManzana() {
  do {
    let Ok=0;
    //Variables de la posicion de la aparicion de la manzana
    var ColMan = NumRandom();
    var CelMan = NumRandom();
    //Comprueba que la proxima manzana no caiga sobre el cuerpo de una de las serpientes
    for (var i = 0; i < Viborita.length; i++) {
      if (Viborita[i][0] == ColMan && Viborita[i][1]==CelMan) {
        GenerarPosMan= true;
      }else {
        Ok++;
      }
    }
    //Si todo esta Ok genera la manzana
    if (Ok==Viborita.length) {
      GenerarPosMan=false;
    }
  } while (GenerarPosMan==true);
  let manzana = terreno[ColMan].children[CelMan];
  manzana.classList.add("manzana");
}

///
function DiujarViborita(){
  for (var i = 0; i < Viborita.length; i++) {
    var PoscicionNueVibora = terreno[Viborita[i][0]].children[Viborita[i][1]];
    PoscicionNueVibora.classList.add("Viborita");
  }
}
///
function DestruirExViborita() {
  //Destruye la serpiente abterior
  for (var i = 0; i < Viborita.length; i++) {
    var PoscicionVieVibora = terreno[Viborita[i][0]].children[Viborita[i][1]];
    PoscicionVieVibora.classList.remove("Viborita");
  }
}
function direccion(event){
  let dir = event.keyCode;
  if( dir == 37 && Sentido != "Derecha"){
    Sentido = "Izquierda";
    Movimiento.play()
  }else if(dir == 38 && Sentido != "Abajo"){
    Sentido = "Arriba";
    Movimiento.play()
  }else if(dir == 39 && Sentido != "Izquierda"){
    Sentido = "Derecha";
    Movimiento.play()
  }else if(dir == 40 && Sentido != "Arriba"){
    Sentido = "Abajo";
    Movimiento.play()
  }
}

//Coleccion del terreno
var terreno = document.getElementsByClassName("terreno")[0].children;

//Valor Inicial de la vibora
var Puntaje=0;
var Velocidad=500;
var Viborita=[[4,4]];
var Sentido;
var MaxScore = getCookie("MaxScore");
var ViboViva=true;

let Muerto = new Audio();
let Comer = new Audio();
let Movimiento = new Audio();

Muerto.src = "../statics//Audios/Muerto.mp3";
Comer.src = "../statics//Audios/Comer.mp3";
Movimiento.src = "../statics//Audios/Movimiento.mp3";




/////////////////////////////__Juego__//////////////////////////////////
  function Juego(velocidad){
    window.setTimeout(()=>{
      DestruirExViborita()
      //Variables para recalcular la nueva cabeza
      var NuevaCabeza = new Array;
      var CabezaCol;
      var CabezaCel;

      document.addEventListener("keydown",direccion);
      //Detecta las flechas
      if (Sentido=="Abajo") {
        if (Viborita[0][1]==9) {
          CabezaCel=0;
        }else {
          CabezaCel=Viborita[0][1]+1;
        }
        CabezaCol=Viborita[0][0]
      }else if (Sentido=="Arriba") {
        if (Viborita[0][1]==0) {
          CabezaCel=9;
        }
        else {
          CabezaCel=Viborita[0][1]-1;
        }
        CabezaCol=Viborita[0][0]
      }else if (Sentido=="Derecha") {
        if (Viborita[0][0]==9) {
          CabezaCol=0;
        }else {
          CabezaCol=Viborita[0][0]+1;
        }
        CabezaCel=Viborita[0][1]
      }else if (Sentido=="Izquierda") {
        if (Viborita[0][0]==0) {
          CabezaCol=9;
        }else {
          CabezaCol=Viborita[0][0]-1;
        }
        CabezaCel=Viborita[0][1]
      }else {
        CabezaCol=Viborita[0][0]
        CabezaCel=Viborita[0][1]
      }
      NuevaCabeza=[CabezaCol,CabezaCel];
      Viborita.unshift(NuevaCabeza)
      //Si la cabeza esta sobre la manzana
      if (terreno[Viborita[0][0]].children[Viborita[0][1]].classList.contains("manzana", "celda")) {
        Comer.play();
        console.log(Velocidad);
        if (Velocidad>110) {
          Velocidad-=300;
        }
        console.log("Yesssssssss!!!!!!");
        terreno[Viborita[0][0]].children[Viborita[0][1]].classList.remove("manzana")
        ManzanaExist=false
        Puntaje++;
        document.getElementById("Puntuacion").innerHTML = "Puntaje: "+Puntaje;
      }else {
        Viborita.pop()
      }
      //Comprueba si hubo choque de la viborita
      for (var i = 2; i < Viborita.length; i++) {
        if (CabezaCol==Viborita[i][0] && CabezaCel==Viborita[i][1]) {
          if (ViboViva==true) {
            Muerto.play();
            window.setTimeout(()=>{
              alert("Has muerto, FFFFFFFFFFFFF");
              alert("Tu puntaje es de: "+Puntaje+" manzanitas");
              if (MaxScore < Puntaje) {
                document.cookie = "MaxScore="+Puntaje;
                alert("Nuevo record")
              }else{
                alert("El record sigue siendo "+MaxScore)
              }
              alert("Haz click en Aceptar para comenzar una nueva partida");
              window.location.reload();
              var ViboViva=false
            }, 90);
          }
        }
      }
      if (ViboViva==true) {
        Juego(Velocidad)
        DiujarViborita()
      }
    }, Velocidad);
  }
//////////////Juego/////////////
Juego(Velocidad);
//////////////////////////__Manzanas__///////////////////////////////
//Crea La Primera Manzana
var ManzanaExist;
window.setTimeout(()=>{
  GenManzana();
  ManzanaExist=true
}, 1000*10);
//Crea una manzana cada 30 segundos
setInterval(()=>{
  if (ManzanaExist==false) {
      GenManzana();
      ManzanaExist=true;
  }
}, 1000*3);
