/*Funcion obtenida en algun lugar de internet*/
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
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
function ComerseCookies() {
  for (var i = 0; i < NUMPAREJAS*2; i++) {
    document.cookie = "Card"+i+"="+Parejas[i]+"expires=Mon, 8 Jun 2020 12:00:00 GMT";
    document.cookie = "Card"+i+"Estado=Activa expires=Mon, 8 Jun 2020 12:00:00 GMT";
  }
  document.cookie = "Vidas=15 expires=Mon, 8 Jun 2020 12:00:00 GMT";
  document.cookie = "ParesCorrect=0 expires=Mon, 8 Jun 2020 12:00:00 GMT";
  document.cookie = "ParesRest=15 expires=Mon, 8 Jun 2020 12:00:00 GMT";
}
///Funcion que checa si las cartas son iguales o no//
function ChecarCartas() {
  //Tiene un retraso de 1.3 segundos patra poder observar un momento las cartas
  setTimeout(()=>{
      //Arreglo que almacena el valor de las cartas(Su par)
      let Es_par=[];
      //Obtiene el valor de las cartas
      $(".abierta").each((index, elem) => {
        Es_par.push($(elem).data("NumDePareja"));
      });
      //Comprueba si fueron las mismas cartas
      if (Es_par[0]==Es_par[1]) {
        //Si fueron remueven los valores coorectos "elimina" las cartas del terreno
        $(".abierta").each((index, elem) => {
          let NCard = $(elem).data("NumDeCarta")
          //Cambia el estado de las cookies
          document.cookie = "Card"+NCard+"Estado=Recogida";
          //Elimina el evento de dar vuelta
          $(elem).unbind();
          //Remueve las clases que permiten ver la carta
          $(elem).removeClass("abierta cerrada")
          //elimina la imagen
          $(elem).html("")
        });
        //Cambia los datos de los pares y sus cookies
        ParesCorrect++;
        ParesRest--;
        document.cookie = "ParesCorrect="+ParesCorrect;
        document.cookie = "ParesRest="+ParesRest;
        //Si ya no queda ninguna par (o mas bien uno pero para agilizar cosas...)
        if (ParesRest==0) {
          //Elimina todas las cartas
          $("#Tablero").empty();
          //Resetea las cookies
          ComerseCookies()
          //Muestra que ganaste
          $("#Tablero").html("<h1>Has ganado, recarge la pagina o hacga clic en el boton reiniciar juego para volver a jugar</h1>")
        }
      }else{
        //Si no fueron iguales Anima su regreso y le remueve sus clases
        $(".abierta").each((index, elem) => {
          $(elem).addClass("cerrandose")
          $(elem).html("")
          setTimeout(()=>{
            $(elem).removeClass("abierta cerrandose")
          }, 500)
        });
        //Reduce los datos de vida y su cookie
        Vidas--;
        document.cookie = "Vidas="+Vidas;
      }
      //Actualiza los datos en el html
      $("#Vidas").html("Vidas: "+Vidas)
      $("#restantes").html("Pares restantes: "+ParesRest)
      $("#obtenidos").html("Pares obtenidos: "+ParesCorrect)
      //Si llegas a perder todas tus vidas Reseteas las cookies y pierdes
      if (Vidas==0) {
        $("#Tablero").empty();
        $("#Tablero").html("<h1>Fin del juego, has perdido, recarge la pagina o hacga clic en el boton reiniciar juego</h1>")
        ComerseCookies()
      }
  },1300)
}
//Crea los pares de cartas
const NUMPAREJAS =15
var Parejas=[];
for (var i = 0; i < NUMPAREJAS; i++) {
  for (var n = 0; n < 2; n++) {
    Parejas.push(i)
  }
}
//Alterna su orden
shuffle(Parejas);

