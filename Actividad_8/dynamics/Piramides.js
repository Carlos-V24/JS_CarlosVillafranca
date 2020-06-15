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
//////////////////Funcion en la que funciona el juego//////////////////////////
function Juego() {
  //Actualiza el valor de la cookie del estado de tiempo cada vez que se llama
  var CookieEstado = getCookie("Estado");
  //Hay un setTimeout de un segundo para que se lleguen a actualizar los cambios hechos por DOM
  window.setTimeout(()=>{
    //Checa si la partida ya esta finalizada o esta en progreso
    if (CookieEstado != "Finalizado") {
      //Solicita la torre de partida hasta cumplir la regla
      var TorreAMover = prompt("De que torre vas a mover tu disco");
      while (isNaN(parseInt(TorreAMover))) {
            alert("Dame un numero del 1 al 3");
            TorreAMover= prompt("De que torre vas a mover tu disco");
          }
      //Solicita la torre de llegada hasta cumplir la regla
      var TorreAFijar = prompt("A que torre vas a mover tu disco");
      while (isNaN(parseInt(TorreAFijar))) {
            alert("Dame un numero del 1 al 3");
            TorreAFijar= prompt("De que torre vas a mover tu disco");
          }
      //Transforma el numero en un string utilizable
      var TorreNomInicio="Torre"+TorreAMover;
      var TorreNomFin="Torre"+TorreAFijar;
      //Guarda un html collection de esaas torres
      var TorreInicio = document.getElementsByClassName(TorreNomInicio)[0].children;
      var TorreFin = document.getElementsByClassName(TorreNomFin)[0].children;
      //Si no hay ningun disco de la torre de partida te manda una alerta
      if (TorreInicio.length==0) {
        alert("Su torre de Inicio no iene ningun disco");
      }else {
        var DiscoAMmover = TorreInicio[TorreInicio.length-1];
        //Si la torre a la que se inserta esta vacia
        if (TorreFin.length==0) {
          //Inserta directamente el disco ahí
          document.getElementsByClassName(TorreNomFin)[0].appendChild(DiscoAMmover);
        }else {
          //Se guarda en una variable el ultimo disco de la torre a la que se va
          var UltimoDisco = TorreFin[TorreFin.length-1];
          /*Si el disco a insertar es mas grande que el ultimo de la torre te manda la alerta de que eso no es valido
            Nota: Segun yo deberia ser mayor que pero funciona alreves no se porque ¯\_(ツ)_/¯*/
          if ((UltimoDisco.offsetWidth)<(DiscoAMmover.offsetWidth)) {
            alert("No puedes poner ese disco ahí, hay uno mas pequeño abajo")
          }else {
            //Si no inserta el disco
            document.getElementsByClassName(TorreNomFin)[0].appendChild(DiscoAMmover);
            //Si con ese movimiento terminas la torre te manda tu mensaje de que ganasta
            if (TorreFin.length==Discos && TorreAFijar!=1) {
              //Cambia el estado de la cookie para salir del bucle
              document.cookie = "Estado=Finalizado";
              alert("Has ganado!!!")
            }
          }
        }
      }
      //Se llama a si misma hasta que el juego termine
      Juego()
      //Si ya esta finalizado Te manda las esatdisticas de la partida
    }else {
      let HoraActual= new Date;
      CookieGame = getCookie("Inicio");
      let Milisegundos=HoraActual.getTime()-CookieGame//Se calcula todos los milisegundos desde que comenzo
      let Minutos=Math.floor(Milisegundos/(60*1000));//Se calcula los minutos
      let Segundos=Math.floor((Math.floor(Milisegundos/(1000)))-Minutos*60);//Se calcula los segundos
      Milisegundos%=1000;//Se calculan los Milisegundos
      //Se muestra el tiempo realizado
      alert("Tu tiempo fué "+Minutos+":"+Segundos+"."+Milisegundos+", haga click en aceptar para comenzar denuevo");
      //Elimina las cookies y recarga la pagina
      document.cookie = "Inicio=Eliminar;expires=Tue, 24 Jun 2003 00:00:00 GMT";
      document.cookie = "Estado=Eliminar;expires=Tue, 24 Jun 2003 00:00:00 GMT";
      window.location.reload();
    }
  }, 1000);
}
var CookieGame = getCookie("Inicio");
//Comprueba si el juega ya inicio(ya hay un valor dentro de la cookie inicio)
if (CookieGame != "") {
  //Crea los discos conforme de esa partida
  var Discos=5;
  for (var i = Discos; i >0 ; i--) {
    var DiscoN =  document.createElement("p");
    NumeroDisc="Disc"+i;
    DiscoN.classList.add(NumeroDisc);
    document.getElementsByClassName("Torre1")[0].appendChild(DiscoN);
  }
  Juego()
} else {
  //Si no crea las cookies para comenzar un juego
  let Inicio = new Date();
  document.cookie = "Inicio="+Inicio.getTime();
  document.cookie = "Estado=En progreso..";
  alert("El juego ha comenzado")
  window.location.reload();
}