//Comprueba la vida, pares restantes y coorectos si tienen cookies y si no le asigna un nuevo valor
if (getCookie("Vidas")>0 && getCookie("Vidas")<=10) {
  var Vidas = getCookie("Vidas");
}else {
  var Vidas = 10;
}
$("#Vidas").html("Vidas: "+Vidas)
if (getCookie("ParesCorrect")>=0 && getCookie("ParesCorrect")<NUMPAREJAS && getCookie("ParesCorrect")!="") {
  var ParesCorrect = getCookie("ParesCorrect");
}else {
  var ParesCorrect = 0;
}
$("#obtenidos").html("Pares obtenidos: "+ParesCorrect)
if (getCookie("ParesRest")>0 && getCookie("ParesRest")<=NUMPAREJAS) {
  var ParesRest = getCookie("ParesRest");
}else {
  var ParesRest = 15;
}
$("#restantes").html("Pares restantes: "+ParesRest)

  var Carta_OK=0;//verifica que todos los valores de las cookies ean validos
  var CartasCookies=[];//Guarda las cartas
  //Comprueba que las cookies esten completas
  for (var i = 0; i < NUMPAREJAS*2; i++) {
    if (getCookie("Card"+i)>=0 && getCookie("Card"+i)<NUMPAREJAS) {
      Carta_OK++;
      CartasCookies.push(getCookie("Card"+i))
      //Si las cookies estan vacias manda valor "nulo"(es un cero)
      if (getCookie("Card"+i)=="") {
        console.log(getCookie("Card"+i));
        Carta_OK=0;
      }
    }
  }
  //Checa que todas las cartas tengan su valor cookie
  if (NUMPAREJAS*2==Carta_OK) {
    //Crea las cartas en la pantalla a partir de las cookies
    for (var i = 0; i < CartasCookies.length; i++) {
      var NuevaCar = $("<div></div>")
      NuevaCar.addClass("carta")
      if (getCookie("Card"+i+"Estado")=="Activa") {
        NuevaCar.addClass("cerrada")
      }
      NuevaCar.data("NumDePareja",getCookie("Card"+i))
      NuevaCar.data("NumDeCarta", i)
      $("#Tablero").append(NuevaCar)
    }
  }else {
    //Crea las cartas nuevas
    for (var i = 0; i < NUMPAREJAS*2; i++) {
        var NuevaCar = $("<div></div>")
        NuevaCar.addClass("carta cerrada")
        NuevaCar.data("NumDePareja",Parejas[i])
        NuevaCar.data("NumDeCarta", i)
        $("#Tablero").append(NuevaCar)
        document.cookie = "Card"+i+"="+Parejas[i];
        document.cookie = "Card"+i+"Estado=Activa";
        document.cookie = "Vidas=15";
        document.cookie = "ParesCorrect=0";
        document.cookie = "ParesRest=15";
    }
  }
//Se crea el evento de dar vuelta a cada carta
$(".carta").each((ind, elem) => {
  //Guarda el numero de la carta ya que si lo pones directo no funciona
  let NCard = $(elem).data("NumDeCarta")
  console.log(NCard);
  //Checa que las cartas no hayan sido recogidas ya
  if (getCookie("Card"+NCard+"Estado")=="Activa" || getCookie("Card"+NCard+"Estado")=="") {
    $(elem).click(()=>{
      //Verifica que solo haya dos cartas abiertas
      if ($(".abierta").length<2) {
          //Guarda el numero del par carta ya que si lo pones directo no funciona
        let Npar = $(elem).data("NumDePareja")
        $(elem).addClass("abierta")
        //Muestra la imagen un poquito despuesta para que no se vea raro
        setTimeout(()=>{
          $(elem).html("<img src='../statics/img/Img_"+Npar+".png' alt='Imagen Par"+Npar+"''>")
        }, 300)
        //Si ya hay abierta dops cartas comprueba estas
        if ($(".abierta").length==2) {
          ChecarCartas();
        }
      }
    })
  }
});
//boton de reseteo
$("#Reiniciar").click(()=>{
  ComerseCookies()
  window.location.reload();
})
